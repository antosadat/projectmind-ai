# ProjectMind AI

ProjectMind AI is a Cloudflare Worker-based PMO intelligence dashboard.

## Routes
- `/` — Mobile-friendly ProjectMind dashboard
- `/api/health` — Worker and AI configuration health
- `/api/chat` — PMO AI assistant

## AI configuration
Add the following secret in Cloudflare Worker **Settings → Variables and secrets**:

- `OPENAI_API_KEY` (Secret)

Optional:
- `OPENAI_MODEL` (Text variable, defaults to `gpt-4.1-mini`)

Do not commit API keys into GitHub.

## Deployment
Cloudflare Workers Builds deploys changes pushed to the configured production branch using:

`npx wrangler deploy`
