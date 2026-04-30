# Cythera UI Registry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a shadcn-compatible component registry at `cythera-ui/` with all 75 components themed with Cythera's design system, supporting both Radix UI and Base UI primitives.

**Architecture:** Each component follows shadcn v4 patterns exactly — `data-slot`, `cn()`, `cva()` for variants, `React.ComponentProps` for types, Tailwind-only styling. Theme tokens in oklch. Registry JSON with per-component item files. Dual primitive support via parallel `ui/` and `ui-base/` directories.

**Tech Stack:** TypeScript, Tailwind CSS v4, Radix UI, Base UI, class-variance-authority, clsx, tailwind-merge, lucide-react

---

## File Structure Overview

```
cythera-ui/
├── package.json
├── registry.json
├── r/                          # per-component registry-item JSON
├── components/ui/              # Radix-based components (75 files)
├── components/ui-base/         # Base UI components (30 files, shared skip ~45)
├── lib/utils.ts
├── hooks/use-mobile.ts
└── theme/
    ├── globals.css
    └── tailwind.css
```

---

### Task 1: Scaffold directory structure and foundation files

**Files:**
- Create: `cythera-ui/package.json`
- Create: `cythera-ui/lib/utils.ts`
- Create: `cythera-ui/hooks/use-mobile.ts`
- Create: `cythera-ui/theme/globals.css`
- Create: `cythera-ui/theme/tailwind.css`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "cythera-ui",
  "version": "0.1.0",
  "description": "A shadcn-compatible component registry themed with the Cythera design system",
  "license": "MIT",
  "author": "herrhelms",
  "repository": {
    "type": "git",
    "url": "https://github.com/herrhelms/cythera-design-system"
  },
  "keywords": ["shadcn", "ui", "components", "design-system", "cythera"],
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "tailwindcss": ">=4"
  }
}
```

- [ ] **Step 2: Create lib/utils.ts**

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 3: Create hooks/use-mobile.ts**

```typescript
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

- [ ] **Step 4: Create theme/globals.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Geist+Mono:wght@100..900&family=Share+Tech+Mono&display=swap');

:root {
  --background: oklch(0.98 0.01 270);
  --foreground: oklch(0.22 0.04 270);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.22 0.04 270);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.22 0.04 270);
  --primary: oklch(0.48 0.2 260);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.56 0.28 320);
  --secondary-foreground: oklch(1 0 0);
  --accent: oklch(0.65 0.17 230);
  --accent-foreground: oklch(1 0 0);
  --muted: oklch(0.92 0.03 270);
  --muted-foreground: oklch(0.42 0.03 250);
  --destructive: oklch(0.58 0.22 25);
  --destructive-foreground: oklch(1 0 0);
  --success: oklch(0.72 0.19 145);
  --success-foreground: oklch(1 0 0);
  --warning: oklch(0.77 0.17 75);
  --warning-foreground: oklch(1 0 0);
  --info: oklch(0.48 0.2 260);
  --info-foreground: oklch(1 0 0);
  --border: oklch(0.85 0.04 230 / 0.35);
  --input: oklch(0.95 0.02 270);
  --ring: oklch(0.6 0.15 260);
  --radius: 0.625rem;

  --cythera-cyan: oklch(0.83 0.12 210);
  --cythera-lime: oklch(0.9 0.18 120);
  --cythera-orange: oklch(0.82 0.12 60);
  --cythera-purple: oklch(0.82 0.12 290);

  --font-sans: 'Rajdhani', system-ui, sans-serif;
  --font-display: 'Orbitron', monospace, sans-serif;
  --font-mono: 'Geist Mono', 'Courier New', monospace;
  --font-tech: 'Share Tech Mono', monospace;

  --shadow-xs: 0 1px 2px 0 oklch(0.83 0.12 210 / 0.08);
  --shadow-sm: 0 1px 3px 0 oklch(0.83 0.12 210 / 0.15);
  --shadow-md: 0 4px 8px -2px oklch(0.83 0.12 210 / 0.25);
  --shadow-lg: 0 10px 20px -5px oklch(0.83 0.12 210 / 0.3);
  --shadow-xl: 0 20px 35px -8px oklch(0.83 0.12 210 / 0.35);
  --shadow-glow: 0 0 25px oklch(0.83 0.12 210 / 0.3);
}

