# Working in this repo (for Claude Code)

This repository contains the **Cythera Design System** in two parallel forms:

- `figma/` — the original Figma export (React + Tailwind + CSS-variable theme)
- `claude-design/` — a standalone HTML/CSS/JSX reimplementation (no build step)

Both encode the same tokens. **`figma/theme.css` and `claude-design/assets/theme.css` should stay in sync** — they are the source of truth for colors, spacing, radii, shadows, and typography.

## Conventions

- **Theming**: light is default; `.dark` on `<html>` swaps every token to the dark palette.
- **Tokens only**: never hardcode hex values inside components. If a value isn't expressed as a token, add the token first.
- **Type families**: Orbitron (display/wordmark), Rajdhani (UI/body), Geist Mono (code/telemetry), Share Tech Mono (small caps tech labels).
- **Hover effects**: `box-shadow` layered glows + 1px translate. No `filter: blur` or layout-shifting transforms — keep reduced-motion-safe.
- **Accessibility floor**: every text-on-surface pair must clear **WCAG 2.2 AA (4.5:1)** in both themes. The showcase's `AccessibilitySection` computes live ratios — keep it green.

## When you make changes

1. Update tokens in **both** `figma/theme.css` and `claude-design/assets/theme.css`.
2. If you add a new component, add it to:
   - `claude-design/assets/components.jsx` (or a new file imported from the main HTML)
   - `claude-design/assets/sections.jsx` showcase grid
   - The Figma side — `figma/ComponentShowcase.tsx` if it should appear there too.
3. Run `python3 -m http.server -d claude-design 8000` and visually QA the showcase. The A11y section at the bottom must show no "Fail" rows.

## Deployment

The repo serves from GitHub Pages root. `index.html` redirects to the showcase. `.nojekyll` is required so Pages serves underscore-prefixed CSS partials.
