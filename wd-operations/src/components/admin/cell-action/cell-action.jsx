"use client";

import {  MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useUser } from "@clerk/nextjs";

import { useTeamStore } from "../../../store/api/team-store";
import { useSupportStore } from "../../../store/api/support-store";
import { useOperatorStore } from "../../../store/api/operator-store";
import { useVehicleStore } from "../../../store/api/vehicle-store";
import { useDriverStore } from "../../../store/api/driver-store";
import { useNotificationStore } from "../../../store/api/notification-store";
import { useEventStore } from "../../../store/api/event-store";
import { useTeamsMapMeta } from "../../../store/api/map-meta-store";

import { AlertModal } from "../../modals/alert-modal";
import { EditAdminModal } from "../../modals/admin/edit-admin-modal";
import { EditOperatorModal } from "../../modals/operator/edit-operator-modal";
import { EditVehicleModal } from "../../modals/vehicle/edit-vehicle-modal";
import { EditSupportModal } from "../../modals/support/edit-support-modal";
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

export const AdminCellAction = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { deleteTeam, teamMapMeta } = useTeamStore();
  const { deleteNewTeamMeta } = useTeamsMapMeta();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const { user } = useUser();
  const { fetchDrivers, driversName, driversInfo } = useDriverStore();
  const { fetchOperators, operationCoordinators} =
    useOperatorStore();
  const { fetchSupports, supportCoordinators } = useSupportStore();

  useEffect(() => {
    const fetchDrvsOpsSup = async () => {
      await fetchDrivers();
      await fetchOperators();
      await fetchSupports();
    };

    fetchDrvsOpsSup();
  }, []);

  const router = useRouter();

  const onDelete = async () => {
    const notificationData = {
      instigator: user?.fullName ? user.fullName : "Admin",
      title: "Team",
      action: "Deleted",
      description: `Team: ${data.team} has been deleted`,
      team: data.team,
    };

    try {
      setLoading(true);
      deleteTeam(data.id);
      addNotification(notificationData);
      addEvent(notificationData);
      deleteNewTeamMeta(teamMapMeta);
      router.refresh();
    } catch (error) {
      console.error("Error deleting Team", error);
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
            <EditAdminModal
              initialData={data}
              drivers={driversName}
              driversInfo={driversInfo}
              statuses={statuses}
              supportCoord={supportCoordinators}
              operationCoord={operationCoordinators}
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

export const OperationsCoordCellAction = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { deleteOperator } = useOperatorStore();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const { user } = useUser();

  const router = useRouter();

  const onDelete = async () => {
    const notificationData = {
      instigator: user?.fullName ? user.fullName : "Admin",
      title: "Operator",
      action: "Deleted",
      description: `Operator: ${data.fullName} has been deleted`,
      team: "T.B.A.",
    };

    try {
      setLoading(true);
      deleteOperator(data.id);
      addNotification(notificationData);
      addEvent(notificationData);
      router.refresh();
    } catch (error) {
      console.error("Error deleting operation coordinator", error);
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
            <EditOperatorModal
              initialData={data}
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

export const SupportCoordCellAction = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { deleteSupport } = useSupportStore();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const { user } = useUser();

  const router = useRouter();

  const onDelete = async () => {
    const notificationData = {
      instigator: user?.fullName ? user.fullName : "Admin",
      title: "Support",
      action: "Deleted",
      description: `Support: ${data.fullName} has been deleted`,
      team: "T.B.A.",
    };

    try {
      setLoading(true);
      deleteSupport(data.id);
      addNotification(notificationData);
      addEvent(notificationData);
      router.refresh();
    } catch (error) {
      console.error("Error deleting support coordinator", error);
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
            <EditSupportModal
              initialData={data}
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

export const VehicleCellAction = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { deleteVehicle } = useVehicleStore();
  const { addNotification } = useNotificationStore();
  const { addEvent } = useEventStore();
  const { user } = useUser();

  const router = useRouter();

  const onDelete = async () => {
    const notificationData = {
      instigator: user?.fullName ? user.fullName : "Admin",
      title: "Vehicle",
      action: "Deleted",
      description: `Vehicle: ${data.vehicle} has been deleted`,
      team: "T.B.A.",
    };

    try {
      setLoading(true);
      deleteVehicle(data._id);
      addNotification(notificationData);
      addEvent(notificationData);
      router.refresh();
    } catch (error) {
      console.error("Error deleting vehicle", error);
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
            <EditVehicleModal
              initialData={data}
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
