"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from "../../lib/utils/utils"

const ScrollArea = ScrollAreaPrimitive.Root

const ScrollAreaViewPort = ScrollAreaPrimitive.Viewport

const ScrollAreaScrollbar = ScrollAreaPrimitive.Scrollbar

const ScrollAreaThumb = ScrollAreaPrimitive.Thumb

const ScrollAreaCorner = ScrollAreaPrimitive.Corner

export {
    ScrollArea,
    ScrollAreaViewPort,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaCorner
}