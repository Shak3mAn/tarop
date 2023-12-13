"use client";

import { useDriversMapMeta } from "../../store/api/map-meta-store";
import { useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";

import { DriverTravel } from "./driver-travel";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const DriversMeta = () => {
  const { fetchDriverMeta, driverMeta } = useDriversMapMeta();

  const clerkUser = useUser();

  const clerk = useAuth();

  useEffect(() => {
    const fetchDrvMeta = async () => {
      if (clerk.isLoaded) {
        const userData = {
          email: clerkUser.user?.primaryEmailAddress.emailAddress,
        };
        await fetchDriverMeta(userData);
      }
    };

    const intervalId = setInterval(fetchDrvMeta, 20000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Card className="shadow-sm md:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-xl font-bold">Metadata</CardTitle>
        </CardHeader>

        <CardContent>
          <DriverTravel driverMeta={driverMeta} />
        </CardContent>
      </Card>
    </>
  );
};
