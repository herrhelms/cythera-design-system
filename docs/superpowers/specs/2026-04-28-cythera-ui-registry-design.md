# Cythera UI — shadcn-Compatible Component Registry

## Goal

Create a shadcn-compatible component registry at `cythera-ui/` that ships all 75 shadcn components themed with Cythera's design system. Users configure it as a custom registry and pull components via `npx shadcn add @cythera/button`. Components support both Radix UI and Base UI primitives via an adapter pattern.

## Architecture

A standalone registry directory within the existing repo. No build step required for the registry itself — shadcn CLI consumes the JSON + source files directly. Components are TypeScript + Tailwind (no inline styles). Theme tokens are expressed as CSS custom properties in oklch color space, matching shadcn's convention.

## Directory Structure

```
cythera-ui/
├── registry.json                    # registry index with all items
├── r/                               # per-component registry-item JSON
│   ├── styles/
│   │   ├── cythera.json             # theme definition (type: registry:style)
│   │   └── cythera-base.json        # Base UI variant theme
│   ├── button.json
│   ├── card.json
│   └── ... (one per component)
├── components/
│   ├── ui/                          # Radix UI component source (default)
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── combobox.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── data-table.tsx
│   │   ├── date-picker.tsx
│   │   ├── dialog.tsx
│   │   ├── direction.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── empty.tsx
│   │   ├── field.tsx
│   │   ├── hover-card.tsx
│   │   ├── input.tsx
│   │   ├── input-group.tsx
│   │   ├── input-otp.tsx
│   │   ├── item.tsx
│   │   ├── kbd.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── native-select.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── spinner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toggle.tsx
│   │   ├── toggle-group.tsx
│   │   ├── tooltip.tsx
│   │   └── typography.tsx
│   └── ui-base/                     # Base UI component source (alt)
│       └── ... (same file list)
├── lib/
│   └── utils.ts                     # cn() helper via clsx + tailwind-merge
├── hooks/
│   └── use-mobile.ts                # shared responsive hook
├── theme/
│   ├── globals.css                  # Cythera CSS variables (oklch, light + dark)
│   └── tailwind.css                 # @theme inline directives for Tailwind v4
└── package.json                     # metadata (name, version, description)
```

## Theme Token System

### CSS Variable Mapping

All Cythera hex values converted to oklch for shadcn compatibility. Variables live in `theme/globals.css`.

#### Light mode (`:root`)

```css
:root {
  --background: oklch(0.98 0.01 270);       /* #F8F9FE */
  --foreground: oklch(0.22 0.04 270);       /* #1A1F3A */
  --card: oklch(1 0 0);                     /* #FFFFFF */
  --card-foreground: oklch(0.22 0.04 270);  /* #1A1F3A */
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.22 0.04 270);
  --primary: oklch(0.48 0.2 260);           /* #0F62FE */
  --primary-foreground: oklch(1 0 0);       /* #FFFFFF */
  --secondary: oklch(0.56 0.28 320);        /* #D946EF */
  --secondary-foreground: oklch(1 0 0);
  --accent: oklch(0.65 0.17 230);           /* #0EA5E9 */
  --accent-foreground: oklch(1 0 0);
  --muted: oklch(0.92 0.03 270);            /* #E0E7FF */
  --muted-foreground: oklch(0.42 0.03 250); /* #3F4A63 */
  --destructive: oklch(0.58 0.22 25);       /* #EF4444 */
  --destructive-foreground: oklch(1 0 0);
  --success: oklch(0.72 0.19 145);          /* #22C55E */
  --success-foreground: oklch(1 0 0);
  --warning: oklch(0.77 0.17 75);           /* #F59E0B */
  --warning-foreground: oklch(1 0 0);
  --info: oklch(0.48 0.2 260);              /* #0F62FE */
  --info-foreground: oklch(1 0 0);
  --border: oklch(0.85 0.04 230 / 0.35);
  --input: oklch(0.95 0.02 270);            /* #EEF2FF */
  --ring: oklch(0.6 0.15 260);              /* #4D8DFE */
  --radius: 0.625rem;

  /* Cythera signature palette */
  --cythera-cyan: oklch(0.83 0.12 210);     /* #7DD3FC */
  --cythera-lime: oklch(0.9 0.18 120);      /* #BEF264 */
  --cythera-orange: oklch(0.82 0.12 60);    /* #FDBA74 */
  --cythera-purple: oklch(0.82 0.12 290);   /* #C4B5FD */

  /* Typography */
  --font-sans: 'Rajdhani', system-ui, sans-serif;
  --font-display: 'Orbitron', monospace, sans-serif;
  --font-mono: 'Geist Mono', 'Courier New', monospace;
  --font-tech: 'Share Tech Mono', monospace;

  /* Shadows */
  --shadow-sm: 0 1px 3px 0 oklch(0.83 0.12 210 / 0.15);
  --shadow-md: 0 4px 8px -2px oklch(0.83 0.12 210 / 0.25);
  --shadow-lg: 0 10px 20px -5px oklch(0.83 0.12 210 / 0.3);
  --shadow-glow: 0 0 25px oklch(0.83 0.12 210 / 0.3);
}
```

