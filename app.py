from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import os
from dotenv import load_dotenv
import requests
from openai import OpenAI
import stripe

load_dotenv()
app = FastAPI()
templates = Jinja2Templates(directory="templates")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/run-crew")
async def run_crew(
    resume: str = Form(...),
    prefs: str = Form(...),
    name: str = Form(...),
    email: str = Form(...)
):
    # Scout
    jobs = scout_jobs(prefs)
    # Tailor
    tailored = tailor_resume(resume, prefs, jobs)
    # Applier
    applications = applier(tailored, jobs)
    return {"jobs": jobs, "tailored": tailored, "applications": applications, "user": {"name": name, "email": email}}

def scout_jobs(prefs: str):
    # Free RemoteOK API
    try:
        r = requests.get("https://remoteok.com/api", headers={"User-Agent": "RemoteGigCrew"})
        data = r.json()[1:6]  # top 5
        jobs = []
        for j in data:
            if prefs.lower() in str(j).lower() or "remote" in str(j).lower():
                jobs.append({
                    "title": j.get("position", ""),
                    "company": j.get("company", ""),
                    "url": j.get("url", ""),
                    "description": j.get("description", "")[:200]
                })
        return jobs[:5] if jobs else [{"title": "Sample Remote Dev", "company": "Startup", "url": "https://remoteok.com", "description": "Match your prefs"}]
    except:
        return [{"title": "Fallback Job", "url": "#", "description": "Use free sites"}]

def tailor_resume(resume: str, prefs: str, jobs: list):
    prompt = f"You are Tailor Agent. Resume: {resume}\nPrefs: {prefs}\nJobs: {jobs}\nRewrite tailored resume + cover letter ready to copy-paste for top job."
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1500
    )
    return resp.choices[0].message.content

def applier(tailored: str, jobs: list):
    prompt = f"You are Applier Agent. Tailored: {tailored}\nJobs: {jobs}\nTurn into filled application text + email subject/body ready to send."
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000
    )
    return resp.choices[0].message.content

# Stripe webhook stub
@app.post("/webhook")
async def stripe_webhook(request: Request):
    # Handle paid user, email package
    return {"status": "ok"}
