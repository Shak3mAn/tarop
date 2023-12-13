"use client";

import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Edit, FileSpreadsheet, Pencil } from "lucide-react";

import { useEditTask } from "../../../store/use-edit-task";
import { useToggleTaskTab } from "../../../store/use-toggle-task-tab";

import { EditTaskOption } from "../../misc/task-modal-edit";
import { PreviewTaskOption } from "../../misc/task-modal-preview";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/dialog";
import { WarningModal } from "../alert/warning-modal";

import { cn } from "../../../lib/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input border-hidden bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const EditTaskModal = ({ className, data }) => {
  const isEdit = useEditTask();
  const isToggleTab = useToggleTaskTab();

  return (
    <>
      <DialogPrimitive.Root>
        <DialogPrimitive.Trigger asChild>
          <button
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "icon",
                className: className,
              })
            )}
            onClick={isToggleTab.onDetails}
          >
            <Edit className="h-4 w-4" />
          </button>
        </DialogPrimitive.Trigger>

        <DialogContent>
          <DialogHeader className="pt-4 flex flex-row items-center justify-between">
            <div className="flex space-x-2">
              <div className="h-7 w-7 rounded-full border items-center flex justify-center">
                <FileSpreadsheet className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <DialogTitle>Task</DialogTitle>
                <DialogDescription>Manage existing task</DialogDescription>
              </div>
            </div>

            <WarningModal
              title={"Warning!"}
              description={
                "If you plan on modifying the `Task`, kindly ensure that you have updated the source's & destination's location, and `startTime`, `startDate` & `endTime` fields accordingly before submission. Your attention to this matter is appreciated."
              }
            />
          </DialogHeader>
          <EditTaskOption initialData={data} />
        </DialogContent>
      </DialogPrimitive.Root>
    </>
  );
};
