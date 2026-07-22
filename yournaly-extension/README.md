# Yournaly Extension

Technical documentation for the Yournaly Chrome extension.

This is the primary product UI: a Manifest V3 side panel where users write journals, receive AI reviews, manage preferences, browse history, and purchase Inks.

**Store listing:** [Chrome Web Store](https://chromewebstore.google.com/detail/yournaly/hmapfjoppnaaiidefjjndeppkjaklfjm)  
**Homepage:** [https://yournaly.p4blobeltran.com/](https://yournaly.p4blobeltran.com/)

## Stack

| Area      | Choice                                                   |
| --------- | -------------------------------------------------------- |
| Framework | [WXT](https://wxt.dev) `^0.20` + `@wxt-dev/module-react` |
| UI        | React 19, React Router 7, Tailwind CSS 4                 |
| State     | Zustand (+ `chrome.storage.local` persistence)           |
| i18n      | i18next (en, es, it, fr, pt)                             |
| Auth      | `chrome.identity` Google token → backend JWT             |
| Targets   | Chrome (primary), Firefox scripts available              |

There are **no content scripts**. The background service worker only opens the side panel on action click.

## Project structure

```
yournaly-extension/
├── wxt.config.ts              # Manifest, OAuth, host permissions, aliases
├── public/icon/               # Extension icons
├── entrypoints/
│   ├── background.ts          # Service worker — open side panel
│   └── sidepanel/             # Main React app
│       ├── App.tsx            # Routes
│       ├── pages/             # Auth, Home, Journals, Purchase, Preferences, About
│       ├── components/
│       ├── hooks/
│       └── lib/
│           ├── config.ts      # API base URL from env
│           ├── services/      # API + Chrome auth/storage
│           ├── stores/        # Zustand stores
│           └── i18n/
└── .output/                   # Build + zip artifacts (gitignored)
```

### Routes (side panel)

| Path                         | Page                             |
| ---------------------------- | -------------------------------- |
| `/auth`                      | Google sign-in                   |
| `/home`                      | Write + review                   |
| `/journals`, `/journals/:id` | History + review detail          |
| `/purchase`                  | Ink packages / Stripe (B2C only) |
| `/preferences`               | Language & review preferences    |
| `/about`                     | About, privacy, terms            |

## Local development

### Prerequisites

- Node.js 22+ (or current LTS used by the team)
- Backend running locally (see [`yournaly-backend`](../yournaly-backend)) **or** a reachable API
- Chrome (for unpacked load)

### Setup

```bash
cd yournaly-extension
cp .env.example .env
# Set WXT_APP_ENVIRONMENT=development
# Set WXT_API_DEV to your local API (e.g. http://localhost:3000/api)

npm install
npm run dev
```

WXT serves the extension with HMR (dev server port **8080**). Load the unpacked build from `.output/chrome-mv3` in `chrome://extensions` (Developer mode).

### Environment variables

| Variable              | Purpose                                              |
| --------------------- | ---------------------------------------------------- |
| `WXT_APP_ENVIRONMENT` | `development` or `production` — selects API base URL |
| `WXT_API_DEV`         | API base for development (include `/api` suffix)     |
| `WXT_API_PROD`        | API base for production builds                       |

Resolved in `entrypoints/sidepanel/lib/config.ts`.

> **Note:** `host_permissions` in `wxt.config.ts` currently allow `https://api.yournaly.p4blobeltran.com/*`. For local HTTP APIs you may need matching host permissions (or temporary config changes) so `fetch` is permitted.

### Scripts

| Script                                                  | Purpose                          |
| ------------------------------------------------------- | -------------------------------- |
| `npm run dev`                                           | Chrome extension HMR             |
| `npm run build`                                         | Production Chrome build          |
| `npm run zip`                                           | Store-ready zip under `.output/` |
| `npm run dev:firefox` / `build:firefox` / `zip:firefox` | Firefox variants                 |
| `npm run compile`                                       | Typecheck                        |
| `npm run lint` / `format`                               | Quality                          |

## Backend integration

1. `ChromeAuthService` obtains a Google access token via `chrome.identity.getAuthToken`.
2. `POST {baseUrl}/auth/google/token` exchanges it for a Yournaly JWT + user/org payload.
3. Tokens and profile are stored in `chrome.storage.local` and Zustand.
4. Authenticated calls send `Authorization: Bearer <jwt>`.

| Client service | Backend endpoints                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Auth           | `POST /auth/google/token`                                                                                                  |
| Journals       | `POST /journals/review`, `GET /journals/summary`, `GET /journals/:id`, `PATCH /journals/:id/title`, `DELETE /journals/:id` |
| User           | `PUT /users/preferences`                                                                                                   |
| Inks           | `GET /inks/packages`                                                                                                       |
| Payment        | `POST /payment/create-checkout-session`, `GET /payment/status/:sessionId`, `GET /payment/session/:sessionId`               |

Many calls also pass `organizationId` (org-scoped / B2C vs business plan).

## Manifest & permissions

Configured in `wxt.config.ts`:

| Item             | Value                                         |
| ---------------- | --------------------------------------------- |
| Permissions      | `sidePanel`, `storage`, `identity`            |
| Host permissions | Production API host                           |
| Side panel       | Default path → sidepanel HTML                 |
| OAuth2           | Google client ID + `profile` / `email` scopes |
| Extension key    | Embedded for a stable extension ID (OAuth)    |

**Version for the store** is `manifest.version` in `wxt.config.ts` (not `package.json`’s placeholder version).

## Chrome Web Store packaging

```bash
# Bump version in wxt.config.ts first
npm run zip
```

Upload the generated zip from `.output/` (e.g. `yournaly-<version>.zip`) in the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

Keep the Google Cloud OAuth client, embedded extension `key`, and store listing homepage (`https://yournaly.p4blobeltran.com/`) aligned.

Apple Sign-In UI exists in the auth flow but is gated off (`DISABLE_APPLE_LOGIN`); Google is the supported path.

## Related packages

- API: [`../yournaly-backend`](../yournaly-backend)
- Marketing site: [`../yournaly-marketing`](../yournaly-marketing)
- Product overview: [`../README.md`](../README.md)