#### Dark mode (`.dark`)

```css
.dark {
  --background: oklch(0.15 0.03 260);       /* #0A0E1A */
  --foreground: oklch(0.93 0.01 250);       /* #E8ECF2 */
  --card: oklch(0.17 0.02 240);             /* #0F1419 */
  --card-foreground: oklch(0.93 0.01 250);
  --popover: oklch(0.17 0.02 240);
  --popover-foreground: oklch(0.93 0.01 250);
  --primary: oklch(0.83 0.14 195);          /* #00D9FF */
  --primary-foreground: oklch(0.15 0.03 260);
  --secondary: oklch(0.72 0.22 340);        /* #FF6BD6 */
  --secondary-foreground: oklch(0.17 0.02 240);
  --accent: oklch(0.88 0.2 130);            /* #B3FF6B */
  --accent-foreground: oklch(0.17 0.02 240);
  --muted: oklch(0.23 0.02 240);            /* #1A2433 */
  --muted-foreground: oklch(0.8 0.02 240);  /* #B8C4D6 */
  --destructive: oklch(0.68 0.2 35);        /* #FF7A47 */
  --destructive-foreground: oklch(0.17 0.02 240);
  --success: oklch(0.88 0.2 130);           /* #B3FF6B */
  --success-foreground: oklch(0.17 0.02 240);
  --warning: oklch(0.83 0.16 80);           /* #FFC747 */
  --warning-foreground: oklch(0.17 0.02 240);
  --info: oklch(0.83 0.14 195);             /* #00D9FF */
  --info-foreground: oklch(0.17 0.02 240);
  --border: oklch(0.7 0.1 200 / 0.18);
  --input: oklch(0.23 0.02 240);
  --ring: oklch(0.83 0.14 195);
  --radius: 0.625rem;

  --cythera-cyan: oklch(0.83 0.14 195);     /* #00D9FF */
  --cythera-lime: oklch(0.88 0.2 130);      /* #B3FF6B */
  --cythera-orange: oklch(0.68 0.2 35);     /* #FF7A47 */
  --cythera-purple: oklch(0.76 0.14 295);   /* #C4A3FF */

  --shadow-sm: 0 1px 2px 0 oklch(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.5);
  --shadow-glow: 0 0 25px oklch(0.7 0.1 200 / 0.3);
}
```

### Cythera-Specific Design Rules

These rules apply across all components and differentiate Cythera from vanilla shadcn:

1. **Hover effects**: `box-shadow` layered glows + `translateY(-1px)`. No `filter: blur`. Reduced-motion-safe.
2. **Border treatment**: Borders use alpha-channel colors (`oklch(... / 0.18)`) not solid colors.
3. **Typography**: Display text uses Orbitron. UI text uses Rajdhani. Code uses Geist Mono. Technical labels use Share Tech Mono.
4. **Focus rings**: `ring-3 ring-ring/50` — 3px ring at 50% opacity of `--ring`.
5. **Glow accents**: Primary actions get a subtle glow on hover via `shadow-[0_0_28px_...]`.
6. **Surface hierarchy**: `background` < `card` < `input` < `border` — layered for depth.

## Primitive Adapter Pattern

Each component that wraps a headless primitive ships in two variants:

