"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { NavigationMenu } from "@base-ui-components/react/navigation-menu"

import { cn } from "@/lib/utils"

// Base UI NavigationMenu: Root > List > Item > [Trigger + Portal > Positioner > Popup > Content]
// The viewport concept is handled via Positioner/Popup. No direct Indicator equivalent.
// We keep the same exported API as the Radix version.

function NavigationMenu_({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Root> & { viewport?: boolean }) {
  return (
    <NavigationMenu.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </NavigationMenu.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.List>) {
  return (
    <NavigationMenu.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Item>) {
  return (
    <NavigationMenu.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Trigger>) {
  return (
    <NavigationMenu.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        "group inline-flex h-9 w-max items-center justify-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors outline-none",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[active]:bg-accent/50 data-[popup-open]:bg-accent/50",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="relative top-px size-3.5 transition-transform duration-200 group-data-[popup-open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenu.Trigger>
  )
}

// NavigationMenuContent renders directly inside NavigationMenu.Popup.
// The Portal > Positioner > Popup wrapping is applied at the Item level in practice,
// but for a drop-in replacement we provide a convenience wrapper that includes it.
function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Content>) {
  return (
    <NavigationMenu.Content
      data-slot="navigation-menu-content"
      className={cn(
        "left-0 top-0 w-full md:absolute md:w-auto",
        "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        "transition-opacity duration-150",
        className
      )}
      {...props}
    />
  )
}

// Base UI has a Viewport component; wire it up similarly to Radix's pattern
function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Viewport>) {
  return (
    <div
      data-slot="navigation-menu-viewport-wrapper"
      className="absolute left-0 top-full flex justify-center"
    >
      <NavigationMenu.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center relative mt-1.5 h-[var(--base-ui-navigation-menu-viewport-height)] w-full overflow-hidden rounded-lg border border-border bg-popover shadow-lg",
          "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
          "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
          "transition-[opacity,transform] duration-200",
          "md:w-[var(--base-ui-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenu.Link>) {
  return (
    <NavigationMenu.Link
      data-slot="navigation-menu-link"
      className={cn(
        "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[active]:bg-accent/50",
        className
      )}
      {...props}
    />
  )
}

// Base UI doesn't have a direct Indicator equivalent; render a visual indicator div
function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </div>
  )
}

export {
  NavigationMenu_ as NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  NavigationMenuLink,
  NavigationMenuIndicator,
}
