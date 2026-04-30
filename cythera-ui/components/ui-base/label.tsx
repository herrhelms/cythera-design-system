"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Base UI does not provide a Label primitive — a semantic <label> element
// with the same Cythera classes is the correct equivalent.

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm font-medium leading-none font-sans select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
