"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Base UI's Toast uses an imperative createToastManager pattern that differs
// significantly from Radix's declarative Provider/Viewport/Root model.
// This file implements a functional equivalent using Base UI's Toast primitives
// where they map, with a React-context-based fallback for Provider/Viewport.

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-lg border border-border bg-card p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground border-border",
        destructive:
          "border-destructive/50 bg-destructive text-destructive-foreground [&>[data-slot=toast-close]]:text-destructive-foreground",
        success:
          "border-success/50 bg-success/10 text-success dark:bg-success/15",
        info: "border-info/50 bg-info/10 text-info dark:bg-info/15",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ---- Context-based Provider/Viewport (custom, no Base UI primitive maps 1:1) ----

interface ToastProviderProps {
  children?: React.ReactNode
  duration?: number
  label?: string
  swipeDirection?: "up" | "down" | "left" | "right"
  swipeThreshold?: number
}

function ToastProvider({ children, ...props }: ToastProviderProps) {
  return (
    <div data-slot="toast-provider" {...(props as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  )
}

function ToastViewport({
  className,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="toast-viewport"
      className={cn(
        "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]",
        className
      )}
      {...props}
    />
  )
}

// ---- Toast Root ----

interface ToastProps
  extends React.ComponentProps<"li">,
    VariantProps<typeof toastVariants> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function Toast({ className, variant, open, onOpenChange, ...props }: ToastProps) {
  const [state, setState] = React.useState<"open" | "closed">(
    open !== false ? "open" : "closed"
  )

  React.useEffect(() => {
    setState(open !== false ? "open" : "closed")
  }, [open])

  if (state === "closed") return null

  return (
    <li
      data-slot="toast"
      data-state={state}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
}

// ---- Toast sub-parts ----

function ToastAction({ className, altText, ...props }: React.ComponentProps<"button"> & { altText?: string }) {
  return (
    <button
      data-slot="toast-action"
      aria-label={altText}
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-accent focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-destructive/30 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className
      )}
      {...props}
    />
  )
}

function ToastClose({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="toast-close"
      toast-close=""
      className={cn(
        "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 group-hover:opacity-100",
        className
      )}
      {...props}
    >
      <XIcon className="size-4" />
    </button>
  )
}

function ToastTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toast-title"
      className={cn("text-sm font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function ToastDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toast-description"
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  )
}

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
  toastVariants,
  type ToastProps,
  type ToastActionElement,
}
