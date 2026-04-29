import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border border-border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:translate-y-0.5 [&>svg]:text-current border-l-4",
  {
    variants: {
      variant: {
        default:
          "bg-card text-foreground border-l-border [&>svg]:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive border-border border-l-destructive [&>svg]:text-destructive dark:bg-destructive/15",
        success:
          "bg-success/10 text-success border-border border-l-success [&>svg]:text-success dark:bg-success/15",
        warning:
          "bg-warning/10 text-warning border-border border-l-warning [&>svg]:text-warning dark:bg-warning/15",
        info:
          "bg-info/10 text-info border-border border-l-info [&>svg]:text-info dark:bg-info/15",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 text-sm [&_p]:leading-relaxed opacity-90",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
