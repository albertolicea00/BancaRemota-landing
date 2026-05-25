# Banca Remota — Landing Page

[![GitHub Stars](https://img.shields.io/github/stars/albertolicea00/BancaRemota?style=flat&logo=github&label=stars&color=B38B4D)](https://github.com/albertolicea00/BancaRemota)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Alpine.js](https://img.shields.io/badge/Alpine.js-8BC0D0?style=flat&logo=alpinedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

Landing page for the [Banca Remota](https://github.com/albertolicea00/BancaRemota) iOS app. No build step.

## Structure

```
├── index.html        main page
├── style.css         component styles
├── app.js            Alpine.js components
├── api/subscribe.js  Vercel serverless — adds emails to Brevo
├── assets/           mockups, icons, bank logos
└── .env.example      required env vars
```

## Local dev

```bash
npx serve .
```

## Deploy

Push to `main` → Vercel auto-deploys. Add env vars from `.env.example` in the Vercel dashboard.

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
