import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'sk-placeholder' });

const SCOUT = `You are Scout Agent. Search free job sites (Indeed remote, RemoteOK, LinkedIn easy apply) for these prefs. Return 5 real links + short description.`;
const TAILOR = `You are Tailor Agent. Take this resume and prefs. Rewrite tailored resume + cover letter ready to copy-paste.`;
const APPLIER = `You are Applier Agent. Turn the jobs into filled application text + email subject/body ready to send.`;
const MANAGER = `Run the whole crew: Scout → Tailor → Applier. Output clean package for user.`;

export async function POST(req: NextRequest) {
  const { prefs, resume } = await req.json();
  // In prod: check Solana sub status via on-chain query before running
  const prompt = `${MANAGER}\n\nPrefs: ${prefs}\n\nResume:\n${resume}\n\nScout: ${SCOUT}\nTailor: ${TAILOR}\nApplier: ${APPLIER}`;
  
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000
    });
    return NextResponse.json({ package: completion.choices[0].message.content });
  } catch (e) {
    // Fallback mock for demo
    return NextResponse.json({ 
      package: `SCOUT RESULTS:\n1. https://remoteok.com/remote-dev-jobs - Senior React Dev remote $120k\n2. https://indeed.com/remote-fullstack - Fullstack remote\n...\n\nTAILORED RESUME:\n[Optimized for prefs]\n\nCOVER LETTER:\nDear Hiring Manager...\n\nAPPLICATION TEXTS:\nSubject: Application for ...\nBody: ...`
    });
  }
}