.dark {
  --background: oklch(0.15 0.03 260);
  --foreground: oklch(0.93 0.01 250);
  --card: oklch(0.17 0.02 240);
  --card-foreground: oklch(0.93 0.01 250);
  --popover: oklch(0.17 0.02 240);
  --popover-foreground: oklch(0.93 0.01 250);
  --primary: oklch(0.83 0.14 195);
  --primary-foreground: oklch(0.15 0.03 260);
  --secondary: oklch(0.72 0.22 340);
  --secondary-foreground: oklch(0.17 0.02 240);
  --accent: oklch(0.88 0.2 130);
  --accent-foreground: oklch(0.17 0.02 240);
  --muted: oklch(0.23 0.02 240);
  --muted-foreground: oklch(0.8 0.02 240);
  --destructive: oklch(0.68 0.2 35);
  --destructive-foreground: oklch(0.17 0.02 240);
  --success: oklch(0.88 0.2 130);
  --success-foreground: oklch(0.17 0.02 240);
  --warning: oklch(0.83 0.16 80);
  --warning-foreground: oklch(0.17 0.02 240);
  --info: oklch(0.83 0.14 195);
  --info-foreground: oklch(0.17 0.02 240);
  --border: oklch(0.7 0.1 200 / 0.18);
  --input: oklch(0.23 0.02 240);
  --ring: oklch(0.83 0.14 195);

  --cythera-cyan: oklch(0.83 0.14 195);
  --cythera-lime: oklch(0.88 0.2 130);
  --cythera-orange: oklch(0.68 0.2 35);
  --cythera-purple: oklch(0.76 0.14 295);

  --shadow-xs: 0 1px 2px 0 oklch(0 0 0 / 0.2);
  --shadow-sm: 0 1px 2px 0 oklch(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.5);
  --shadow-xl: 0 20px 25px -5px oklch(0 0 0 / 0.6);
  --shadow-glow: 0 0 25px oklch(0.7 0.1 200 / 0.3);
}
```

- [ ] **Step 5: Create theme/tailwind.css**

```css
@import "tailwindcss";
@import "./globals.css";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-cythera-cyan: var(--cythera-cyan);
  --color-cythera-lime: var(--cythera-lime);
  --color-cythera-orange: var(--cythera-orange);
  --color-cythera-purple: var(--cythera-purple);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-display: var(--font-display);
  --font-tech: var(--font-tech);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }
}
```

- [ ] **Step 6: Create directory structure**

```bash
mkdir -p cythera-ui/{r,components/ui,components/ui-base,lib,hooks,theme}
```

- [ ] **Step 7: Commit**

```bash
git add cythera-ui/
git commit -m "feat(cythera-ui): scaffold registry with theme tokens and utilities"
```

---

### Task 2: Core primitives — Button, Badge, Kbd, Spinner, Skeleton, Separator

**Files:**
- Create: `cythera-ui/components/ui/button.tsx`
- Create: `cythera-ui/components/ui/badge.tsx`
- Create: `cythera-ui/components/ui/kbd.tsx`
- Create: `cythera-ui/components/ui/spinner.tsx`
- Create: `cythera-ui/components/ui/skeleton.tsx`
- Create: `cythera-ui/components/ui/separator.tsx`

- [ ] **Step 1: Create button.tsx**

```typescript
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none cursor-pointer font-sans focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-[0_0_0_1px_oklch(var(--primary)/0.6),0_6px_18px_-2px_oklch(var(--primary)/0.5),0_0_28px_oklch(var(--primary)/0.45)] hover:-translate-y-px active:translate-y-0 active:shadow-[0_0_12px_oklch(var(--primary)/0.4)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 hover:shadow-[0_0_0_1px_oklch(var(--secondary)/0.5),0_4px_14px_-2px_oklch(var(--secondary)/0.4)] hover:-translate-y-px",
        outline:
          "border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:-translate-y-px dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-[0_0_0_1px_oklch(var(--destructive)/0.5),0_4px_14px_-2px_oklch(var(--destructive)/0.4)] hover:-translate-y-px focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        ghost:
          "hover:bg-accent/14 hover:text-accent-foreground dark:hover:bg-accent/10",
        link:
          "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-lg px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

- [ ] **Step 2: Create badge.tsx**

```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-colors font-sans focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline:
          "border-border text-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm",
        success:
          "border-transparent bg-success text-success-foreground shadow-sm",
        warning:
          "border-transparent bg-warning text-warning-foreground shadow-sm",
        info:
          "border-transparent bg-info text-info-foreground shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
```

- [ ] **Step 3: Create kbd.tsx**

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 items-center justify-center rounded border border-border bg-muted px-1.5 font-tech text-[10px] font-medium text-muted-foreground shadow-xs",
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
```

- [ ] **Step 4: Create spinner.tsx**

```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        default: "size-4",
        sm: "size-3",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Spinner({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof spinnerVariants>) {
  return (
    <div
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export { Spinner, spinnerVariants }
```

- [ ] **Step 5: Create skeleton.tsx**

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
```

- [ ] **Step 6: Create separator.tsx**

```typescript
"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
```

- [ ] **Step 7: Commit**

```bash
git add cythera-ui/components/ui/
git commit -m "feat(cythera-ui): add Button, Badge, Kbd, Spinner, Skeleton, Separator"
```

---

### Task 3: Layout components — Card, Aspect Ratio, Empty, Typography

**Files:**
- Create: `cythera-ui/components/ui/card.tsx`
- Create: `cythera-ui/components/ui/aspect-ratio.tsx`
- Create: `cythera-ui/components/ui/empty.tsx`
- Create: `cythera-ui/components/ui/typography.tsx`

- [ ] **Step 1: Create card.tsx**

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-6 rounded-xl border border-border bg-card py-6 text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-semibold leading-none", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardAction, CardContent }
```

- [ ] **Step 2: Create aspect-ratio.tsx**

```typescript
"use client"

import { AspectRatio } from "radix-ui"

export { AspectRatio }
```

- [ ] **Step 3: Create empty.tsx**

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border p-8 text-center",
        className
      )}
      {...props}
    />
  )
}

function EmptyIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-icon"
      className={cn(
        "flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-6",
        className
      )}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="empty-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-description"
      className={cn("text-sm text-muted-foreground max-w-sm", className)}
      {...props}
    />
  )
}

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription }
```

- [ ] **Step 4: Create typography.tsx**

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function TypographyH1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="typography-h1"
      className={cn(
        "scroll-m-20 font-display text-4xl font-bold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    />
  )
}

function TypographyH2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="typography-h2"
      className={cn(
        "scroll-m-20 border-b border-border pb-2 font-display text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  )
}

function TypographyH3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="typography-h3"
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function TypographyH4({ className, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      data-slot="typography-h4"
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function TypographyP({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="typography-p"
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  )
}

function TypographyLead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="typography-lead"
      className={cn("text-xl text-muted-foreground", className)}
      {...props}
    />
  )
}

function TypographyLarge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="typography-large"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function TypographySmall({ className, ...props }: React.ComponentProps<"small">) {
  return (
    <small
      data-slot="typography-small"
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
}

function TypographyMuted({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="typography-muted"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function TypographyCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      data-slot="typography-code"
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    />
  )
}

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyCode,
}
```

- [ ] **Step 5: Commit**

```bash
git add cythera-ui/components/ui/
git commit -m "feat(cythera-ui): add Card, AspectRatio, Empty, Typography"
```

---

### Task 4: Form controls — Input, InputGroup, InputOTP, Textarea, Label, Field, NativeSelect

**Files:**
- Create: `cythera-ui/components/ui/input.tsx`
- Create: `cythera-ui/components/ui/input-group.tsx`
- Create: `cythera-ui/components/ui/input-otp.tsx`
- Create: `cythera-ui/components/ui/textarea.tsx`
- Create: `cythera-ui/components/ui/label.tsx`
- Create: `cythera-ui/components/ui/field.tsx`
- Create: `cythera-ui/components/ui/native-select.tsx`

This task follows the same pattern as Tasks 2-3. Each component:
1. Imports `cn` from `@/lib/utils`
2. Uses `React.ComponentProps<"element">` for typing
3. Adds `data-slot` attribute
4. Uses Tailwind-only classes referencing Cythera CSS variables
5. Exports named function

- [ ] **Step 1: Create input.tsx**

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none font-sans selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "dark:bg-input/30",
        className
      )}
      {...props}
    />
  )
}

export { Input }
```

- [ ] **Step 2: Create input-group.tsx**

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex items-center [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child)]:-ml-px",
        className
      )}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "inline-flex h-9 items-center rounded-lg border border-input bg-muted px-3 text-sm text-muted-foreground font-mono",
        className
      )}
      {...props}
    />
  )
}

