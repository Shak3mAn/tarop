"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import * as Geocode from "react-geocode";
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useUser, useAuth } from "@clerk/nextjs";

import { UserLocationContext } from "../../../lib/context/context";

import { DriverDashMobileTools } from "../tools/mobile-driver-dash-tools";
import { useDriversMapMeta } from "../../../store/api/map-meta-store";
import { DriverItem } from "./lists/driver-item";

export const DriverDashMapView = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  Geocode.setDefaults({
    key: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
    language: "en",
    region: "ke",
  });

  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

  const clerkUser = useUser();

  const clerk = useAuth();

  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const { fetchDriverMeta, driverMeta } = useDriversMapMeta();

  const [userSrc, setUserSrc] = useState({
    lat: 1.2921,
    lng: 36.8219,
    label: "home",
  });

  const [driver, setDriver] = useState({
    driver: "driver",
    info: {
      lat: 1.2921,
      lng: 36.8219,
      teamColor: "",
      team: "",
      vehicle: "",
      address: "",
      city: "",
      state: "",
      country: "",
      status: "",
    },
    task: {
      task: "",
      lat: "",
      lng: "",
    },
    team: {
      team: "",
      lat: "",
      lng: "",
    },
  });

  useEffect(() => {
    setUserSrc(userLocation);
  }, []);

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

  {
    /* Driver */
  }
  useEffect(() => {
    setDriver([]);
    setDriver({
      driver: driverMeta?.driver,
      info: {
        lat: driverMeta.info?.lat,
        lng: driverMeta.info?.lng,
        teamColor: driverMeta.info?.teamColor,
        team: driverMeta.info?.team,
        vehicle: driverMeta.info?.vehicle,
        address: driverMeta.info?.address,
        city: driverMeta.info?.city,
        state: driverMeta.info?.state,
        country: driverMeta.info?.country,
        status: driverMeta?.status,
      },
      task: {
        task: driverMeta.task?.task,
        lat: driverMeta.task?.lat,
        lng: driverMeta.task?.lng,
      },
      team: {
        team: driverMeta.team?.team,
        lat: driverMeta.team?.lat,
        lng: driverMeta.team?.lng,
      },
    });
  }, [driverMeta]);

  return isLoaded ? (
    <>
      <div className="z-[125]">{isTabletMid && <DriverDashMobileTools />}</div>
      {isTabletMid ? (
        <>
          <div className="object-cover bg-transparent z-[100]">
            <GoogleMap
              mapContainerStyle={{
                width: "100vh",
                height: "100vh",
                borderRadius: "12px",
              }}
              center={userSrc}
              zoom={15}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              <>
                <DriverItem driver={driver} />
              </>
            </GoogleMap>
          </div>
        </>
      ) : (
        <>
          <div className="object-cover bg-transparent z-[100]">
            <GoogleMap
              mapContainerStyle={{
                width: "750px",
                height: "100%",
                borderBottomLeftRadius: "12px",
                borderTopLeftRadius: "12px",
              }}
              center={userSrc}
              zoom={15}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            >
              <>
                <DriverItem driver={driver} />
              </>
            </GoogleMap>
          </div>
        </>
      )}
    </>
  ) : (
    <>
      <div className="h-full w-full rounded-[12px] flex items-center justify-center bg-primary/50 ">
        Subiri! Let it Load!!
      </div>
    </>
  );
};
