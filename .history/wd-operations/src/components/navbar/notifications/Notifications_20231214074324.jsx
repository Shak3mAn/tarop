"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { cva } from "class-variance-authority";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import { cn } from "../../../lib/utils/utils";
import { MenuSeparator } from "../../ui/misc/MenuSeparator";

import { useNotificationStore } from "../../../store/api/notification-store";

import { AlertModal } from "../../modals/alert-modal";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuNotificationItem,
  DropdownMenuLabel,
} from "../../ui/dropdown-menu";
import { Checkbox } from "../../ui/checkbox";

//TODO: Build the Notifications Dialog and introduce various segments or partitions for different notification components

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

const Notifications = () => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [read, setRead] = React.useState(false);
  const [approved, setApproved] = React.useState(false);

  const { deleteNotifications, fetchNotifications, notifications } =
    useNotificationStore();

  React.useEffect(() => {
    const fetchNots = async () => {
      await fetchNotifications();
    };
    fetchNots();
  }, []);

  React.useEffect(() => {
    if (read) {
      setRead(false);
    }
  }, [read]);

  const onToggleApproval = () => {
    setApproved(!approved);
  };

  const onDelete = async () => {
    try {
      setLoading();
      deleteNotifications();
      outer.refresh();
    } catch (error) {
      console.error("Error deleting Notifications", error);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Dropdown.Root>
        <Dropdown.Trigger>
          <div className="">
            {notifications.length > 0 && (
              <>
                <div className="absolute animate-ping ml-8 -mt-1 z-20 h-3 w-3 rounded-full bg-red-800 opacity-90" />
                <div className="absolute ml-8 -mt-1 z-20 h-3 w-3 rounded-full bg-red-800 opacity-90" />
              </>
            )}
            <button
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "icon",
                })
              )}
            >
              <Bell className="h-[1.2rem] w-[1.2rem]" />
            </button>
          </div>
        </Dropdown.Trigger>

        <DropdownMenuContent
          className="mr-2 pb-2 w-screen md:w-[420px] md:ml-0 h-auto max-h-[500px]"
          align="flex"
        >
          <div className="flex justify-between items-center">
            <DropdownMenuLabel className="pl-4 text-md font-bold">
              Notifications
            </DropdownMenuLabel>

            <DropdownMenuLabel className="pr-4 text-sm tracking-wider font-semibold">
              ({notifications.length})
            </DropdownMenuLabel>
          </div>
          <DropdownMenuNotificationItem>
            <ScrollArea.Root className="w-full md:w-[400px] h-auto max-h-[300px] md:max-h-[280px] overflow-hidden overflow-y-auto scrollbar-hide rounded-lg border px-1 py-1">
              <ScrollArea.Viewport className="w-full h-full rounded-md">
                <div>
                  {notifications ? (
                    <>
                      {notifications.map((data) => (
                        <div className="px-2 py-2" key={data._id}>
                          <div className="flex flex-row items-center justify-between space-y-0 pb-1">
                            <div className="text-md font-bold tracking-tight">
                              {data.title}
                            </div>
                            <div className="text-md text-muted-foreground  font-normal">
                              <span className="font-semibold text-primary tracking-tight">
                                Team:
                              </span>{" "}
                              {data?.team}
                            </div>
                          </div>
                          <MenuSeparator />
                          <div className="pt-1 pb-4">
                            <div className="text-primary/90 tracking-tight font-semibold pb-2">
                              {data.action}
                            </div>
                            <p className="text-sm tracking-tight">
                              {data.description}
                            </p>
                          </div>
                          {/* Menu Separator */}
                          <MenuSeparator />
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="flex items-center text-primary/90 justify-center text-md">
                      No Notifications
                    </div>
                  )}
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Corner />
            </ScrollArea.Root>
          </DropdownMenuNotificationItem>
          <DropdownMenuItem
            className="pl-4 mx-2 mt-1 py-2 font-semibold border-[0.5px] cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Mark As Read
          </DropdownMenuItem>
        </DropdownMenuContent>
      </Dropdown.Root>
    </>
  );
};

export default Notifications;
