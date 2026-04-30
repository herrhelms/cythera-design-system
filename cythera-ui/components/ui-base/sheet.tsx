"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { Dialog } from "@base-ui-components/react/dialog"

import { cn } from "@/lib/utils"

// Base UI Dialog maps cleanly to the Radix Dialog used for Sheet.
// Popup replaces Content; Backdrop replaces Overlay; no Portal/Close naming differences.

function Sheet({ ...props }: React.ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof Dialog.Trigger>) {
  return <Dialog.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: React.ComponentProps<typeof Dialog.Close>) {
  return <Dialog.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: React.ComponentProps<typeof Dialog.Portal>) {
  return <Dialog.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Backdrop>) {
  return (
    <Dialog.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        "transition-opacity duration-300",
        className
      )}
      {...props}
    />
  )
}

const sheetContentVariants = cva(
  [
    "fixed z-50 flex flex-col bg-background border shadow-lg",
    "transition ease-in-out",
    "data-[starting-style]:duration-300 data-[ending-style]:duration-300",
    "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
  ],
  {
    variants: {
      side: {
        top: [
          "inset-x-0 top-0 border-b rounded-b-lg",
          "data-[starting-style]:-translate-y-full data-[ending-style]:-translate-y-full",
        ],
        bottom: [
          "inset-x-0 bottom-0 border-t rounded-t-lg",
          "data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full",
        ],
        left: [
          "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          "data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full",
        ],
        right: [
          "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          "data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
        ],
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof Dialog.Popup> &
  VariantProps<typeof sheetContentVariants>) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Popup
        data-slot="sheet-content"
        className={cn(sheetContentVariants({ side }), className)}
        {...props}
      >
        {children}
        <Dialog.Close
          data-slot="sheet-close-button"
          className={cn(
            "absolute right-4 top-4 rounded-md opacity-70 ring-offset-background transition-opacity",
            "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:pointer-events-none"
          )}
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
      </Dialog.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-6", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      data-slot="sheet-title"
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
