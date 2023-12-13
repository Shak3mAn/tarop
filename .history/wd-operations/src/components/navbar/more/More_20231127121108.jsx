"use client"

import * as React from "react"
import { FileDown } from "lucide-react"
import { cva } from "class-variance-authority"
import * as Dropdown from "@radix-ui/react-dropdown-menu";

import {
    DropdownMenuContent,
    DropdownMenuItem
} from "../../ui/dropdown-menu";
import { MenuSeparator } from "../../ui/misc/MenuSeparator";
import { cn } from "../../../lib/utils/utils";

//TODO: Add Redirection Links

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

const MoreMenu = () => {
    return (
        <Dropdown.Root>
            <Dropdown.Trigger asChild>
                <button
                    className={
                        cn(buttonVariants({ variant: "outline", size: "icon" }))
                    }
                >
                    <FileDown className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <FileDown className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </button>
            </Dropdown.Trigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => console.log("Redirect to Downloads")}
                >
                    Downloads
                </DropdownMenuItem>

                {/* <MenuSeparator /> */}
                {/* <DropdownMenuItem
                    onClick={() => console.log("Redirect to Settings")}
                >
                    Settings
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem
                    onClick={() => console.log("Redirect to Admin")}
                >
                    Admin
                </DropdownMenuItem> */}

                {/* <MenuSeparator /> */}
                {/* <DropdownMenuItem
                    onClick={() => console.log("Redirect to Help")}
                >
                    Help
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem
                    onClick={() => console.log("Redirect to Contact")}
                >
                    Support
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </Dropdown.Root>
    )
}

export default MoreMenu;