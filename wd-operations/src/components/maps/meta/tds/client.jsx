"use client";

import { DataTable } from "../../../ui/data-table";
import { Separator } from "../../../ui/separator";

import { driverColumns } from "./columns";

export const TeamDriverClient = ({ data }) => {

    return (
        <>
            <Separator />
            <DataTable searchKey="driver" columns={driverColumns} data={data} />
        </>
    )
}