"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action";

//NOTE: Status is an enumeration of different status "codes"
//NOTE: Status; PENDING, COMPLETED, ONGOING, DELAYED, FAILED

export const columns = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "shortDescription",
        header: "Description",
    },
    {
        accessorKey: "team",
        header: "Team",
    },
    {
        accessorKey: "startTime",
        header: "Start Time",
    },
    {
        accessorKey: "endTime",
        header: "End Time",
    },
    {
        accessorKey: "eta",
        header: "E.T.A",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
]