export { InputGroup, InputGroupText }
```

- [ ] **Step 3: Create input-otp.tsx**

```typescript
"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & { containerClassName?: string }) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-9 items-center justify-center border-y border-r border-input text-sm font-mono shadow-xs transition-all first:rounded-l-lg first:border-l last:rounded-r-lg",
        isActive && "z-10 border-ring ring-[3px] ring-ring/50",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
```

- [ ] **Step 4: Create textarea.tsx**

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none font-sans placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "dark:bg-input/30",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
```

- [ ] **Step 5: Create label.tsx**

```typescript
"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm font-medium leading-none font-sans select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
```

- [ ] **Step 6: Create field.tsx**

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field"
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function FieldError({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-error"
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  )
}

export { Field, FieldDescription, FieldError }
```

- [ ] **Step 7: Create native-select.tsx**

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="native-select"
      className={cn(
        "flex h-9 w-full appearance-none rounded-lg border border-input bg-transparent px-3 py-1 pr-8 text-base shadow-xs outline-none font-sans disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "dark:bg-input/30",
        className
      )}
      {...props}
    />
  )
}

export { NativeSelect }
```

- [ ] **Step 8: Commit**

```bash
git add cythera-ui/components/ui/
git commit -m "feat(cythera-ui): add Input, InputGroup, InputOTP, Textarea, Label, Field, NativeSelect"
```

