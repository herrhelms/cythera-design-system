"use client"

import * as React from "react"

// No Base UI primitive needed — same CSS-only implementation as both Radix and non-Radix.

interface AspectRatioProps extends React.ComponentProps<"div"> {
  ratio?: number
}

function AspectRatio({ ratio = 1, style, className, ...props }: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{ position: "relative", width: "100%", paddingBottom: `${(1 / ratio) * 100}%`, ...style }}
    >
      <div
        className={className}
        style={{ position: "absolute", inset: 0 }}
        {...props}
      />
    </div>
  )
}

export { AspectRatio }
