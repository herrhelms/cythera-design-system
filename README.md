# Cythera Design System

A futuristic, accessible design system for modern web applications.
Dual-theme (neon dark / pastel light), WCAG 2.2 AA+, and shipped with two parallel implementations.

> **Heads up** — this repo contains *design artifacts*, not a published npm package. Both subfolders below are reference implementations meant to anchor production work in your application codebase.

---

## Repo layout

```
.
├── figma/          # Original Figma export — the canonical reference
└── claude-design/  # HTML/CSS/JSX reimplementation built with Claude
```

---

## `figma/` — original Figma export

The source-of-truth design as exported from Figma.
This was the input to the redesign and is preserved here for reference.

Contents:

| File | Purpose |
|---|---|
| `theme.css` | All design tokens — colors, spacing, radii, shadows, typography (light + `.dark`) |
| `fonts.css` | Web-font wiring for Rajdhani, Orbitron, Geist Mono, Share Tech Mono |
| `App.tsx` | Top-level shell — header, layout grid, theme toggle |
| `ComponentShowcase.tsx` | Buttons, badges, inputs, alerts, etc. demo grid |
| `StatusPanel.tsx` | Sidebar telemetry panel pattern |
| `TelemetryGrid.tsx` | Stat-tile dashboard pattern |
| `DESIGN_SYSTEM.md` | Original design-system documentation |
| `ACCESSIBILITY.md` | Original a11y notes |
| `ATTRIBUTIONS.md` | Asset/font credits |

> The `.tsx` files are React + Tailwind from the Figma export. They depend on a Tailwind preset that resolves the CSS variables in `theme.css`.

---

## `claude-design/` — Claude reimplementation

A standalone showcase of the same design system, rebuilt as a single self-contained HTML page with vanilla CSS and React-via-Babel — no build step required.

Open `claude-design/index.html` directly in a browser, or visit the deployed GitHub Pages URL (see *Deployment* below).

Contents:

| Path | Purpose |
|---|---|
| `index.html` | Main showcase — open this in a browser |
| `assets/cythera.css` | Standalone tokens + base styles + component CSS |
| `assets/theme.css` | Token-only export (mirrors Figma's tokens) |
| `assets/icons.jsx` | Lucide-style inline-SVG icon component |
| `assets/components.jsx` | Button, Badge, Input, Tabs, Dialog, Toast, … (45+ primitives) |
| `assets/sections.jsx` | Tokens / Type / Color / Components reference sections |
| `assets/patterns.jsx` | App shell, dashboard, data table, settings form, command palette |
| `assets/tweaks-panel.jsx` | In-page tweaks (theme, accent) panel |
| `preview/` | Token-card snippets used by the asset review workflow |
| `assets/wordmark.html` | Wordmark lockup |
| `assets/ICONOGRAPHY.md` | Icon usage notes |

### What's in the showcase

- **Foundations** — design tokens (spacing, radius, elevation), typography (Orbitron / Rajdhani / Geist Mono), color (signature 4-color palette + semantic tokens + surface hierarchy)
- **Components** — buttons, badges, avatars, inputs, toggles, progress, slider, tabs, alerts, dialogs, toasts, skeletons
- **Application patterns** — sidebar shell, ops dashboard with live chart, data table with search, settings form, command palette
- **Accessibility audit** — live in-browser contrast computation against the active theme, WCAG grade per pair
- **Tweaks panel** — toggle theme (dark / light) and primary accent (cyan / lime / orange / purple)

### Differences from the Figma original

- Single self-contained HTML page (no build step) instead of React + Tailwind + Vite
- `cythera.css` reimplements every Tailwind utility used by the original as plain CSS, gated by `.dark` on the root
- Hover glow effects refined: layered `box-shadow`-only animations (no layout shift) so reduced-motion users aren't penalized
- Light-mode `--muted-foreground` tightened from `#475569` → `#3F4A63` and `--label-tech` made fully opaque to clear WCAG&nbsp;AA on small text
- Adds an a11y section with a live contrast audit table

---

## Theme tokens

Every visual decision resolves to a CSS custom property. Theming swaps by toggling a single `.dark` class on the document root.

```css
/* Dark mode primary palette */
--cythera-cyan:    #00D9FF;
--cythera-lime:    #B3FF6B;
--cythera-orange:  #FF7A47;
--cythera-purple:  #C4A3FF;

/* Light mode primary palette */
--cythera-cyan:    #7DD3FC;
--cythera-lime:    #BEF264;
--cythera-orange:  #FDBA74;
--cythera-purple:  #C4B5FD;
```

Both palettes are tuned so every text token meets WCAG&nbsp;2.2&nbsp;AA on its intended surface; most pairs reach AAA.

## Typography

| Family | Role | Token |
|---|---|---|
| Orbitron | Display & wordmark | `--font-display` |
| Rajdhani | UI & body | `--font-sans` |
| Geist Mono | Code & telemetry | `--font-mono` |
| Share Tech Mono | Tech labels & captions | `--font-tech` |

---

## Local preview

```bash
# Any static server works. Examples:
npx serve claude-design
# or
python3 -m http.server -d claude-design 8000
```

Then open <http://localhost:8000/>.

The page has no build step or dependency install — React, ReactDOM, and Babel are loaded from a CDN at pinned versions with integrity hashes.

---

## Deployment (GitHub Pages)

The `claude-design/` folder is publishable as-is. Enable Pages on `main` → `/ (root)` and the showcase is reachable at:

```
https://herrhelms.github.io/cythera-design-system/claude-design/
```

A `.nojekyll` is included so Pages serves the files verbatim (otherwise underscore-prefixed CSS partials in `preview/` would be ignored).

---

## License & attributions

MIT, baked with 💚 by [@herrhelms](http://github.com/herrhelms)