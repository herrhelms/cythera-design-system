"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle } from "@base-ui-components/react/toggle"

import { cn } from "@/lib/utils"

// Base UI emits data-pressed (not data-[state=on] like Radix).
// We target both so the variant stays usable in either context.
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all outline-none hover:bg-muted hover:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-accent/14 data-[pressed]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
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

// Base UI's Toggle uses `pressed` state; it exposes data-[pressed] attribute
// Radix uses data-[state=on]. We map via className to handle both.
function Toggle_({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Toggle> & VariantProps<typeof toggleVariants>) {
  return (
    <Toggle
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle_ as Toggle, toggleVariants }
