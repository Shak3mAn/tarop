"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { cva } from "class-variance-authority";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useUser } from "@clerk/nextjs";

import { useDriverStore } from "../../../store/api/driver-store";
import { useDriversMapMeta } from "../../../store/api/map-meta-store";
import { useNotificationStore } from "../../../store/api/notification-store";
import { useEventStore } from "../../../store/api/event-store";
import { useVehicleStore } from "../../../store/api/vehicle-store";
import { useTeamStore } from "../../../store/api/team-store";

import { EditDriverModal } from "../../modals/driver/edit-driver-modal";
import { AlertModal } from "../../modals/alert-modal";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../../ui/dropdown-menu";
import { statuses } from "../../../lib/utils/data";
import { cn } from "../../../lib/utils/utils";

//TODO: ADD toast notification on `onCopy`
//TODO: Check on how to handle the cell action issue.
//TODO: Check why the dropdown list doesn't open with `Button`

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

export const DriverCellAction = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { deleteDriver, driverMapMeta } = useDriverStore();
  const { deleteNewDriverMeta } = useDriversMapMeta();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const { user } = useUser();
  const { fetchVehicles, vehicleName, vehicleMake } = useVehicleStore();
  const { fetchTeams, teamsName } = useTeamStore();

  const router = useRouter();

  useEffect(() => {
    const fetchCarsTeams = async () => {
      await fetchVehicles();
      await fetchTeams();
    };

    fetchCarsTeams();
  }, []);

  const onDelete = async () => {
    const notificationData = {
      instigator: user?.fullName ? user.fullName : "User",
      title: "Driver",
      action: "Deleted",
      description: `Driver: ${data.driver} has been deleted`,
      team: data.team,
    };

    try {
      setLoading(true);
      deleteDriver(data.id); // Assuming the team ID is stored in _id
      addNotification(notificationData);
      addEvent(notificationData);
      deleteNewDriverMeta(driverMapMeta);
      router.refresh();
    } catch (error) {
      console.error("Error deleting Driver", error);
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
        <Dropdown.Trigger asChild>
          <button
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </Dropdown.Trigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <div className="ml-[2px] flex rounded-sm items-center focus:bg-accent hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <EditDriverModal
              initialData={data}
              statuses={statuses}
              vehicle={vehicleName}
              make={vehicleMake}
              team={teamsName}
              className={"bg-transparent cursor-default"}
            />
            <p className="text-sm">Update</p>
          </div>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </Dropdown.Root>
    </>
  );
};
