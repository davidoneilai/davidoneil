# David O'Neil — personal site

Personal site and living curriculum for **David O'Neil** (NLP / LLM Engineer).  
Built with [Astro](https://astro.build), available in **English**, **Portuguese**, and **中文**.

Live: [davidoneilai.github.io/davidoneil](https://davidoneilai.github.io/davidoneil/)

## Stack

- Astro 7 (static)
- GSAP (subtle hero motion, respects `prefers-reduced-motion`)
- Content as typed TypeScript modules (`src/content/`)

## Develop

```bash
npm install
npm run dev
```

Open the URL Astro prints (usually `http://localhost:4321/en/`).

## Build

```bash
npm run build
npm run preview
```

For GitHub Pages (project site under `/davidoneil/`):

```bash
GITHUB_PAGES=true npm run build
```

## Content

| Path | Purpose |
|------|---------|
| `src/content/profile.ts` | Name, contacts, photo |
| `src/content/en.ts` / `pt.ts` / `zh.ts` | Locale copy (cases, pubs, skills) |
| `public/cv-pt.pdf` | CV download (EN/ZH fall back to PT until localized PDFs ship) |
| `public/david.png` | Hero photo |

## Deploy

Push to `main`. GitHub Actions builds with `GITHUB_PAGES=true` and deploys to Pages  
(`.github/workflows/pages.yml`). Enable **Pages → Source: GitHub Actions** in the repo settings.
