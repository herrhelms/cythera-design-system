"use client"

import * as React from "react"
import { Tooltip } from "@base-ui-components/react/tooltip"

import { cn } from "@/lib/utils"

// Base UI Tooltip uses a Positioner + Popup pattern instead of Radix's
// Portal + Content. We adapt here to expose the same component API surface.

function TooltipProvider({
  delay = 0,
  children,
  ...props
}: {
  delay?: number
  children?: React.ReactNode
} & Omit<React.ComponentProps<typeof Tooltip.Provider>, "delay">) {
  return (
    <Tooltip.Provider data-slot="tooltip-provider" delay={delay} {...props}>
      {children}
    </Tooltip.Provider>
  )
}

function TooltipRoot({
  children,
  ...props
}: React.ComponentProps<typeof Tooltip.Root>) {
  return (
    <TooltipProvider>
      <Tooltip.Root data-slot="tooltip" {...props}>
        {children}
      </Tooltip.Root>
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof Tooltip.Trigger>) {
  return <Tooltip.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof Tooltip.Positioner> & {
  children?: React.ReactNode
  sideOffset?: number
}) {
  return (
    <Tooltip.Portal>
      <Tooltip.Positioner
        data-slot="tooltip-positioner"
        sideOffset={sideOffset}
        {...props}
      >
        <Tooltip.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md",
            "animate-in fade-in-0 zoom-in-95",
            "data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95",
            className
          )}
        >
          {children}
          <Tooltip.Arrow className="fill-primary" />
        </Tooltip.Popup>
      </Tooltip.Positioner>
    </Tooltip.Portal>
  )
}

export {
  TooltipRoot as Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
}
