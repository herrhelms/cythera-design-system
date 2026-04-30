"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Base UI provides a Separator primitive, but it's a simple thin wrapper around
// a styled <div role="separator">. A direct HTML implementation is cleaner and
// identical visually — same pattern used by the Base UI docs themselves.

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}) {
  return (
    <div
      data-slot="separator"
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      data-orientation={orientation}
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
