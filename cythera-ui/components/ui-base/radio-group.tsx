"use client"

import * as React from "react"
import { CircleIcon } from "lucide-react"
import { RadioGroup } from "@base-ui-components/react/radio-group"
import { Radio } from "@base-ui-components/react/radio"

import { cn } from "@/lib/utils"

function RadioGroupRoot({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroup>) {
  return (
    <RadioGroup
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof Radio.Root>) {
  return (
    <Radio.Root
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-4 shrink-0 rounded-full border border-input shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[checked]:bg-primary dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      <Radio.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <CircleIcon className="size-2 fill-current" />
      </Radio.Indicator>
    </Radio.Root>
  )
}

export { RadioGroupRoot as RadioGroup, RadioGroupItem }
