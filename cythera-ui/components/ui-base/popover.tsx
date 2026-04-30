"use client"

import * as React from "react"
import { Popover } from "@base-ui-components/react/popover"

import { cn } from "@/lib/utils"

function PopoverRoot({ ...props }: React.ComponentProps<typeof Popover.Root>) {
  return <Popover.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: React.ComponentProps<typeof Popover.Trigger>) {
  return <Popover.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverAnchor({ ...props }: React.ComponentProps<typeof Popover.Anchor>) {
  return <Popover.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof Popover.Popup> & {
  align?: "start" | "center" | "end"
  sideOffset?: number
}) {
  return (
    <Popover.Portal>
      <Popover.Positioner align={align} sideOffset={sideOffset}>
        <Popover.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 w-72 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none",
            "data-[open]:animate-in data-[closed]:animate-out",
            "data-[closed]:fade-out-0 data-[open]:fade-in-0",
            "data-[closed]:zoom-out-95 data-[open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          {...props}
        />
      </Popover.Positioner>
    </Popover.Portal>
  )
}

export { PopoverRoot as Popover, PopoverAnchor, PopoverContent, PopoverTrigger }
