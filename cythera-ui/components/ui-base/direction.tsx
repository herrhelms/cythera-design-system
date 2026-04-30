"use client"

import * as React from "react"
import { DirectionProvider, type TextDirection } from "@base-ui-components/react/direction-provider"

// Base UI exports DirectionProvider (the Provider component) from direction-provider.
// The API matches Radix's DirectionProvider (dir prop).

function DirectionProvider_({
  ...props
}: React.ComponentProps<typeof DirectionProvider>) {
  return <DirectionProvider data-slot="direction-provider" {...props} />
}

export { DirectionProvider_ as DirectionProvider }
export type { TextDirection }
