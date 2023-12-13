"use client";

import { TeamClient } from "../../../../../components/teams/main/client";
import { useTeamStore } from "../../../../../store/api/team-store";
import { useDriverStore } from "../../../../../store/api/driver-store";
import { useEffect, useLayoutEffect, useState } from "react";
//NOTE: Status; PENDING, COMPLETED, ONGOING, DELAYED, FAILED

const TeamsPage = () => {
  const { fetchTeams, teams } = useTeamStore();
  const { fetchDrivers, drivers } = useDriverStore();

  useEffect(() => {
    const fetchDrvTms = async () => {
      await fetchDrivers();
      await fetchTeams();
    };

    fetchDrvTms();
  }, []);

  const formattedTeam = teams.map((item) => ({
    id: item._id,
    team: item.team,
    teamColor: item.teamColor,
    operationCoordinator: item.operationCoordinator,
    supportCoordinator: item.supportCoordinator,
    driver: item.driver,
    status: item.status,
  }));

  const formattedDriver = drivers.map((item) => ({
    id: item._id,
    driver: item.driver,
    team: item.team,
    vehicle: item.vehicle,
    vehicleMake: item.vehicleMake,
    status: item.status,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TeamClient driverData={formattedDriver} teamData={formattedTeam} />
      </div>
    </div>
  );
};

export default TeamsPage;
