# RemoteGigCrew MVP
Fully automated AI agent crew for remote job hunting.

## Agents
- Scout: finds 5 remote jobs matching prefs
- Tailor: rewrites resume + cover letter
- Applier: generates ready-to-send application texts
- Manager: runs the full pipeline

## Payments
Solana USDC subscriptions via official Subscriptions Program (De1egAFMkMWZSN5rYXRj9CAdheBamobVNubTsi9avR44).
No middleman fees. Start with $0. Deploy plan, users subscribe once, you pull forever.

## Run
1. `npm install`
2. Set OPENAI_API_KEY
3. `npm run dev`
4. For Solana: follow https://solana.com/docs/payments/subscriptions

## Scale
- Webhook on sub events → auto-welcome email
- Cron for daily sales posts (Reddit/X via APIs)
- Google Sheet tracker via connected tools
- Self-running agent crews on Vercel + Solana keepers

Fork and go live in 5 mins.
