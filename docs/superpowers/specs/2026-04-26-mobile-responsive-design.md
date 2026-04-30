# Mobile Responsive Design for Cythera Showcase

## Goal

Make all panels in the `claude-design/` showcase wrap and display correctly on mobile viewports (down to 320px). Desktop layout (>768px) stays untouched. This is a view-only showcase — interactive usability on touch is not in scope.

## Approach

Pure CSS media queries in `cythera.css` at `@media (max-width: 768px)`. Minimal JSX changes limited to adding classNames on ~6 wrapper divs so CSS can target them.

## Breakpoint

Single breakpoint: `768px`. Everything above is desktop (unchanged). Everything at or below is mobile.

## Changes by area

### 1. Header (sticky, horizontal-scrolling nav)

- The `<nav>` flex container gets `overflow-x: auto`, `-webkit-overflow-scrolling: touch`, and hidden scrollbar (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`)
- Logo/pulse-dot stay left, theme toggle stays right
- Nav links scroll horizontally between them
- No hamburger menu, no collapse — just scroll
- JSX: add `className="cy-header-nav"` to the nav element

### 2. Hero

- Reduce top padding from `64px` to `40px`
- Already responsive: `clamp(40px, 8vw, 88px)` on h1, `flex-wrap` on buttons and stats
- No JSX changes needed — target via existing selectors or section element

### 3. Section grids (Tokens, Typography, Components 2-col areas)

These use inline `gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'` which overflows on phones.

- JSX: add `className="cy-section-grid"` to these wrapper divs
- CSS: `.cy-section-grid { grid-template-columns: 1fr !important; }` at mobile
- Affected locations:
  - `TokensSection` — spacing/radius/elevation grid
  - `TypographySection` — font family cards grid
  - `ComponentsSection` — badges/avatars/forms/toggles/tabs/progress grid

### 4. Colors section grids

- Signature colors: `minmax(180px, 1fr)` — override to `repeat(2, 1fr)` on mobile
- Semantic tokens: `minmax(140px, 1fr)` — override to `repeat(2, 1fr)` on mobile
- JSX: add `className="cy-color-grid"` and `className="cy-semantic-grid"` respectively

### 5. Tables (button variant matrix, data table)

- Already wrapped in `overflow: auto` divs
- Add `max-width: 100vw` and `overflow: hidden` on `.card` at mobile to prevent viewport blowout
- No JSX changes needed

### 6. App shell pattern

- Current: `gridTemplateColumns: '200px 1fr'`, `height: 360`
- Mobile: stack vertically — `grid-template-columns: 1fr`, `height: auto`
- Sidebar becomes a compact horizontal strip at top
- Inner stats grid (`repeat(3, 1fr)`) drops to single column
- JSX: add `className="cy-app-shell"` to the outer grid div, `className="cy-app-shell-stats"` to the stats grid

### 7. Settings form

- Name fields: `gridTemplateColumns: '1fr 1fr'` — stack to `1fr`
- Plan cards: `repeat(3, 1fr)` — stack to `1fr`
- JSX: add `className="cy-form-2col"` to name fields div, `className="cy-form-3col"` to plan cards div

### 8. Patterns bottom grid

- `minmax(380px, 1fr)` for form + command palette — override to single column
- JSX: add `className="cy-section-grid"` (reuse the same class)

### 9. Accessibility section (index.html)

- A11y feature cards grid: `minmax(260px, 1fr)` — override to single column
- JSX: add `className="cy-section-grid"` to that grid div in `AccessibilitySection`

### 10. Global safeguards

- `main` padding: reduce from `32px 24px` to `16px 12px` on mobile
- Cards: `max-width: 100vw; overflow: hidden;` to prevent any card from blowing out the viewport

## JSX changes summary

Only `className` additions — no layout logic, no hooks, no conditional rendering:

| File | Element | Class added |
|------|---------|-------------|
| `index.html` | Header nav | `cy-header-nav` |
| `sections.jsx` | TokensSection grid | `cy-section-grid` |
| `sections.jsx` | TypographySection grid | `cy-section-grid` |
| `sections.jsx` | ColorsSection signature grid | `cy-color-grid` |
| `sections.jsx` | ColorsSection semantic grid | `cy-semantic-grid` |
| `sections.jsx` | ComponentsSection 2-col grid | `cy-section-grid` |
| `index.html` | A11y feature cards grid | `cy-section-grid` |
| `patterns.jsx` | App shell outer grid | `cy-app-shell` |
| `patterns.jsx` | App shell stats grid | `cy-app-shell-stats` |
| `patterns.jsx` | Settings form name fields | `cy-form-2col` |
| `patterns.jsx` | Settings form plan cards | `cy-form-3col` |
| `patterns.jsx` | Bottom form+command grid | `cy-section-grid` |

## CSS structure

All responsive rules go in a single `@media (max-width: 768px) { ... }` block at the bottom of `cythera.css`. Uses `!important` sparingly only where inline styles need overriding.

## Out of scope

- Touch interaction quality (dialogs, toasts, tweaks panel)
- Landscape-specific handling
- Tablet-specific breakpoint (768px+ is desktop)
- Any changes to `figma/` side
