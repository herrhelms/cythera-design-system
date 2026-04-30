"use client"

import * as React from "react"
import { Progress } from "@base-ui-components/react/progress"

import { cn } from "@/lib/utils"

function ProgressBar({
  className,
  value,
  ...props
}: React.ComponentProps<typeof Progress.Root>) {
  return (
    <Progress.Root
      data-slot="progress"
      value={value ?? 0}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <Progress.Track className="h-full w-full">
        <Progress.Indicator
          data-slot="progress-indicator"
          className="h-full w-full flex-1 bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{
            transform: `translateX(-${100 - (value ?? 0)}%)`,
          }}
        />
      </Progress.Track>
    </Progress.Root>
  )
}

export { ProgressBar as Progress }
