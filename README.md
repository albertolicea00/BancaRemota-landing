# Banca Remota — Landing Page

Static landing page for the [Banca Remota](https://github.com/albertolicea00/BancaRemota) iOS app.

Built with **Tailwind CSS** (CDN) and **Alpine.js** (CDN). No build step required. The design is modern, fully responsive, and includes a seamless dark mode.

## Structure

```
BancaRemota_landing/
├── assets/         — Images, mockups, and bank logos
├── index.html      — Main HTML containing all content and Alpine.js logic
├── style.css       — Custom component styles complementing Tailwind
├── favicon.ico     — Standard favicon
└── README.md       — This file
```

## Features

- **Seamless Dark Mode:** Automatic system preference detection with a manual toggle. Preloaded images ensure instant transitions between light and dark mockups.
- **Premium Aesthetics:** High-quality gradients, shadows, and spacing inspired by Cupertino design principles.
- **Interactive Mockups:** Draggable and swipeable card stacks for both mobile and desktop breakpoints to showcase the iOS app features.
- **Responsive Layout:** Perfectly adapts from small iPhone screens to large desktop monitors.
- **SEO Optimized:** Full Open Graph integration for rich social media sharing (WhatsApp, Telegram, Twitter).

## Development

Open `index.html` directly in a browser — no server needed.

For live reload during development, you can use any local server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve .
```

## Colors

The application relies on a centralized color scheme built around the app's primary UI tokens:

| Token            | Hex       | Usage                       |
| ---------------- | --------- | --------------------------- |
| `--color-gold`   | `#B38B4D` | Gold — primary brand accent |
| `--color-accent` | `#81D717` | Lime — UI highlights        |
| `--color-bpa`    | `#1E5F52` | BPA green                   |
| `--color-bandec` | `#5B2A1F` | BANDEC brown                |
| `--color-bm`     | `#1A3A6B` | BM navy blue                |

## Contributing

See the main project's [CONTRIBUTING.md](https://github.com/albertolicea00/BancaRemota/blob/main/CONTRIBUTING.md). Issues, PRs, and commit messages must be in English.

---

*Part of the [Banca Remota](https://github.com/albertolicea00/BancaRemota) project by [Alberto Licea](https://www.linkedin.com/in/albertolicea00).*
