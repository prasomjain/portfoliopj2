# Prasom Jain — Portfolio

Portfolio website with a design system inspired by Dream11's design principles: a three-tier token architecture, high-energy condensed typography, single-accent dark theme, and performance-first engineering.

**Live:** [portfoliopj4.vercel.app](https://portfoliopj4.vercel.app/)

## Design System

- **Three-tier tokens** (`src/styles/tokens.css`): global primitives → semantic aliases → component tokens. Retheme the whole site from one file.
- **Matchday aesthetics**: Barlow Condensed display type, electric crimson (#FF2D55) on dark slate, CSS-only stadium backdrop (floodlight gradients, turf stripes, grain).
- **Sports-app UI patterns**: player-card hero with scoreboard stat strip, match-card project listings, leaderboard-style awards, stepper navigation rail, scroll-progress meter.
- **Performance-first**: no 3D/animation libraries — IntersectionObserver reveals, rAF count-ups, CSS effects, all gated behind `prefers-reduced-motion`. ~74 KB gzipped JS.

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- Vanilla CSS with design tokens (no CSS framework)
- [React Icons](https://react-icons.github.io/react-icons/)

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run lint
```

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── assets/          # Images
│   ├── components/      # Overlay.jsx (all sections), Overlay.css
│   ├── data/user.js     # All content — edit this to update the site
│   ├── styles/tokens.css # Design token system
│   ├── App.jsx
│   └── main.jsx
└── index.html
```

All content (projects, experience, skills, links) lives in `src/data/user.js`.

---

**Prasom Jain** — [GitHub](https://github.com/prasomjain) · [LinkedIn](https://www.linkedin.com/in/prasom-jain-751682229/)
