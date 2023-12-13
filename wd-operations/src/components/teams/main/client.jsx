"use client";

import { useEffect } from "react";

import { useSupportStore } from "../../../store/api/support-store";
import { useVehicleStore } from "../../../store/api/vehicle-store";
import { useOperatorStore } from "../../../store/api/operator-store";
import { useTeamStore } from "../../../store/api/team-store";

import { DataTable } from "../../ui/data-table";
import { driverColumns, teamColumns } from "./columns";
import { Heading } from "../../ui/heading";
import { Separator } from "../../ui/separator";
import { MainCreateTeamModal } from "../../modals/team/main-create-team-modal";
import { MainCreateDriverModal } from "../../modals/driver/main-create-driver-modal";
import { statuses } from "../../../lib/utils/data";
import { useDriverStore } from "../../../store/api/driver-store";
//TODO: Add different required Paths
export const TeamClient = ({ driverData, teamData }) => {
  const { fetchDrivers, driversName, driversInfo } = useDriverStore();
  const { fetchOperators, operationCoordinators } = useOperatorStore();
  const { fetchSupports, supportCoordinators } = useSupportStore();
  const { fetchTeams, teamsName } = useTeamStore();
  const { fetchVehicles, vehicleName, vehicleMake } = useVehicleStore();

  useEffect(() => {
    const fetchCarsTeams = async () => {
      await fetchDrivers();
      await fetchOperators();
      await fetchSupports();
      await fetchTeams();
      await fetchVehicles();
    };

    fetchCarsTeams();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Team" description="Manage various teams." />
        <MainCreateTeamModal
          operationCoordinators={operationCoordinators}
          supportCoordinators={supportCoordinators}
          drivers={driversName}
          statuses={statuses}
          driversInfo={driversInfo}
        />
      </div>
      <Separator />
      <DataTable searchKey="team" columns={teamColumns} data={teamData} />

      <div className="flex items-center justify-between">
        <Heading title="Driver" description="Manage different drivers." />
        <MainCreateDriverModal
          statuses={statuses}
          team={teamsName}
          vehicle={vehicleName}
          make={vehicleMake}
        />
      </div>
      <Separator />
      <DataTable searchKey="driver" columns={driverColumns} data={driverData} />
    </>
  );
};