---

### Task 5: Toggle controls — Checkbox, RadioGroup, Switch, Select, Slider, Toggle, ToggleGroup

**Files:**
- Create: `cythera-ui/components/ui/checkbox.tsx`
- Create: `cythera-ui/components/ui/radio-group.tsx`
- Create: `cythera-ui/components/ui/switch.tsx`
- Create: `cythera-ui/components/ui/select.tsx`
- Create: `cythera-ui/components/ui/slider.tsx`
- Create: `cythera-ui/components/ui/toggle.tsx`
- Create: `cythera-ui/components/ui/toggle-group.tsx`

- [ ] **Step 1: Create checkbox.tsx**

```typescript
"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[state=checked]:bg-primary dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
```

- [ ] **Step 2: Create radio-group.tsx**

```typescript
"use client"

import * as React from "react"
import { CircleIcon } from "lucide-react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-4 shrink-0 rounded-full border border-input shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[state=checked]:bg-primary dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <CircleIcon className="size-2 fill-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
```

- [ ] **Step 3: Create switch.tsx**

```typescript
"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
```

- [ ] **Step 4: Create select.tsx**

```typescript
"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none font-sans transition-[color,box-shadow] whitespace-nowrap placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        "focus:border-ring focus:ring-[3px] focus:ring-ring/50",
        "dark:bg-input/30",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
```

