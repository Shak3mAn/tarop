"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Users } from "lucide-react";

import { TeamCellAction } from "./team-cell-action";
import { DriverCellAction } from "./driver-cell-action";

//NOTE: Status is an enumeration of different status "codes"
//NOTE: Status; PENDING, COMPLETED, ONGOING, DELAYED, FAILED

export const teamColumns = [
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
    accessorKey: "Actions",
    cell: ({ row }) => <TeamCellAction data={row.original} />,
  },
];

export const driverColumns = [
  {
    accessorKey: "driver",
    header: "Driver",
  },
  {
    accessorKey: "team",
    header: "Team",
  },
  {
    accessorKey: "vehicle",
    header: "Car Reg.",
  },
  {
    accessorKey: "vehicleMake",
    header: "Car Make",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    accessorKey: "Actions",
    cell: ({ row }) => <DriverCellAction data={row.original} />,
  },
];
