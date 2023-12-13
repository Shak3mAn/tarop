"use client";

import { DataTable } from "../../ui/data-table";
import { Separator } from "../../ui/separator";
import { columns } from "./columns";
//TODO: Alter `Button` to push to new Team Entry

export const TeamsDashClient = ({ data }) => {
    

    return (
        <>
            <Separator />
            <DataTable searchKey="team" columns={columns} data={data}  />
        </>
    )
}