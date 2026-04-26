# Cythera Iconography

The source app does not ship an icon set — the brand's "icons" are mostly
geometric primitives (pulsed dots, hairline sweeps, gradient highlights) and
Orbitron numerals.

## Approach

1. **Default to no decorative icons.** Status, hierarchy, and emphasis are
   carried by typography, color, and layout — not glyphs.
2. **Pulsed status dots** are the signature indicator. 6–8px circle with
   `cythera-pulse` animation + matching `box-shadow` glow.
3. **Hairline sweeps** — a 1px absolute-positioned `linear-gradient(90deg,
   transparent, accentColor80, transparent)` across the top of telemetry cards
   acts as an "active" indicator.
4. **Numerals as icons.** Big Orbitron numbers (24–48px) are the visual anchor
   on dashboards and stat cards.

## When you need real icons

Use **Lucide** ( https://lucide.dev/ ). Reasons:

- Already part of the shadcn/ui ecosystem the source codebase is built on.
- Stroke weight (1.5px) and clean rounding match the Cythera/Rajdhani aesthetic.
- Available as a CDN-linked icon font and as React components.

> ⚠️ **Substitution flag:** the original Figma Make export did not ship icons.
> Lucide is the editorial recommendation, not a strict carry-over. If your
> product needs a different set, swap freely — but pick one with **1.5px
> strokes and rounded line caps** to stay on-brand.

### CDN usage (vanilla)

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="activity"></i>
<script>lucide.createIcons();</script>
```

### React (already in the source codebase)

```jsx
import { Activity, Zap, Cpu } from 'lucide-react';
<Activity className="w-4 h-4" />
```

## Icon styling rules

- Default size: 16px (inline) / 20px (buttons) / 24px (nav).
- Color: inherit `currentColor`, never hard-code.
- Stroke: 1.5px.
- Pair with text labels — never icon-only buttons except in toolbars with tooltips.

## Emoji

**Not used in product UI.** Allowed only in long-form documentation as
section markers (✅ ⚠️ 🎨 🔮 in `DESIGN_SYSTEM.md`). The reference app's theme
toggle (`☀️ / 🌙`) is the one in-product allowance — treat it as legacy.

## Logo / wordmark

The "CYTHERA" wordmark is **live text**, not an SVG:

```css
font-family: 'Orbitron', monospace;
font-weight: 900;
letter-spacing: 4px;
text-transform: uppercase;
background: linear-gradient(90deg, var(--cythera-cyan), var(--cythera-lime));
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```

See `assets/wordmark.html` for the canonical recipe.
