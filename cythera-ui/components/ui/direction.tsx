"use client"

import * as React from "react"
import { DirectionProvider as DirectionProviderPrimitive } from "radix-ui"

function DirectionProvider({
  ...props
}: React.ComponentProps<typeof DirectionProviderPrimitive>) {
  return <DirectionProviderPrimitive data-slot="direction-provider" {...props} />
}

export { DirectionProvider }
