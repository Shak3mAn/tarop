"use client";

import { DataTable } from "../../ui/data-table";
import { Separator } from "../../ui/separator";

import { columns } from "./columns";

//TODO: Alter `Button` to push to new schedule

export const SchedDashClient = ({ data }) => {

    return (
        <>
            <Separator />
            <DataTable searchKey="task" columns={columns} data={data} />
        </>
    )
}