"use client"

import * as React from "react"
import { Phone, PhoneCall, Video } from "lucide-react"
import { cva } from "class-variance-authority"
import * as Dropdown from "@radix-ui/react-dropdown-menu"

import { cn } from "../../../lib/utils/utils"
import { MenuSeparator } from "../../ui/misc/MenuSeparator";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuNotificationItem,
    DropdownMenuLabel
} from "../../ui/dropdown-menu";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const CallsToggle = () => {

    return (
        <Dropdown.Root>
            <Dropdown.Trigger asChild>
                <button
                    className={
                        cn(buttonVariants({ variant: 'outline', size: "icon" }))
                    }
                >
                    <Phone className="h-[1.2rem] w-[1.2rem]" />
                </button>
            </Dropdown.Trigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => console.log("Redirect to Calls")}
                >
                    <div className="flex items-center flex-row">
                        <PhoneCall className="h-4 w-4 mr-3" />
                        Voice
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => console.log("Redirect to Calls")}
                >
                    <div className="flex items-center flex-row">
                        <Video className="h-4 w-4 mr-3" />
                        Video
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </Dropdown.Root>
    )
}

export default CallsToggle