- [ ] **Step 5: Create slider.tsx**

```typescript
"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () => value ?? defaultValue ?? [min],
    [value, defaultValue, min]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full bg-primary"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-4 rounded-full border border-primary/50 bg-background shadow-sm transition-[color,box-shadow] outline-none hover:border-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
```

- [ ] **Step 6: Create toggle.tsx**

```typescript
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all outline-none hover:bg-muted hover:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent/14 data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-3 min-w-9",
        sm: "h-8 px-2 min-w-8",
        lg: "h-10 px-4 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
```

- [ ] **Step 7: Create toggle-group.tsx**

```typescript
"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<{
  size?: "default" | "sm" | "lg"
  variant?: "default" | "outline"
}>({ size: "default", variant: "default" })

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex items-center justify-center gap-1 rounded-lg",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={variant || context.variant}
      data-size={size || context.size}
      className={cn(
        toggleVariants({
          variant: variant || context.variant,
          size: size || context.size,
        }),
        "min-w-0 flex-1 shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
```

- [ ] **Step 8: Commit**

```bash
git add cythera-ui/components/ui/
git commit -m "feat(cythera-ui): add Checkbox, RadioGroup, Switch, Select, Slider, Toggle, ToggleGroup"
```

---

### Task 6: Feedback — Alert, AlertDialog, Progress, Toast, Sonner

**Files:**
- Create: `cythera-ui/components/ui/alert.tsx`
- Create: `cythera-ui/components/ui/alert-dialog.tsx`
- Create: `cythera-ui/components/ui/progress.tsx`
- Create: `cythera-ui/components/ui/toast.tsx`
- Create: `cythera-ui/components/ui/sonner.tsx`

The agent implementing this task should reference shadcn's source for AlertDialog (Radix-wrapped), Toast (Radix Toast), and Sonner (sonner library wrapper). Each follows the established patterns from Tasks 2-5: `data-slot`, `cn()`, Tailwind-only, Cythera glow/border tokens.

- [ ] **Step 1-5: Implement each component following shadcn v4 patterns**

Each component must:
- Use `data-slot` attributes
- Use Cythera CSS variables via Tailwind classes
- Alert: use `cva` for variant (default, destructive, success, warning, info)
- AlertDialog: wrap all Radix AlertDialog primitives
- Progress: wrap Radix Progress with glow track
- Toast: wrap Radix Toast with Cythera card styling
- Sonner: thin wrapper around `sonner` library with Cythera theme

- [ ] **Step 6: Commit**

```bash
git add cythera-ui/components/ui/
git commit -m "feat(cythera-ui): add Alert, AlertDialog, Progress, Toast, Sonner"
```

---

### Task 7: Navigation — Breadcrumb, NavigationMenu, Menubar, Pagination, Tabs

**Files:**
- Create: `cythera-ui/components/ui/breadcrumb.tsx`
- Create: `cythera-ui/components/ui/navigation-menu.tsx`
- Create: `cythera-ui/components/ui/menubar.tsx`
- Create: `cythera-ui/components/ui/pagination.tsx`
- Create: `cythera-ui/components/ui/tabs.tsx`

- [ ] **Step 1-5: Implement each component**

- Breadcrumb: pure HTML composition (no primitive needed)
- NavigationMenu: wrap Radix NavigationMenu
- Menubar: wrap Radix Menubar
- Pagination: pure HTML with Button composition
- Tabs: wrap Radix Tabs

- [ ] **Step 6: Commit**

```bash
git add cythera-ui/components/ui/
git commit -m "feat(cythera-ui): add Breadcrumb, NavigationMenu, Menubar, Pagination, Tabs"
```

---

### Task 8: Overlays — Dialog, Popover, Tooltip, HoverCard, Sheet, Drawer, Collapsible, Accordion

