# ASTRA — Architecture Notes

## Status
These are initial architecture principles only. No framework, runtime, database, AI provider, or hosting platform has been selected or configured.

## Design principles
1. **Mobile-first client:** prioritize narrow-screen layouts, touch targets, readable typography, and low-bandwidth usability.
2. **Clear boundaries:** keep presentation, application logic, data access, and external integrations separable.
3. **Provider isolation:** access AI and third-party services through replaceable adapters.
4. **Least privilege:** request only permissions and data needed by a feature.
5. **Explicit authorization:** require user approval before consequential external actions.
6. **Graceful degradation:** core organization features should remain useful when AI or network services are unavailable.
7. **Free-tier-first:** evaluate usage limits, data limits, and operational constraints before selecting services.

## Proposed logical components
- **Client experience:** mobile-first interface and navigation.
- **Application layer:** validates requests and coordinates use cases.
- **Data layer:** owns ASTRA's data model and persistence.
- **AI adapter:** isolates model-provider calls and handles service failures.
- **Integration adapters:** future external connectors with explicit permissions.

These are logical boundaries, not implemented components.

## Security baseline
- Never commit secrets, API keys, access tokens, or private user data.
- Keep local environment files out of version control.
- Validate and authorize data access on the server side.
- Use least-privilege credentials and documented access scopes.
- Avoid logging sensitive user content or credentials.

## Open decisions
- Frontend framework and build tooling
- Backend/API approach
- Database and authentication
- AI provider and fallback behavior
- Hosting and deployment
- Backup, export, and deletion model

Decisions should be made when MVP requirements and current free-tier limits have been checked.
