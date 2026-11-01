# RemoteGigCrew MVP

Automated AI crew for remote jobs.

## Setup
1. `pip install -r requirements.txt`
2. Set `OPENAI_API_KEY` and `STRIPE_SECRET_KEY` in .env
3. `uvicorn app:app --reload`
4. Open http://localhost:8000

Agents: Scout finds jobs from RemoteOK, Tailor rewrites resume/cover, Applier packages applications.

Payments: Stripe or Solana (add wallet).

Run free, scale with paid users.
