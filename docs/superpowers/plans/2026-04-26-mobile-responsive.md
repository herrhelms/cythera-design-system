# Mobile Responsive Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every panel in the claude-design showcase wrap correctly on mobile viewports (down to 320px) while keeping desktop layout untouched.

**Architecture:** Single `@media (max-width: 768px)` block at the bottom of `cythera.css`. Minimal JSX changes — only adding classNames to ~10 wrapper divs so CSS can override inline grid styles. No hooks, no conditional rendering, no layout logic changes.

**Tech Stack:** CSS media queries, existing inline React styles

**Rollback point:** `3ec8604`

---

## File Structure

| File | Role |
|------|------|
| `claude-design/assets/cythera.css` | Add responsive media query block at bottom |
| `claude-design/index.html` | Add classNames to header nav + a11y grid |
| `claude-design/assets/sections.jsx` | Add classNames to section grids |
| `claude-design/assets/patterns.jsx` | Add classNames to app shell + form grids |

---

### Task 1: Add classNames to JSX wrapper divs

**Files:**
- Modify: `claude-design/index.html:79` (a11y grid)
- Modify: `claude-design/index.html:202` (header nav)
- Modify: `claude-design/assets/sections.jsx:15,60,127,147,251` (section grids)
- Modify: `claude-design/assets/patterns.jsx:164,177,258,303,333` (pattern grids)

- [ ] **Step 1: Add `cy-header-nav` to header nav in index.html**

In `index.html` line 202, change:
```jsx
<nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
```
to:
```jsx
<nav className="cy-header-nav" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
```

- [ ] **Step 2: Add `cy-section-grid` to a11y feature cards grid in index.html**

In `index.html` line 79, change:
```jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
```
to:
```jsx
<div className="cy-section-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
```

- [ ] **Step 3: Add `cy-section-grid` to three grids in sections.jsx**

In `sections.jsx` line 15 (TokensSection), change:
```jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
```
to:
```jsx
<div className="cy-section-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
```

In `sections.jsx` line 60 (TypographySection), same change — add `className="cy-section-grid"`.

In `sections.jsx` line 251 (ComponentsSection), same change — add `className="cy-section-grid"`.

- [ ] **Step 4: Add `cy-color-grid` and `cy-semantic-grid` in sections.jsx**

In `sections.jsx` line 127 (ColorsSection signature colors), change:
```jsx
<CardContent style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
```
to:
```jsx
<CardContent className="cy-color-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
```

In `sections.jsx` line 147 (ColorsSection semantic tokens), change:
```jsx
<CardContent style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
```
to:
```jsx
<CardContent className="cy-semantic-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
```

- [ ] **Step 5: Add classNames to patterns.jsx grids**

In `patterns.jsx` line 164 (form name fields), change:
```jsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
```
to:
```jsx
<div className="cy-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
```

In `patterns.jsx` line 177 (plan cards), change:
```jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
```
to:
```jsx
<div className="cy-form-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
```

In `patterns.jsx` line 258 (app shell outer grid), change:
```jsx
<div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0, height: 360, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
```
to:
```jsx
<div className="cy-app-shell" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0, height: 360, border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
```

In `patterns.jsx` line 303 (app shell inner stats), change:
```jsx
<div style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
```
to:
```jsx
<div className="cy-app-shell-stats" style={{ padding: 18, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
```

In `patterns.jsx` line 333 (bottom form+command grid), change:
```jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 16 }}>
```
to:
```jsx
<div className="cy-section-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 16 }}>
```

- [ ] **Step 6: Commit**

```bash
git add claude-design/index.html claude-design/assets/sections.jsx claude-design/assets/patterns.jsx
git commit -m "Add responsive classNames to grid wrapper divs for mobile CSS targeting"
```

---

### Task 2: Add responsive media query block to cythera.css

**Files:**
- Modify: `claude-design/assets/cythera.css` (append at bottom)

- [ ] **Step 1: Add the full `@media (max-width: 768px)` block at end of cythera.css**

Append this block at the very end of `cythera.css`:

```css
/* ===== mobile responsive (view-only showcase) ===== */
@media (max-width: 768px) {
  /* --- header: horizontal-scrolling nav --- */
  .cy-header-nav {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    flex-shrink: 1;
    min-width: 0;
  }
  .cy-header-nav::-webkit-scrollbar { display: none; }

  /* --- hero: tighten top padding --- */
  #root section:first-of-type {
    padding-top: 40px !important;
  }

  /* --- main container: reduce padding --- */
  main {
    padding: 16px 12px 64px !important;
  }

  /* --- section grids: single column --- */
  .cy-section-grid {
    grid-template-columns: 1fr !important;
  }

  /* --- color grids: 2-col on mobile --- */
  .cy-color-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .cy-semantic-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }

  /* --- cards: prevent viewport blowout --- */
  .card {
    max-width: calc(100vw - 24px);
    overflow: hidden;
  }

  /* --- tables: ensure horizontal scroll works --- */
  .card [style*="overflow: auto"],
  .card [style*="overflow:auto"] {
    max-width: 100%;
  }

  /* --- app shell pattern: stack vertically --- */
  .cy-app-shell {
    grid-template-columns: 1fr !important;
    height: auto !important;
  }
  .cy-app-shell aside {
    border-right: none !important;
    border-bottom: 1px solid var(--border);
  }
  .cy-app-shell-stats {
    grid-template-columns: 1fr !important;
  }

  /* --- settings form: stack fields --- */
  .cy-form-2col {
    grid-template-columns: 1fr !important;
  }
  .cy-form-3col {
    grid-template-columns: 1fr !important;
  }
}
```

- [ ] **Step 2: Visually QA in browser**

Run: `python3 -m http.server -d claude-design 8000`

Check at 375px and 320px viewport widths:
- Header scrolls horizontally, logo and theme toggle visible
- All section grids stack to single column
- Color swatches show 2-per-row
- Button table and data table scroll horizontally inside cards
- App shell stacks sidebar on top of content
- Settings form fields and plan cards stack vertically
- No horizontal viewport overflow on any section

- [ ] **Step 3: Commit**

```bash
git add claude-design/assets/cythera.css
git commit -m "Add mobile responsive media queries for showcase panels"
```
