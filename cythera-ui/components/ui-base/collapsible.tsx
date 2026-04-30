"use client"

import * as React from "react"
import { Collapsible } from "@base-ui-components/react/collapsible"

function CollapsibleRoot({
  ...props
}: React.ComponentProps<typeof Collapsible.Root>) {
  return <Collapsible.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof Collapsible.Trigger>) {
  return <Collapsible.Trigger data-slot="collapsible-trigger" {...props} />
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof Collapsible.Panel>) {
  return <Collapsible.Panel data-slot="collapsible-content" {...props} />
}

export { CollapsibleRoot as Collapsible, CollapsibleContent, CollapsibleTrigger }
