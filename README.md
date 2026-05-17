# Banca Remota — Landing Page

Static landing page for the [Banca Remota](https://github.com/albertolicea00/BancaRemota) iOS app.

Built with **Tailwind CSS** (CDN) and **Alpine.js** (CDN). No build step required.

## Structure

```
BancaRemota_landing/
├── index.html      — Main HTML (all sections)
├── style.css       — Custom component styles (complements Tailwind)
├── .gitignore
└── README.md
```

## Sections

| #   | Section                             |
| --- | ----------------------------------- |
| 1   | Hero — headline and app value       |
| 2   | Tagline — short value message       |
| 3   | Primary CTA — GitHub / App Store    |
| 4   | App preview — iPhone mockup         |
| 5   | Main features                       |
| 6   | What you can do                     |
| 7   | How it works                        |
| 9   | Compatibility (banks / iOS)         |
| 10  | Advantages over alternatives        |
| 11  | User manual (accordion)             |
| 12  | FAQ (accordion)                     |
| 13  | Roadmap                             |
| 14  | Beta notify + Newsletter + Telegram |
| 15  | Final CTA                           |
| 16  | Footer                              |

## Development

Open `index.html` directly in a browser — no server needed.

For live reload during development:

```bash
# Using Python
python3 -m http.server 8080

# Using Node
npx serve .
```

## TODO before production

- [ ] Replace placeholder mockup image (`index.html` line ~75) with a real iPhone screenshot using a tool like [Mockup Phone](https://mockuphone.com) or Figma Community templates. Target size: `390×844px`.
- [ ] Replace bank logo placeholders (BPA, BANDEC, BM cards) with official bank logos — `80×80px`, transparent background.
- [ ] Replace `og:image` meta tag image with a real social preview (`1200×630px`).
- [ ] Wire up the newsletter form to an email provider (Mailchimp, ConvertKit, Resend, etc.) — see `notifyForm()` in `index.html`.
- [ ] Update Telegram channel link (`t.me/BancaRemotaCuba`) once the channel is created.
- [ ] Add a real `favicon.ico` / `apple-touch-icon.webp`.
- [ ] Replace all GitHub URLs with the definitive repository URL if it changes.
- [ ] Once in App Store: add the App Store download button and update all CTAs.

## Colors

| Token            | Hex       | Usage                       |
| ---------------- | --------- | --------------------------- |
| `--color-bpa`    | `#1E5F52` | BPA green — primary brand   |
| `--color-bandec` | `#5B2A1F` | BANDEC brown — secondary    |
| `--color-accent` | `#81D717` | Lime — CTAs, highlights     |
| `--color-gold`   | `#B38B4D` | Gold — `appPrimary` default |
| `--color-bm`     | `#1A3A6B` | BM navy blue                |

## Dark mode

Toggle is in the nav bar. Preference is persisted in `localStorage`. Defaults to the system preference (`prefers-color-scheme`).

## Contributing

See the main project's [CONTRIBUTING.md](../BancaRemota_app/CONTRIBUTING.md). Issues, PRs and commit messages must be in English.

---

_Part of the [Banca Remota](https://github.com/albertolicea00/BancaRemota) project by [Alberto Licea](https://www.linkedin.com/in/albertolicea00)._
