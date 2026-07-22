# Yournaly Marketing

Technical documentation for the public Yournaly marketing website.

Static marketing site (landing page + legal) for SEO, Chrome Web Store discovery, and product positioning. It does not serve the extension UI.

**Live site:** [https://yournaly.p4blobeltran.com/](https://yournaly.p4blobeltran.com/)  
**Chrome Web Store:** [Yournaly](https://chromewebstore.google.com/detail/yournaly/hmapfjoppnaaiidefjjndeppkjaklfjm)

## Stack

| Area      | Choice                                     |
| --------- | ------------------------------------------ |
| Framework | Next.js 15 (App Router)                    |
| UI        | React 19, Tailwind CSS 4, Motion           |
| Fonts     | Delius Swash Caps, Noto Sans (`next/font`) |
| Analytics | `@vercel/analytics`                        |
| Output    | `standalone` (Docker-friendly)             |
| Deploy    | Docker image on **Northflank**             |

## Project structure

```
yournaly-marketing/
├── Dockerfile                 # Northflank production image
├── next.config.ts             # output: 'standalone'
├── public/                    # Favicons, OG / Twitter images
└── src/app/
    ├── layout.tsx             # Metadata, JSON-LD, shell
    ├── page.tsx               # Landing (Hero, How, Features)
    ├── privacy/page.tsx
    ├── terms/page.tsx
    ├── robots.ts
    ├── sitemap.ts
    ├── components/
    ├── sections/
    └── lib/constants/
        └── site.constant.ts   # SITE_URL, CHROME_STORE_URL
```

## Routes

| Route          | Description                                              |
| -------------- | -------------------------------------------------------- |
| `/`            | Landing — hero, how it works, features, Chrome Store CTA |
| `/privacy`     | Privacy Policy (unique metadata + canonical)             |
| `/terms`       | Terms of Service (unique metadata + canonical)           |
| `/robots.txt`  | Generated from `robots.ts`                               |
| `/sitemap.xml` | Generated from `sitemap.ts`                              |

Site URL and store link are centralized in `src/app/lib/constants/site.constant.ts`.

## Local development

```bash
cd yournaly-marketing
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script           | Purpose                       |
| ---------------- | ----------------------------- |
| `npm run dev`    | Next.js dev server            |
| `npm run build`  | Production build (standalone) |
| `npm run start`  | Serve production build        |
| `npm run lint`   | ESLint                        |
| `npm run format` | Prettier                      |

No app secrets are required for a local marketing build. SEO metadata and JSON-LD use the production `SITE_URL`.

## SEO notes

- `metadataBase` and per-route `alternates.canonical` (`/`, `/privacy`, `/terms`)
- Open Graph / Twitter cards via `public/og-image.png` and `public/twitter-image.png`
- JSON-LD `SoftwareApplication` in the root layout
- Prefer a single page `h1`; CTAs should be real links (Chrome Store uses `CHROME_STORE_URL`)

When changing the public domain, update `SITE_URL` in `site.constant.ts` and re-verify the property in Google Search Console.

## Docker / Northflank

Build context: `yournaly-marketing/`.

```bash
docker build -t yournaly-marketing .
```

Image details:

- Multi-stage Node 22 build (`deps` → `builder` → `runner`)
- Copies Next standalone output + `.next/static` + `public`
- Listens on `0.0.0.0:$PORT` (`HOSTNAME=0.0.0.0`, default port `3000`)
- Healthcheck: `GET /`
- CMD: `node server.js`
- Runs as non-root user `nextjs`

On Northflank: Dockerfile build type, expose HTTP port **3000** (or map Northflank’s `PORT`), health path `/`. Attach the custom domain `yournaly.p4blobeltran.com` to the public port.

## Related packages

- Extension: [`../yournaly-extension`](../yournaly-extension)
- API: [`../yournaly-backend`](../yournaly-backend)
- Product overview: [`../README.md`](../README.md)
