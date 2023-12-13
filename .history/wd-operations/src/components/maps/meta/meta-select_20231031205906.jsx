"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import * as Select from '@radix-ui/react-select';

export const MetaSelect = () => {
    const handleOnChange = (value) => {
        console.log("handleChange")
    }

    return (
        <>
            <Select.Root>
                <Select.Trigger
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Select.Value 
                        placeholder="Select a team..."
                    />
                    <Select.Icon asChild>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </Select.Icon>
                </Select.Trigger>

               <Select.Portal>
                <Select.Content
                    className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80"
                >
                    <Select.Viewport
                        className="h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] "
                    >

                    </Select.Viewport>
                </Select.Content>
               </Select.Portal> 
            </Select.Root>
        </>
    )
}
