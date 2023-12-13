"use client"

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../lib/utils/utils";

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.TooltipTrigger

const TooltipPortal = TooltipPrimitive.Portal

const TooltipContent = ({ className, sideOffset=5 , ...props }) => {
    return (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
            className={cn(
                "z-[100] min-w-[2rem] overflow-hidden rounded-md border bg-popover text-sm p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    className
            )}
            sideOffset={sideOffset}
            {...props}
            />
        </TooltipPrimitive.Portal>
    )
}
TooltipContent.displayName = "TooltipContent"

export {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipPortal
}