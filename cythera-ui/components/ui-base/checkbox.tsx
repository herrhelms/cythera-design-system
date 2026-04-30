"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Checkbox } from "@base-ui-components/react/checkbox"

import { cn } from "@/lib/utils"

function CheckboxRoot({
  className,
  ...props
}: React.ComponentProps<typeof Checkbox.Root>) {
  return (
    <Checkbox.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary data-[checked]:border-primary data-[checked]:text-primary-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[checked]:bg-primary dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      <Checkbox.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-3.5" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}

export { CheckboxRoot as Checkbox }
