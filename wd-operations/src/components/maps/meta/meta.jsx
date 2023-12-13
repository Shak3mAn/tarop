"use client";

import { HelpCircle } from "lucide-react";

import { useDriversMapMeta, useTeamsMapMeta  } from "../../../store/api/map-meta-store";
import { useTeamStore } from "../../../store/api/team-store";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { TeamDriverClient } from "./tds/client";
import { Travel } from "./travel";
import { useEffect } from "react";

export const Meta = ({}) => {
  const { fetchTeamsMeta, teamsMeta, teams } = useTeamsMapMeta();
  const { fetchDriversMeta, driversMeta } = useDriversMapMeta();

  useEffect(() => {
    const fetchTmsDrvsMeta = async () => {
      await fetchTeamsMeta();
      await fetchDriversMeta();
    };

    fetchTmsDrvsMeta();
  }, [])

  const formattedDriver = driversMeta.map((item) => ({
    id: item._id,
    driver: item.driver,
    vehicle: item.vehicle,
    vehicleMake: item.vehicleMake,
    status: item.status
}))

  return (
    <>
      <Card className="shadow-sm md:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-xl font-bold">Metadata</CardTitle>
          <Button variant="outline" size="icon">
            <HelpCircle className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
          </Button>
          
        </CardHeader>
        <CardContent>
          <Travel teams={teams} />
          <TeamDriverClient data={formattedDriver} />
        </CardContent>
      </Card>
    </>
  );
};
