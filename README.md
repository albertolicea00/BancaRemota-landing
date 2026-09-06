# Banca Remota — Landing Page

[![GitHub Stars](https://img.shields.io/github/stars/albertolicea00/BancaRemota?style=flat&logo=github&label=stars&color=B38B4D)](https://github.com/albertolicea00/BancaRemota)
![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat&logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

Landing page for the [Banca Remota](https://github.com/albertolicea00/BancaRemota) iOS app, built with [Astro](https://astro.build) (static output) + Tailwind. No UI framework, no client runtime dependency — interactivity is plain vanilla JS shipped per-component.

## Structure

```
├── src/
│   ├── pages/
│   │   ├── index.astro       landing page
│   │   └── dial.astro        USSD operations dialer (BPA/BANDEC/BM)
│   ├── layouts/
│   │   └── BaseLayout.astro  shared <head>, dark-mode pre-paint script
│   ├── components/           Nav, Footer, BankCard, OpRow, CardStack (.astro)
│   ├── scripts/              vanilla JS: accordion, cardStack, dialTabs, featureTabs, notifyForm, ...
│   ├── styles/                global.css + site.css (hand-written utility classes)
│   └── data/
│       ├── codes.json        real USSD codes per bank/category/operation
│       └── op-icons.json     SF Symbol name → SVG icon path mapping
├── public/assets/             mockups, icons, bank logos (served as-is)
├── api/subscribe.js           Vercel serverless — adds emails to Brevo (untouched by the Astro build)
├── astro.config.mjs
├── tailwind.config.mjs
└── .env.example               required env vars
```

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview     # serve the production build locally
```

## Deploy

Push to `main` → Vercel auto-detects Astro and builds/deploys. `api/subscribe.js` keeps deploying as its own serverless function regardless of the frontend build. Add env vars from `.env.example` in the Vercel dashboard.

## Colors

| Token | Hex | |
|---|---|---|
| `--color-gold` | `#B38B4D` | Primary brand accent |
| `--color-accent` | `#81D717` | Lime highlights |
| `--color-bpa` | `#1E5F52` | BPA green |
| `--color-bandec` | `#5B2A1F` | BANDEC brown |
| `--color-bm` | `#1A3A6B` | BM navy |

## Contributing

See the main project's [CONTRIBUTING.md](https://github.com/albertolicea00/BancaRemota/blob/main/CONTRIBUTING.md). Issues, PRs, and commit messages must be in English.

---

*Part of the [Banca Remota](https://github.com/albertolicea00/BancaRemota) project by [Alberto Licea](https://www.linkedin.com/in/albertolicea00).*
