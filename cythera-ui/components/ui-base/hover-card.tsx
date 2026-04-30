"use client"

import * as React from "react"
import { PreviewCard } from "@base-ui-components/react/preview-card"

import { cn } from "@/lib/utils"

// Base UI's PreviewCard is the semantic equivalent of Radix HoverCard —
// it opens on hover and is designed for content previews.

function HoverCard({ ...props }: React.ComponentProps<typeof PreviewCard.Root>) {
  return <PreviewCard.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof PreviewCard.Trigger>) {
  return <PreviewCard.Trigger data-slot="hover-card-trigger" {...props} />
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PreviewCard.Popup> & {
  align?: "start" | "center" | "end"
  sideOffset?: number
}) {
  return (
    <PreviewCard.Portal>
      <PreviewCard.Positioner align={align} sideOffset={sideOffset}>
        <PreviewCard.Popup
          data-slot="hover-card-content"
          className={cn(
            "z-50 w-80 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none",
            "data-[open]:animate-in data-[closed]:animate-out",
            "data-[closed]:fade-out-0 data-[open]:fade-in-0",
            "data-[closed]:zoom-out-95 data-[open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          {...props}
        />
      </PreviewCard.Positioner>
    </PreviewCard.Portal>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
