# Banca Remota — Landing Page

[![GitHub Stars](https://img.shields.io/github/stars/albertolicea00/BancaRemota?style=flat&logo=github&label=stars&color=B38B4D)](https://github.com/albertolicea00/BancaRemota)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Alpine.js](https://img.shields.io/badge/Alpine.js-8BC0D0?style=flat&logo=alpinedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

Landing page + web USSD dialer for the [Banca Remota](https://github.com/albertolicea00/BancaRemota) iOS app. No build step.

## Structure

```
├── index.html        landing page
├── dial.html         web USSD dialer (BPA / BANDEC / BM, works standalone from iOS home screen)
├── style.css         component styles
├── app.js            Alpine.js components (landing page + shared notify form)
├── op-icons.json     icon paths used by dial.html's operation cards
├── codes.json        local copy of the USSD codes — NOT fetched by dial.html at runtime
│                      (see Offline codes below); kept in this repo, but unused by any page
├── api/subscribe.js  Vercel serverless — adds emails to Brevo
├── vercel.json       clean URLs + long-term caching for /assets
├── assets/           mockups, icons, bank logos
└── .env.example      required env vars
```

## Pages

**`index.html`** — landing page: hero, feature walkthrough (scroll-pinned tabs, desktop only), FAQ, bank compatibility section with a `codes.json` download link for contributors, roadmap, and the "Avísame" (notify me) subscribe form. Fetches `https://api.github.com/repos/albertolicea00/BancaRemota` client-side to show live GitHub star count.

**`dial.html`** — web USSD dialer: pick a bank (bottom tab bar on mobile, 3-column layout on desktop), search operations by name, tap a card to open `tel:<code>` and place the call. Same dark mode, notify form, and iOS install guide as the landing page. See **Offline codes** below for how it gets its data.

Both pages share `app.js` (`notifyForm()` for the subscribe form, dark-mode handling) and the `.op-card` / `.bank-card` styling in `style.css`.

## Notify me / subscribe form

`notifyForm()` in `app.js` posts `{ email }` to `POST /api/subscribe` (`api/subscribe.js`, Vercel serverless), which adds the address to a Brevo list — used both for "notify when the app hits the App Store" and generally on the landing page FAQ. Requires `BREVO_API_KEY` and `BREVO_LIST_ID` (see `.env.example`).

## iOS "Add to Home Screen" guide

On iOS Safari (detected via UA / `MacIntel` + multi-touch, not standalone yet), both pages show a modal after ~1.5s guiding the user through Share → Add to Home Screen, so the site behaves like an installed app (own icon, no Safari chrome, `apple-mobile-web-app-capable`). Dismissal is remembered in `localStorage['installGuideDismissed']`. The nav's "Install" button re-opens it on demand via a `open-install-guide` custom event. Irrelevant on Android/desktop — gated behind the iOS check.

## Offline codes (dial.html)

`dial.html` does not fetch the local `codes.json` — it always pulls the latest from the main repo's raw GitHub content:

```
https://raw.githubusercontent.com/albertolicea00/BancaRemota/refs/heads/main/BancaRemota/codes.json
```

Flow, cache-first with a silent background refresh:

1. On load, render immediately from `localStorage['codesJsonCache']` if present.
2. Fetch the remote URL in the background; on success, overwrite the cache and re-render.
3. If the fetch fails (offline) and a cache exists, keep showing the cached codes — no error shown to the user.
4. If it fails with no cache (first-ever load, offline), log an error and show an empty state.

This makes the dialer usable with no internet after the first successful visit, while still picking up USSD code fixes pushed to the main [BancaRemota](https://github.com/albertolicea00/BancaRemota) repo without shipping a new deploy of this site. The `codes.json` committed to *this* repo is not read by any page — it's the same content the iOS app ships with, referenced from `index.html` (the "Bancos soportados" section links to and describes the raw GitHub copy for contributors editing USSD codes). Whether it should stay in sync manually or be removed from this repo entirely is worth deciding — flagging it rather than guessing.

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
