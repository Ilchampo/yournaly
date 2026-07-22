# Yournaly Backend

Technical documentation for the Yournaly API service.

The backend owns authentication, AI journal reviews, user preferences, journal history, Ink
packages, and Stripe checkout. It is consumed by the Chrome extension (`yournaly-extension`).

## Stack

| Area       | Choice                                       |
| ---------- | -------------------------------------------- |
| Runtime    | Node.js 22, TypeScript (CommonJS)            |
| HTTP       | Express 5                                    |
| Database   | PostgreSQL via Prisma 6                      |
| Validation | Zod                                          |
| Auth       | Google Identity token → JWT (`jsonwebtoken`) |
| AI         | OpenAI-compatible SDK via **OpenRouter**     |
| Payments   | Stripe Checkout + webhooks                   |
| Deploy     | Docker image on **Northflank**               |

## Project structure

```
yournaly-backend/
├── Dockerfile                 # Northflank production image
├── prisma/schema.prisma       # Data model
├── scripts/seed.sql           # Org, packages, languages, tones, journal summary view
└── src/
    ├── index.ts               # Entry
    ├── app.ts                 # Express app, /health, route mounts
    ├── database.ts            # Prisma client
    ├── openAI.ts              # OpenRouter client
    ├── configs/               # App, auth, DB, OpenAI, Stripe
    ├── routes/                # HTTP routes
    ├── controllers/           # Request handlers
    ├── services/              # Business logic
    ├── middlewares/           # Auth, validation, errors, raw body (Stripe)
    └── lib/                   # Schemas, templates, utils, constants
```

Flow: **routes → controllers → services** (Prisma / OpenRouter / Stripe).

## API surface

| Method   | Path                                   | Auth                        |
| -------- | -------------------------------------- | --------------------------- |
| `GET`    | `/health`                              | Public                      |
| `POST`   | `/api/auth/google/token`               | Public                      |
| `POST`   | `/api/journals/review`                 | JWT                         |
| `GET`    | `/api/journals/summary`                | JWT                         |
| `GET`    | `/api/journals/:id`                    | JWT                         |
| `DELETE` | `/api/journals/:id`                    | JWT                         |
| `PATCH`  | `/api/journals/:id/title`              | JWT                         |
| `PUT`    | `/api/users/preferences`               | JWT                         |
| `GET`    | `/api/inks/packages`                   | JWT                         |
| `POST`   | `/api/payment/create-checkout-session` | JWT                         |
| `POST`   | `/api/payment/webhook`                 | Stripe signature (raw body) |
| `GET`    | `/api/payment/session/:sessionId`      | JWT                         |
| `GET`    | `/api/payment/status/:sessionId`       | JWT                         |

Journal review responses typically include corrected text, letter score (A–F), feedback, and mistake
insights. Reviews consume **Inks** from the user’s wallet.

## Local development

### Prerequisites

- Node.js 22+
- PostgreSQL
- Google OAuth client ID (Chrome extension type)
- OpenRouter API key
- Stripe keys (for checkout locally)

### Setup

```bash
cd yournaly-backend
cp .env.example .env
# Fill in DATABASE_URL*, JWT_SECRET (≥32 chars), GOOGLE_CLIENT_ID,
# OPENAI_API_KEY, and Stripe vars as needed

npm ci
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Server listens on `PORT` (default `3000`). Health check: `GET /health`.

### Scripts

| Script                    | Purpose                                             |
| ------------------------- | --------------------------------------------------- |
| `npm run dev`             | Run with `ts-node`                                  |
| `npm run build`           | Compile to `dist/` (+ copy generated Prisma client) |
| `npm start`               | Run production build                                |
| `npm run db:generate`     | `prisma generate`                                   |
| `npm run db:push`         | Push schema (no migration history in repo)          |
| `npm run db:migrate`      | Prisma migrate (if you introduce migrations)        |
| `npm run db:seed`         | Apply `scripts/seed.sql` via `psql`                 |
| `npm run db:studio`       | Prisma Studio                                       |
| `npm run lint` / `format` | Quality                                             |

### Environment variables

See `.env.example`. Important groups:

| Group      | Variables                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------- |
| App        | `NODE_ENV`, `PORT`                                                                             |
| Database   | `DATABASE_URL`, `DATABASE_URL_DEV`, `DATABASE_URL_PROD`, pool timeouts                         |
| OpenRouter | `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_BASE_URL`, `OPENAI_HTTP_REFERER`, `OPENAI_APP_TITLE` |
| Stripe     | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_SUCCESS_URL`, `STRIPE_CANCEL_URL`        |
| Auth       | `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN`, `SESSION_SECRET`                     |
| Google     | `GOOGLE_CLIENT_ID`, `GOOGLE_USER_INFO_URL`, `GOOGLE_TOKEN_INFO_URL`                            |

Optional (supported in code): `CORS_ORIGINS` (comma-separated), `APP_VERSION`,
`STRIPE_PUBLISHABLE_KEY`.

DB URL resolution: in `development`, prefer `DATABASE_URL_DEV`; in `production`, prefer
`DATABASE_URL_PROD`; otherwise fall back to `DATABASE_URL`.

## Database notes

- Schema: `prisma/schema.prisma`. Client is generated to `src/generated/prisma`.
- There is **no committed `prisma/migrations/` tree** today—local/prod schema sync is typically
  `db push` plus `scripts/seed.sql`.
- Seed creates the `YOURNALY` organization, ink packages, languages/tones, and the
  `v_journal_summary` view used for history.
- New users receive a default Ink grant on signup (see `DEFAULT_USER_INKS` in code).

## Docker / Northflank

Build context: `yournaly-backend/`.

```bash
docker build -t yournaly-backend .
```

Image details:

- Multi-stage Node 22 build; runs as non-root
- Listens on `0.0.0.0:$PORT` (default `3000`)
- Healthcheck: `GET /health`
- CMD: `node dist/index.js`

On Northflank: use a Dockerfile build, inject secrets from `.env.example`, expose the HTTP port, and
set the health path to `/health`. Do **not** bake `.env` into the image. Schema/seed changes should
be applied to Postgres outside (or ahead of) the container start command.

## Related packages

- Extension client: [`../yournaly-extension`](../yournaly-extension)
- Marketing site: [`../yournaly-marketing`](../yournaly-marketing)
- Product overview: [`../README.md`](../README.md)
