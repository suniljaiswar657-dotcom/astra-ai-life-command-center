# ASTRA — Architecture Notes

## Approved MVP stack
- **Client:** React + TypeScript
- **Build tooling:** Vite
- **PWA:** vite-plugin-pwa
- **Local persistence:** IndexedDB via idb
- **Hosting target:** Cloudflare Pages (not yet configured)
- **AI provider, remote backend, and authentication:** deferred

See [TECH_STACK.md](./TECH_STACK.md) for the decision record and constraints.

## Logical boundaries
1. **Client experience:** mobile-first interface, navigation, and accessible interactions.
2. **Application layer:** UI state and use-case orchestration.
3. **Local data layer:** ASTRA-owned IndexedDB database and typed persistence functions.
4. **Future AI adapter:** provider-isolated model access; not implemented.
5. **Future integration adapters:** external connectors with explicit user authorization; not implemented.

## Current implementation
- Responsive React application shell
- Overview, Tasks, Planning, and Research navigation
- Local task create, complete, and delete operations
- IndexedDB persistence for tasks on the current browser/device
- PWA manifest and service-worker build integration

## Security and reliability constraints
- Never commit secrets, API keys, access tokens, or private user data.
- Keep local environment files out of version control.
- Local data does not sync between devices.
- Browser/site-data clearing can remove locally stored records.
- Backup/export and restore are required before treating ASTRA as the sole store of important information.
- Consequential external actions must require explicit user approval.
- Do not claim AI, cloud sync, authentication, reminders, or external integrations until implemented and tested.

## Deferred decisions
Remote database, authentication, AI provider, cloud synchronization, backup/export strategy, and deployment configuration will be evaluated only when an approved MVP requirement needs them.
