"use client";

import { useEffect } from "react";

import {
  useTeamsMapMeta,
  useDriversMapMeta,
} from "../../../store/api/map-meta-store";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import TDListSwitcher from "../../switchers/TDListSwitcher";
import { TDList } from "./TD/TDList";
import {
  tdLists,
} from "../../../lib/utils/data";
import { Separator } from "../../ui/separator";

export const TeamLists = () => {
  const { fetchDriverMeta, driversMeta } = useDriversMapMeta();
  const { fetchTeamsMeta, teamsMeta } = useTeamsMapMeta();

  useEffect(() => {
    const fetchDrvTmsMeta = async () => {
      await fetchDriverMeta();
      await fetchTeamsMeta();
    };

    fetchDrvTmsMeta();
  }, []);
  return (
    <>
      <Card className="h-full shadow-sm">
        <CardHeader className="flex space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0 pb-0">
          <div className="flex flex-col">
            <CardTitle className="text-xl items-center font-bold">
              Real-Time Navigation
            </CardTitle>
            <CardDescription className="text-sm">
              Team & Driver Real-Time Navigation Data.
            </CardDescription>
          </div>
          <TDListSwitcher items={tdLists} />
        </CardHeader>
        <CardContent className="mb-4">
          <Separator className="h-[0.5px]" />
          <TDList drivers={driversMeta} teams={teamsMeta} />
        </CardContent>
      </Card>
    </>
  );
};
