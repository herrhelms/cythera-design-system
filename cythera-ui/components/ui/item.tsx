import * as React from "react"

import { cn } from "@/lib/utils"

function Item({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item"
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
        className
      )}
      {...props}
    />
  )
}

function ItemIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-icon"
      className={cn(
        "flex shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="item-title"
      className={cn("truncate font-medium leading-none", className)}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="item-description"
      className={cn("truncate text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function ItemAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-action"
      className={cn("ml-auto flex shrink-0 items-center gap-1", className)}
      {...props}
    />
  )
}

export { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemAction }
