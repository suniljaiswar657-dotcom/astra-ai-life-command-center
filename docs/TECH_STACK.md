# ASTRA — Approved MVP Technology Stack

Status: approved for the initial client-side MVP.

| Layer | Choice | MVP purpose |
|---|---|---|
| UI | React + TypeScript | Component-based mobile-first interface |
| Build | Vite | Development server and production build |
| Installability | vite-plugin-pwa | Web app manifest and service-worker support |
| Local persistence | IndexedDB via idb | Store ASTRA data locally on this device |
| Hosting target | Cloudflare Pages | Static frontend hosting, to be configured later |
| AI | Deferred | No model provider or paid API required for the first milestone |
| Remote backend/auth | Deferred | Revisit only when sync or accounts are required |

## Important constraints
- Local IndexedDB data does not automatically sync across devices.
- Browser data can be lost if the user clears site data or removes browser storage. A backup/export flow must be implemented before relying on ASTRA for important records.
- No API keys, credentials, or external project integrations belong in this repository.
- Cloudflare Pages deployment is not configured by this commit.
- The stack may be revised only with explicit approval.

## Initial implementation boundary
This scaffold provides the app shell and a local task workspace. It does not claim AI, reminders, cloud sync, authentication, or external workflow automation.
