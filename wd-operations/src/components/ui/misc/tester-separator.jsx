"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "../../../lib/utils/utils"

const TesterSeparator = ({ className, orientation="horizontal", ...props }) => {
  return (
    <SeparatorPrimitive.Root
      decorative
      orientation={orientation}
      style={{ margin: '1px 0' }}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
}

TesterSeparator.displayName = SeparatorPrimitive.Root.displayName

const ScheduleSeparator = ({ className, orientation="horizontal", ...props }) => {
  return (
    <SeparatorPrimitive.Root
      decorative
      orientation={orientation}
      style={{ margin: '0px 0' }}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
}

ScheduleSeparator.displayName = SeparatorPrimitive.Root.displayName


export { TesterSeparator, ScheduleSeparator };

