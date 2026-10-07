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

## Android Home Screen Widget

The repository now includes a native Android widget under `android/`.

- Shows Delayed, At Risk and Progress KPIs.
- Tapping the widget opens the ProjectMind dashboard.
- The Android host app loads the current ProjectMind Worker URL and caches KPI values for the widget.
- GitHub Actions builds a debug APK artifact from `.github/workflows/android-widget.yml`.

Build locally from the `android` directory with Gradle 8.9 and Java 17:

```bash
gradle :app:assembleDebug
```

This is an Android native widget; installing the PWA alone does not create a native Home Screen widget.
