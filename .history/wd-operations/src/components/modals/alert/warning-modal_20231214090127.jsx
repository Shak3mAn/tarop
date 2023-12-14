import { cva } from "class-variance-authority";
import { AlertTriangle } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  AlertDialogContent,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils/utils";
import { useState } from "react";

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
);

export const WarningModal = ({ title, description }) => {
  const [loading, setLoading] = useState(false);

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <button
          className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
        >
          <AlertTriangle className="absolute h-5 w-5 transition-all text-red-800" />
        </button>
      </DialogPrimitive.Trigger>

      <AlertDialogContent>
        <DialogHeader className="pt-4 flex flex-row items-center justify-between">
          <div className="flex space-x-2">
            <div className="h-7 w-7 rounded-full border-hidden border-red-800 items-center flex justify-center">
              <AlertTriangle className="h-6 w-6 text-red-800 " />
            </div>
            <div className="flex flex-col mt-[6px] space-y-5">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                <span className="font-bold text-primary text-md mr-1">Attention: </span>
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <DialogPrimitive.Close asChild>
            <Button disabled={loading} variant="destructive">
              Back
            </Button>
          </DialogPrimitive.Close>
        </div>
      </AlertDialogContent>
    </DialogPrimitive.Root>
  );
};
