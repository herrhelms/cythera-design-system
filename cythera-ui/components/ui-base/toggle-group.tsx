"use client"

import * as React from "react"
import { ToggleGroup } from "@base-ui-components/react/toggle-group"
import { Toggle } from "@base-ui-components/react/toggle"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui-base/toggle"

const ToggleGroupContext = React.createContext<{
  size?: "default" | "sm" | "lg"
  variant?: "default" | "outline"
}>({ size: "default", variant: "default" })

function ToggleGroup_({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroup> & {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}) {
  return (
    <ToggleGroup
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
    </ToggleGroup>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Toggle> & {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <Toggle
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
    </Toggle>
  )
}

export { ToggleGroup_ as ToggleGroup, ToggleGroupItem }
