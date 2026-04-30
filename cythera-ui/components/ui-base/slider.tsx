"use client"

import * as React from "react"
import { Slider } from "@base-ui-components/react/slider"

import { cn } from "@/lib/utils"

function SliderRoot({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof Slider.Root>) {
  const _values = React.useMemo(
    () =>
      value !== undefined
        ? Array.isArray(value)
          ? value
          : [value]
        : defaultValue !== undefined
          ? Array.isArray(defaultValue)
            ? defaultValue
            : [defaultValue]
          : [min],
    [value, defaultValue, min]
  )

  return (
    <Slider.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <Slider.Control>
        <Slider.Track
          data-slot="slider-track"
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted"
        >
          <Slider.Indicator
            data-slot="slider-range"
            className="absolute h-full bg-primary"
          />
        </Slider.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <Slider.Thumb
            data-slot="slider-thumb"
            key={index}
            className="block size-4 rounded-full border border-primary/50 bg-background shadow-sm transition-[color,box-shadow] outline-none hover:border-primary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none"
          />
        ))}
      </Slider.Control>
    </Slider.Root>
  )
}

export { SliderRoot as Slider }
