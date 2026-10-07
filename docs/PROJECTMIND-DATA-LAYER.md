# ProjectMind Private Data Layer

## Architecture

ProjectMind now uses a dedicated Cloudflare data layer:

- **D1**: projects, current tasks, refresh history, task history, documents metadata, audit logs.
- **R2**: private copies of uploaded project files.
- **Worker API**: the only application path to D1/R2.
- **Cloudflare Access**: required for all data-layer API requests.
- **No office-system connector** is implemented.

The browser keeps a local cache for resilience, but the controlled server copy is the source of truth when it is newer.

## Daily freshness model

1. User uploads the latest tracker.
2. ProjectMind analyses the workbook locally.
3. The source file is uploaded to private R2.
4. Normalized task data is sent to \`/api/data/refresh\`.
5. D1 stores the new current state and appends task history.
6. The refresh records source file, reporting date, record count, quality, changed-record count and version.
7. The dashboard shows the last server update and data age.
8. An hourly Cron Trigger checks for stale projects. No office API or office database is contacted.

## Security model

Data APIs require an authenticated Cloudflare Access context. Cloudflare documents \`ctx.access\` as the identity context available to a Worker after Access authentication. Protect the ProjectMind Worker in **Workers & Pages → ProjectMind → Access** and allow only the intended personal identity/email policy.

Do not add office database credentials, office VPN configuration, SharePoint credentials, ERP credentials or internal API endpoints to this repository.

## Resource provisioning

\`wrangler.jsonc\` declares D1 and R2 bindings without account-specific resource IDs so current Wrangler automatic provisioning can create and link the resources during deployment.

The D1 schema is versioned under \`migrations/0001_projectmind_data_layer.sql\`. The Worker also performs an idempotent schema check on data-layer access so a newly provisioned database can initialize safely.

## File upload limit

The current browser-to-Worker R2 upload endpoint is intentionally capped at 25 MB. Larger files should use an R2 multipart upload path in a later phase.

## Important operational rule

A failed validation or failed server refresh must not replace the existing server dataset. The refresh write uses a D1 batch so the project replacement and history write are committed together or rolled back together.
