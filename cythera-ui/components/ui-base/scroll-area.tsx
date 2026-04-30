"use client"

import * as React from "react"
import { ScrollArea } from "@base-ui-components/react/scroll-area"

import { cn } from "@/lib/utils"

function ScrollAreaRoot({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollArea.Root>) {
  return (
    <ScrollArea.Root
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollArea.Viewport
        data-slot="scroll-area-viewport"
        className="h-full w-full rounded-[inherit]"
      >
        {children}
      </ScrollArea.Viewport>
      <ScrollBar />
      <ScrollBar orientation="horizontal" />
      <ScrollArea.Corner data-slot="scroll-area-corner" />
    </ScrollArea.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollArea.Scrollbar>) {
  return (
    <ScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent p-px",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-px",
        className
      )}
      {...props}
    >
      <ScrollArea.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollArea.Scrollbar>
  )
}

export { ScrollAreaRoot as ScrollArea, ScrollBar }
