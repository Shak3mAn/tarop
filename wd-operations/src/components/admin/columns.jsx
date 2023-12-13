"use client";

import { CarFront, Users } from "lucide-react";

import { AdminCellAction, OperationsCoordCellAction, SupportCoordCellAction, VehicleCellAction } from "./cell-action/cell-action";

export const adminColumns = [
  {
    accessorKey: "team",
    header: "Team",
  },
  {
    accessorKey: "teamColor",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <Users
          className={`ml-2 h-4 w-4`}
          style={{ color: row.original.teamColor }}
        />
      </div>
    ),
  },
  {
    accessorKey: "operationCoordinator",
    header: "Coordinator",
  },
  {
    accessorKey: "supportCoordinator",
    header: "Support",
  },
  {
    accessorKey: "driver",
    header: "Driver",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => <AdminCellAction data={row.original} />,
  },
];

export const vehicleColumns = [
  {
    accessorKey: "vehicle",
    header: "Car Reg.",
  },
  {
    accessorKey: "vehicleManufacturer",
    header: "Manufacturer",
  },
  {
    accessorKey: "vehicleMake",
    header: "Make",
  },
  {
    accessorKey: "vehicleColor",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <CarFront
          className={`ml-2 h-4 w-4`}
          style={{ color: row.original.vehicleColor }}
        />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <VehicleCellAction data={row.original} />,
  },
];

export const operationCoordinatorColumn = [
  {
    accessorKey: "fullName",
    header: "Operator",
  },
  {
    accessorKey: "firstName",
    header: "First",
  },
  {
    accessorKey: "lastName",
    header: "Last",
  },
  {
    accessorKey: "telephone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => <OperationsCoordCellAction data={row.original} />,
  },
];

export const supportCoordinatorColumn = [
  {
    accessorKey: "fullName",
    header: "Support",
  },
  {
    accessorKey: "firstName",
    header: "First",
  },
  {
    accessorKey: "lastName",
    header: "Last",
  },
  {
    accessorKey: "telephone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => <SupportCoordCellAction data={row.original} />,
  },
];

export const coordinatorActionsColumns = [
  {
    accessorKey: "operationCoordinator",
    header: "Coordinator",
  },
  {
    accessorKey: "team",
    header: "Team",
  },
  {
    accessorKey: "action",
    header: "Actions",
  },
  {
    accessorKey: "createdAtTime",
    header: "Time",
  },
  {
    accessorKey: "createdAtDate",
    header: "Date",
  },
];

export const driverActionsColumns = [
  {
    accessorKey: "driver",
    header: "Driver",
  },
  {
    accessorKey: "team",
    header: "Team",
  },
  {
    accessorKey: "task",
    header: "Task",
  },
  {
    accessorKey: "status",
    header: "Status",
  }
];
