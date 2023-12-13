"use client";

import { useContext, useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";

import { useTaskStore } from "../../../store/api/tasks-store";
import { useTeamStore } from "../../../store/api/team-store";
import { useSupportStore } from "../../../store/api/support-store";
import { useOperatorStore } from "../../../store/api/operator-store";
import { useDriverStore } from "../../../store/api/driver-store";
import { useUserStore } from "../../../store/api/user-store";

import { DriverOptionClient } from "../../../components/dash/driver-option";
import { Loader } from "../../../components/ui/loading";
import { Heading } from "../../../components/ui/heading";
import { Separator } from "../../../components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { SchedDashClient } from "../../../components/schedule/dash/client";
import { TeamsDashClient } from "../../../components/teams/dash/client";
import { ScheduleModal } from "../../../components/modals/task/schedule-modal";
import { TeamModal } from "../../../components/modals/team/team-modal";
import { DashMapModal } from "../../../components/modals/map/dash-map-modal";
import { MapView } from "../../../components/maps/dash/MapView";
import { statuses } from "../../../lib/utils/data";

import { UserLocationContext } from "../../../lib/context/context";

import { useUserInfo } from "../../../store/use-general";


export default function DashboardPage() {
  const { userLocation } = useContext(UserLocationContext);

  const [userInfo, setUserInfo] = useState({});

  const { user } = useUser();
  const { isLoaded } = useAuth();

  const addUserInfo = useUserInfo((state) => state.addUserInfo);

  const { fetchUser, person } = useUserStore();
  const { fetchTeams, teams, teamsName } = useTeamStore();
  const { fetchTasks, tasks } = useTaskStore();
  const { fetchDrivers, driversName, driversInfo } = useDriverStore();
  const { fetchOperators, operationCoordinators } = useOperatorStore();
  const { fetchSupports, supportCoordinators } = useSupportStore();

  useEffect(() => {
    const fetchSupOpsTms = async () => {
      await fetchSupports();
      await fetchOperators();
      await fetchTeams();
      await fetchDrivers();
      await fetchTasks();
    };

    fetchSupOpsTms();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoaded) {
        const userData = { email: user?.primaryEmailAddress.emailAddress };
        await fetchUser(userData);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    addUserInfo({
      role: userInfo.role,
      lat: userLocation.lat,
      lng: userLocation.lng,
    });
  }, [userLocation]);

  const formattedSchedule = tasks.map((item) => ({
    id: item._id,
    task: item.name,
    status: item.status,
  }));

  const formattedTeams = teams.map((item) => ({
    id: item._id,
    team: item.team,
    teamColor: item.teamColor,
    operationCoordinator: item.operationCoordinator,
    supportCoordinator: item.supportCoordinator,
    driver: item.driver,
    status: item.status,
  }));

  return isLoaded ? (
    <>
      {person?.role !== "Driver" ? (
        <>
          <div className="flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <Heading
                title="Dashboard"
                description="Current Schedule, Metadata on Personnel & Segment of Map Area"
              />
              <Separator className="" />
              <div className="flex flex-col gap-y-4 md:grid md:gap-4 md:grid-cols-3 h-auto">
                {/* Schedule Card */}
                <Card className="shadow-sm md:col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-xl font-bold">
                      Schedule
                    </CardTitle>
                    <ScheduleModal statuses={statuses} teams={teamsName} />
                  </CardHeader>
                  <CardContent>
                    <SchedDashClient data={formattedSchedule} />
                  </CardContent>
                </Card>

                {/* Map Card */}
                <Card className="shadow-sm md:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">
                      Map View
                    </CardTitle>
                    <DashMapModal />
                  </CardHeader>
                  <CardContent>
                    <MapView />
                  </CardContent>
                </Card>

                {/* Summary Table */}
                <Card className="shadow-sm md:col-span-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                    <CardTitle className="text-xl font-bold">Teams</CardTitle>
                    <TeamModal
                      operationCoordinators={operationCoordinators}
                      supportCoordinators={supportCoordinators}
                      drivers={driversName}
                      driversInfo={driversInfo}
                      statuses={statuses}
                    />
                  </CardHeader>
                  <CardContent>
                    <TeamsDashClient data={formattedTeams} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <DriverOptionClient />
        </>
      )}
    </>
  ) : (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    </>
  );
}
