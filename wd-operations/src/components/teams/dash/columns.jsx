"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Users } from "lucide-react";

import { CellAction } from "./cell-action";

//NOTE: Status is an enumeration of different status "codes"

export const columns = [
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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
