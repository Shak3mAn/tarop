"use client";

import { HelpCircle } from "lucide-react";

import { useAdminToggle } from "../../store/use-schedule-toggle";
import { useDriverStore } from "../../store/api/driver-store";
import { useOperatorStore } from "../../store/api/operator-store";
import { useSupportStore } from "../../store/api/support-store";

import { StatusModal } from "../modals/status/status";
import {
  adminColumns,
  coordinatorActionsColumns,
  driverActionsColumns,
  vehicleColumns,
  operationCoordinatorColumn,
  supportCoordinatorColumn,
} from "./columns";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import { DataTableDownload } from "../ui/misc/data-table-download";
import { SubHeading } from "../ui/sub-heading";
import { MainCreateAdminModal } from "../modals/admin/main-create-admin-modal";
import { CreateVehicleModal } from "../modals/vehicle/create-vehicle-modal";
import { CreateOperatorModal } from "../modals/operator/create-operator-modal";
import { CreateSupportModal } from "../modals/support/create-support-modal";
import { ViewToggle } from "./view-toggle";
import { ScheduleSeparator } from "../ui/misc/tester-separator";

import { statuses } from "../../lib/utils/data";
import { useEffect } from "react";

//TODO: Add different required Paths
export const AdminClient = ({
  adminData,
  coordData,
  driverData,
  supportCoordData,
  operationCoordData,
  vehicleData,
}) => {
  const { fetchDrivers, driversName, driversInfo } = useDriverStore();
  const { fetchOperators, operationCoordinators, operators } =
    useOperatorStore();
  const { fetchSupports, supportCoordinators, supports } = useSupportStore();
  const { isTeam, isVehicle, isCoordinator } = useAdminToggle();

  useEffect(() => {
    const fetchDrvsOpsSup = async () => {
      await fetchDrivers();
      await fetchOperators();
      await fetchSupports();
    };

    fetchDrvsOpsSup();
  }, []);

  return (
    <>
      <div className="flex items-center pb-3 justify-between">
        <div className="hidden md:flex">
          <Heading
            title="Administration"
            description="Perform Administrative Tasks."
          />
        </div>
        <div className="flex md:hidden">
          <Heading title="Admin" description="" />
        </div>
        {isTeam && (
          <div className="space-x-2 flex">
            <StatusModal />
            <MainCreateAdminModal
              drivers={driversName}
              statuses={statuses}
              supportCoord={supportCoordinators}
              operationCoord={operationCoordinators}
              driversInfo={driversInfo}
            />
          </div>
        )}
        {isVehicle && (
          <div className="space-x-2 flex">
            <StatusModal />
            <CreateVehicleModal />
          </div>
        )}
        {isCoordinator && (
          <div className="space-x-2 flex">
            <StatusModal />
            <div className="space-x-2 flex justify-between">
              <CreateOperatorModal />
              <CreateSupportModal />
            </div>
          </div>
        )}
      </div>

      <ViewToggle />
      <ScheduleSeparator />
      {isTeam && (
        <DataTable searchKey="team" columns={adminColumns} data={adminData} />
      )}

      {isVehicle && (
        <DataTable
          searchKey="vehicle"
          columns={vehicleColumns}
          data={vehicleData}
        />
      )}

      {isCoordinator && (
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-12 md:gap-y-3">
          <DataTable
            searchKey="fullName"
            columns={operationCoordinatorColumn}
            data={operationCoordData}
          />
          <DataTable
            searchKey="fullName"
            columns={supportCoordinatorColumn}
            data={supportCoordData}
          />
        </div>
      )}

      {/* Coordinator & Driver */}
      <Separator className="h-[0.5px]" />
      <div className="flex items-center justify-between pb-4">
        <div className="hidden md:flex">
          <Heading
            title="Coordinator & Driver"
            description="Gain a better insight on different Coordinators and Drivers"
          />
        </div>
        <div className="flex md:hidden">
          <Heading title="Coords & Drives" description="" />
        </div>
        {/* <Button
          variant="outline"
          size="icon"
          onClick={() => console.log("Redirect to more information")}
        >
          <MoreHorizontal className="h-[1.2rem] w-[1.2rem]" />
        </Button> */}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <SubHeading title="Operations Coordinator" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => console.log("open explanation modal")}
          >
            <HelpCircle className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </div>
        <Separator className={"h-[0.5px]"} />
        <DataTableDownload
          searchKey="operationCoordinator"
          columns={coordinatorActionsColumns}
          data={coordData}
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <SubHeading title="Driver" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => console.log("Open explanation modal")}
          >
            <HelpCircle className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </div>
        <Separator className={"h-[0.5px]"} />
        <DataTable
          searchKey="driver"
          columns={driverActionsColumns}
          data={driverData}
        />
      </div>
    </>
  );
};
