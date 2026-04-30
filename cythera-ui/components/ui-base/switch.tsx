"use client"

import * as React from "react"
import { Switch } from "@base-ui-components/react/switch"

import { cn } from "@/lib/utils"

function Switch_({
  className,
  ...props
}: React.ComponentProps<typeof Switch.Root>) {
  return (
    <Switch.Root
      data-slot="switch"
      className={cn(
        // Base UI emits data-checked (not data-[state=checked] like Radix)
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary bg-input",
        className
      )}
      {...props}
    >
      <Switch.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-4 translate-x-0"
      />
    </Switch.Root>
  )
}

export { Switch_ as Switch }
