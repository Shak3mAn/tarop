"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "../../../lib/utils/utils"

const SideSeparator = ({ className, orientation="horizontal", ...props }) => {
  return (
    <SeparatorPrimitive.Root
      decorative
      orientation={orientation}
      style={{ margin: '15px 0' }}
      className={cn(
        "shrink-0 bg-white/10",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
}

SideSeparator.displayName = SeparatorPrimitive.Root.displayName

export { SideSeparator };