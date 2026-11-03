# ASTRA — AI Life Command Center

ASTRA is an independent, mobile-first personal command center for tasks, planning, research, and productivity.

## Current MVP
- React + TypeScript + Vite application shell
- Responsive mobile-first navigation
- Local task creation, completion, and deletion
- IndexedDB persistence in this browser/device
- PWA manifest and service-worker build integration

## Not implemented yet
- AI/model integration
- Cloud sync, accounts, or authentication
- Push notifications or scheduled reminders
- Research search or external integrations
- Backup/export and restore
- Cloudflare Pages deployment

## Run locally
Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Data and privacy
Tasks are stored locally in this browser using IndexedDB. They are not synced to another device. Clearing browser/site data may permanently remove them. Do not use this preview as the only copy of important information until export/backup is implemented.

## Technology
See [docs/TECH_STACK.md](docs/TECH_STACK.md) for the approved MVP stack and limitations.

## Project boundary
ASTRA has its own repository, architecture, codebase, and data boundary. Do not reuse or connect another project's assets, code, databases, credentials, or workflows without explicit permission.
