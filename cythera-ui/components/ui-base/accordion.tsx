"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Accordion } from "@base-ui-components/react/accordion"

import { cn } from "@/lib/utils"

function AccordionRoot({
  className,
  ...props
}: React.ComponentProps<typeof Accordion.Root>) {
  return (
    <Accordion.Root
      data-slot="accordion"
      className={cn("", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof Accordion.Item>) {
  return (
    <Accordion.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Accordion.Trigger>) {
  return (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all",
          "hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "[&[data-panel-open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </Accordion.Trigger>
    </Accordion.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Accordion.Panel>) {
  return (
    <Accordion.Panel
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm",
        "data-[open]:animate-accordion-down data-[ending-style]:animate-accordion-up",
        className
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </Accordion.Panel>
  )
}

export { AccordionRoot as Accordion, AccordionContent, AccordionItem, AccordionTrigger }