**Files:**
- Create: `cythera-ui/components/ui/dialog.tsx`
- Create: `cythera-ui/components/ui/popover.tsx`
- Create: `cythera-ui/components/ui/tooltip.tsx`
- Create: `cythera-ui/components/ui/hover-card.tsx`
- Create: `cythera-ui/components/ui/sheet.tsx`
- Create: `cythera-ui/components/ui/drawer.tsx`
- Create: `cythera-ui/components/ui/collapsible.tsx`
- Create: `cythera-ui/components/ui/accordion.tsx`

- [ ] **Step 1-8: Implement each component**

All wrap Radix primitives except Drawer (wraps `vaul`). Each adds `data-slot`, uses `cn()`, Cythera border/shadow tokens. Dialog and Sheet overlays use `bg-black/50 backdrop-blur-sm` for the Cythera frosted-glass effect.

- [ ] **Step 9: Commit**

```bash
git add cythera-ui/components/ui/
git commit -m "feat(cythera-ui): add Dialog, Popover, Tooltip, HoverCard, Sheet, Drawer, Collapsible, Accordion"
```

---

### Task 9: Menus — DropdownMenu, ContextMenu, Command, Combobox

**Files:**
- Create: `cythera-ui/components/ui/dropdown-menu.tsx`
- Create: `cythera-ui/components/ui/context-menu.tsx`
- Create: `cythera-ui/components/ui/command.tsx`
- Create: `cythera-ui/components/ui/combobox.tsx`

- [ ] **Step 1-4: Implement each component**

- DropdownMenu: wrap Radix DropdownMenu (all sub-components)
- ContextMenu: wrap Radix ContextMenu (same pattern as DropdownMenu)
- Command: wrap `cmdk` library with Cythera styling
- Combobox: composition of Command + Popover

- [ ] **Step 5: Commit**

```bash
git add cythera-ui/components/ui/
git commit -m "feat(cythera-ui): add DropdownMenu, ContextMenu, Command, Combobox"
```

---

### Task 10: Data display — Table, Avatar, Calendar, Chart, Carousel, DataTable, DatePicker

**Files:**
- Create: `cythera-ui/components/ui/table.tsx`
- Create: `cythera-ui/components/ui/avatar.tsx`
- Create: `cythera-ui/components/ui/calendar.tsx`
- Create: `cythera-ui/components/ui/chart.tsx`
- Create: `cythera-ui/components/ui/carousel.tsx`
- Create: `cythera-ui/components/ui/data-table.tsx`
- Create: `cythera-ui/components/ui/date-picker.tsx`

- [ ] **Step 1-7: Implement each component**

- Table: pure HTML table wrappers
- Avatar: wrap Radix Avatar
- Calendar: wrap `react-day-picker` with Cythera styling
- Chart: wrap `recharts` with Cythera color tokens
- Carousel: wrap `embla-carousel-react`
- DataTable: composition of Table + `@tanstack/react-table`
- DatePicker: composition of Calendar + Popover

- [ ] **Step 8: Commit**

```bash
git add cythera-ui/components/ui/
git commit -m "feat(cythera-ui): add Table, Avatar, Calendar, Chart, Carousel, DataTable, DatePicker"
```

---

### Task 11: Utility — ScrollArea, Resizable, Sidebar, Direction, Item, ButtonGroup

**Files:**
- Create: `cythera-ui/components/ui/scroll-area.tsx`
- Create: `cythera-ui/components/ui/resizable.tsx`
- Create: `cythera-ui/components/ui/sidebar.tsx`
- Create: `cythera-ui/components/ui/direction.tsx`
- Create: `cythera-ui/components/ui/item.tsx`
- Create: `cythera-ui/components/ui/button-group.tsx`

- [ ] **Step 1-6: Implement each component**

- ScrollArea: wrap Radix ScrollArea
- Resizable: wrap `react-resizable-panels`
- Sidebar: composition component using Sheet for mobile, fixed for desktop
- Direction: wrap Radix Direction
- Item: generic list item component
- ButtonGroup: layout wrapper for grouped buttons