- `components/ui/*.tsx` — imports from `@radix-ui/react-*`
- `components/ui-base/*.tsx` — imports from `@base-ui-components/react`

The registry-item JSON declares the correct `dependencies` per variant. The `registry.json` uses `{style}` in file paths:

```json
{
  "name": "dialog",
  "type": "registry:ui",
  "dependencies": ["@radix-ui/react-dialog"],
  "files": [{
    "path": "components/ui/dialog.tsx",
    "type": "registry:ui"
  }]
}
```

For the Base UI variant, a parallel entry or style-based routing swaps to `components/ui-base/dialog.tsx` with `"dependencies": ["@base-ui-components/react"]`.

Components that don't need headless primitives (Card, Badge, Skeleton, Separator, etc.) are shared — identical source in both variants.

### Primitive-Dependent Components (~30)

Accordion, Alert Dialog, Checkbox, Collapsible, Combobox, Command, Context Menu, Dialog, Direction, Drawer, Dropdown Menu, Hover Card, Label, Menubar, Navigation Menu, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet, Slider, Switch, Tabs, Toast/Sonner, Toggle, Toggle Group, Tooltip

### Primitive-Free Components (~45)

Alert, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Button Group, Calendar, Card, Carousel, Chart, Data Table, Date Picker, Empty, Field, Input, Input Group, Input OTP, Item, Kbd, Native Select, Pagination, Resizable, Sidebar, Skeleton, Spinner, Table, Textarea, Typography

## Component API Standards

All components follow shadcn conventions exactly:

- **`className` prop** — always accepted, merged via `cn()` from `lib/utils.ts`
- **`cn()` helper** — `clsx` + `tailwind-merge` for class deduplication
- **`forwardRef`** — all components forward refs
- **`displayName`** — set on all components
- **Tailwind only** — zero inline styles
- **`cva`** for variant management (class-variance-authority) where components have variants
- **data-attributes** — `data-state`, `data-disabled`, `data-orientation` for styling hooks
- **TypeScript** — strict types, exported interfaces for all component props
- **Accessibility** — ARIA attributes, keyboard handling, focus management via primitives

## Registry JSON Format

### registry.json (index)

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "cythera",
  "homepage": "https://herrhelms.github.io/cythera-design-system",
  "items": [
    { "$ref": "r/button.json" },
    { "$ref": "r/card.json" },
    ...
  ]
}
```

### Per-component (e.g. r/button.json)

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "A Cythera-themed button with glow hover effects and six variants.",
  "dependencies": ["class-variance-authority"],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/button.tsx",
      "type": "registry:ui"
    }
  ],
  "cssVars": {
    "light": {
      "primary": "oklch(0.48 0.2 260)",
      "primary-foreground": "oklch(1 0 0)"
    },
    "dark": {
      "primary": "oklch(0.83 0.14 195)",
      "primary-foreground": "oklch(0.15 0.03 260)"
    }
  },
  "categories": ["form"]
}
```

## Full Component List (75)

Organized by category for implementation ordering:

**Primitives & Layout (12):** Button, Button Group, Badge, Card, Separator, Aspect Ratio, Direction, Empty, Item, Kbd, Skeleton, Spinner

**Typography (1):** Typography

**Form Controls (14):** Input, Input Group, Input OTP, Textarea, Label, Field, Checkbox, Radio Group, Select, Native Select, Switch, Slider, Toggle, Toggle Group

**Feedback (5):** Alert, Alert Dialog, Progress, Toast, Sonner

**Navigation (6):** Breadcrumb, Navigation Menu, Menubar, Pagination, Sidebar, Tabs

**Overlay & Disclosure (8):** Dialog, Popover, Tooltip, Hover Card, Sheet, Drawer, Collapsible, Accordion

**Menus (3):** Dropdown Menu, Context Menu, Command (+ Combobox as Command variant)

**Data Display (5):** Table, Data Table, Calendar, Chart, Carousel

**Utility (3):** Scroll Area, Resizable, Date Picker

**Meta (1):** Combobox (built on Command)

## Out of Scope

- npm publishing / package bundling
- Storybook or dedicated docs site
- E2E testing framework
- CLI wrapper (consumers use standard `npx shadcn add`)
- Animations beyond hover glows (no framer-motion dependency)
