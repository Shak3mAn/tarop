"use client";

import { AdminClient } from "../../../../../components/admin/client";
import { useTeamStore } from "../../../../../store/api/team-store";
import { useEventStore } from "../../../../../store/api/event-store";
import { useOperatorStore } from "../../../../../store/api/operator-store";
import { useSupportStore } from "../../../../../store/api/support-store";
import { useVehicleStore } from "../../../../../store/api/vehicle-store";
import { useDriversMapMeta } from "../../../../../store/api/map-meta-store";
import { useEffect } from "react";

//NOTE: Status; PENDING, COMPLETED, ONGOING, DELAYED, FAILED

const AdminPage = () => {
  // const [loading, setLoading] = useState(false)

  const { fetchTeams, teams } = useTeamStore();
  const { fetchEvents, events } = useEventStore();
  const { fetchOperators, operators } = useOperatorStore();
  const { fetchDriversMeta, driversMM } = useDriversMapMeta();
  const { fetchSupports, supports } = useSupportStore();
  const { fetchVehicles, vehicles } = useVehicleStore();

  useEffect(() => {
    const fetchSupOpsTms = async () => {
      await fetchSupports();
      await fetchOperators();
      await fetchVehicles();
      await fetchTeams();
      await fetchEvents();
      await fetchDriversMeta();
    };

    fetchSupOpsTms();
  }, []);

  const formattedVehicle = vehicles.map((item) => ({
    id: item._id,
    vehicle: item.vehicle,
    vehicleManufacturer: item.vehicleManufacturer,
    vehicleMake: item.vehicleMake,
    vehicleColor: item.vehicleColor,
  }));

  const formattedOperation = operators.map((item) => ({
    id: item._id,
    fullName: item.fullName,
    firstName: item.firstName,
    lastName: item.lastName,
    telephone: item.phoneNo,
    email: item.email,
  }));

  const formattedSupport = supports.map((item) => ({
    id: item._id,
    fullName: item.fullName,
    firstName: item.firstName,
    lastName: item.lastName,
    telephone: item.phoneNo,
    email: item.email,
  }));

  const formattedAdmin = teams.map((item) => ({
    id: item._id,
    team: item.team,
    teamColor: item.teamColor,
    operationCoordinator: item.operationCoordinator,
    supportCoordinator: item.supportCoordinator,
    driver: item.driver,
    status: item.status,
  }));

  const formattedCoordinator = events.map((item) => ({
    id: item._id,
    operationCoordinator: item.instigator,
    team: item.team,
    action: item.action,
    createdAtTime: new Date(item.createdAt).toLocaleTimeString(),
    createdAtDate: new Date(item.createdAt).toLocaleDateString(),
  }));

  const formattedDriver = driversMM.map((item) => ({
    id: item._id,
    driver: item.driver,
    team: item.info?.team,
    task: item.task?.task ? item.task.task : "No Task",
    status: item.status ? item.status : "No Status",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 overflow-x-hidden space-y-4 p-8 pt-6">
        <AdminClient
          adminData={formattedAdmin}
          coordData={formattedCoordinator}
          driverData={formattedDriver}
          supportCoordData={formattedSupport}
          operationCoordData={formattedOperation}
          vehicleData={formattedVehicle}
        />
      </div>
    </div>
  );
};

export default AdminPage;