- [ ] **Step 7: Commit**

```bash
git add cythera-ui/components/ui/
git commit -m "feat(cythera-ui): add ScrollArea, Resizable, Sidebar, Direction, Item, ButtonGroup"
```

---

### Task 12: Registry JSON files

**Files:**
- Create: `cythera-ui/registry.json`
- Create: `cythera-ui/r/*.json` (one per component, 75 files)

- [ ] **Step 1: Create registry.json**

Create the top-level registry index pointing to all component items.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "cythera",
  "homepage": "https://herrhelms.github.io/cythera-design-system",
  "items": []
}
```

Populate `items` with one entry per component, each referencing its `r/<name>.json` file.

- [ ] **Step 2: Create per-component registry-item JSON files**

For each of the 75 components, create `r/<name>.json` following this template:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "<component-name>",
  "type": "registry:ui",
  "title": "<Component Name>",
  "description": "<one-line description>",
  "dependencies": ["<npm-packages>"],
  "registryDependencies": ["<other-registry-items>"],
  "files": [
    {
      "path": "components/ui/<component-name>.tsx",
      "type": "registry:ui"
    }
  ]
}
```

Key dependency mappings:
- Button: `["class-variance-authority"]`, registryDependencies: `[]`
- Badge: `["class-variance-authority"]`
- Dialog: `["radix-ui"]`, registryDependencies: `["button"]`
- Select: `["radix-ui", "lucide-react"]`
- Command: `["cmdk"]`, registryDependencies: `["dialog"]`
- Calendar: `["react-day-picker"]`, registryDependencies: `["button"]`
- Chart: `["recharts"]`, registryDependencies: `["card"]`
- Carousel: `["embla-carousel-react"]`, registryDependencies: `["button"]`
- DataTable: `["@tanstack/react-table"]`, registryDependencies: `["table"]`
- Drawer: `["vaul"]`
- InputOTP: `["input-otp"]`
- Sonner: `["sonner"]`
- Resizable: `["react-resizable-panels"]`
- Toast: `["radix-ui"]`

- [ ] **Step 3: Commit**

```bash
git add cythera-ui/registry.json cythera-ui/r/
git commit -m "feat(cythera-ui): add registry index and per-component JSON files"
```

---

### Task 13: Base UI variants for primitive-dependent components

**Files:**
- Create: `cythera-ui/components/ui-base/*.tsx` (~30 files)

- [ ] **Step 1: Create Base UI variants**

For each primitive-dependent component, create a parallel file in `ui-base/` that imports from `@base-ui-components/react` instead of `radix-ui`. The Tailwind classes and Cythera theme stay identical — only the primitive imports and wrapper API change.

Components that need Base UI variants:
Accordion, AlertDialog, Checkbox, Collapsible, Dialog, DropdownMenu, HoverCard, Label, Menubar, NavigationMenu, Popover, Progress, RadioGroup, ScrollArea, Select, Separator, Sheet, Slider, Switch, Tabs, Toast, Toggle, ToggleGroup, Tooltip

Components that are shared (no primitive, copy from `ui/`):
Alert, AspectRatio, Avatar, Badge, Breadcrumb, Button, ButtonGroup, Calendar, Card, Carousel, Chart, Combobox, Command, ContextMenu, DataTable, DatePicker, Direction, Drawer, Empty, Field, Input, InputGroup, InputOTP, Item, Kbd, NativeSelect, Pagination, Resizable, Sidebar, Skeleton, Sonner, Spinner, Table, Textarea, Typography

- [ ] **Step 2: Create Base UI registry-item JSON files**

For each Base UI variant, create `r/<name>-base.json` with `"dependencies": ["@base-ui-components/react"]` and `"files"` pointing to `components/ui-base/<name>.tsx`.

- [ ] **Step 3: Commit**

```bash
git add cythera-ui/components/ui-base/ cythera-ui/r/
git commit -m "feat(cythera-ui): add Base UI component variants"
```
