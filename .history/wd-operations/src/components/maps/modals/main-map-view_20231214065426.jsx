"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import * as Geocode from "react-geocode";
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { UserLocationContext } from "../../../lib/context/context";

import { MobileMainMapTools } from "../tools/mobile-map-tools";
import { useMainMapSwitcher } from "../../../store/use-general";
import {
  useDriversMapMeta,
  useTeamsMapMeta,
  useTasksMapMeta,
} from "../../../store/api/map-meta-store";

import { TeamItem } from "../main/lists/main-team-item";
import { TaskItem } from "../main/lists/main-task-item";
import { DriverItem } from "../main/lists/main-driver-item";

//TODO: Alter the Markers to include the Place API, introduce the Markers for distance difference matrix API, and Live Tracking API.
//TODO: Ensures UI between Markers is color dependent on the team "COLOR"
//TODO: Add Icon Marker in `MarkerF`
//TODO: Change the Google Maps center configuration to be inclusive of the selected teams, as before.

const containerStyle = {
  width: "100%",
  height: "650px",
  borderRadius: "12px",
};

export const MapView = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  Geocode.setDefaults({
    key: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
    language: "en",
    region: "ke",
  });

  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

  const [map, setMap] = useState();

  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const { isMainMap } = useMainMapSwitcher();
  const { fetchTeamsMeta, teamsMeta } = useTeamsMapMeta();
  const { fetchDriversMeta, driversMeta } = useDriversMapMeta();
  const { fetchTasksMeta, tasksMeta } = useTasksMapMeta();

  const [userSrc, setUserSrc] = useState({
    lat: 1.2921,
    lng: 36.8219,
    label: "home",
  });

  useEffect(() => {
    const fetchTmsDrvsTsksMeta = async () => {
      await fetchTeamsMeta();
      await fetchDriversMeta();
      await fetchTasksMeta();
    };

    const intervalId = setInterval(fetchTmsDrvsTsksMeta, 20000);

    return () => clearInterval(intervalId);
  }, []);

  const [task, setTask] = useState({
    task: "task",
    source: {
      lat: 1.2921,
      lng: 36.8219,
      label: "home",
      address: "",
      city: "",
      state: "",
      country: "",
    },
    destination: {
      lat: 1.2921,
      lng: 36.8219,
      label: "destination",
      address: "",
      city: "",
      state: "",
      country: "",
    },
    teamColor: "",
    status: "",
    taskDRPs: {},
    team: {
      team: "",
      lat: "",
      lng: "",
    },
    driver: {
      driver: "",
      lat: "",
      lng: "",
    },
  });

  const [tasks, setTasks] = useState([
    {
      task: "task",
      source: {
        lat: 1.2921,
        lng: 36.8219,
        label: "home",
        address: "",
        city: "",
        state: "",
        country: "",
      },
      destination: {
        lat: 1.2921,
        lng: 36.8219,
        label: "destination",
        address: "",
        city: "",
        state: "",
        country: "",
      },
      teamColor: "",
      status: "",
      taskDRPs: {},
      team: {
        team: "",
        lat: "",
        lng: "",
      },
      driver: {
        driver: "",
        lat: "",
        lng: "",
      },
    },
  ]);

  const [team, setTeam] = useState({
    team: "team",
    info: {
      lat: 1.2921,
      lng: 36.8219,
      operator: "operator",
      teamColor: "",
      address: "",
      city: "",
      state: "",
      country: "",
      status: "",
    },
    task: {
      task: "",
      lat: 0,
      lng: 0,
    },
    driver: {
      driver: "",
      lat: 0,
      lng: 0,
    },
  });

  const [teams, setTeams] = useState([
    {
      team: "team",
      info: {
        lat: 1.2921,
        lng: 36.8219,
        operator: "operator",
        teamColor: "",
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
      driver: {
        driver: "",
        lat: "",
        lng: "",
      },
    },
  ]);

  const [drivers, setDrivers] = useState([
    {
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
    },
  ]);

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

  {
    /* Initializing respective states */
  }
  {
    /* User Source */
  }
  useEffect(() => {
    setUserSrc(userLocation);
  }, []);
  {
    /* Tasks */
  }
  useEffect(() => {
    //Initializing (Booting)
    setTasks([]);

    tasksMeta.map((task, i) => {
      setTasks((state) => [
        ...state,
        {
          task: task?.task,
          source: {
            lat: task.source?.lat,
            lng: task.source?.lng,
            label: task.source?.lng,
            address: task.source?.address,
            city: task.source?.city,
            state: task.source?.state,
            country: task.source?.country,
          },
          destination: {
            lat: task.destination?.lat,
            lng: task.destination?.lng,
            label: task.destination?.label,
            address: task.destination?.address,
            city: task.destination?.city,
            state: task.destination?.state,
            country: task.destination?.country,
          },
          teamColor: task?.teamColor,
          status: task?.status,
          team: {
            team: task.team?.name,
            lat: task.team?.lat,
            lng: task.team?.lng,
          },
          driver: {
            driver: task.driver?.name,
            lat: task.driver?.lat,
            lng: task.driver?.lng,
          },
        },
      ]);
    });
  }, [tasksMeta]);

  {
    /* Teams */
  }
  useEffect(() => {
    setTeams([]);

    console.log("TeamsMeta:", teamsMeta);
    teamsMeta.map((gTeam, i) => {
      setTeams((state) => [
        ...state,
        {
          team: gTeam?.team,
          info: {
            lat: gTeam.info?.lat,
            lng: gTeam.info?.lng,
            operator: gTeam.info?.operator,
            teamColor: gTeam.info?.teamColor,
            address: gTeam.info?.address,
            city: gTeam.info?.city,
            state: gTeam.info?.state,
            country: gTeam.info?.country,
            status: gTeam?.status,
          },
          task: {
            task: gTeam.task?.task,
            lat: gTeam.task?.lat,
            lng: gTeam.task?.lng,
          },
          driver: {
            driver: gTeam.driver?.driver,
            lat: gTeam.driver?.lat,
            lng: gTeam.driver?.lng,
          },
        },
      ]);
    });

  }, [teamsMeta]);

  {
    /* Drivers */
  }
  useEffect(() => {
    //Initializing (Booting)
    setDrivers([]);

    driversMeta.map((gDriver, i) => {
      setDrivers((state) => [
        ...state,
        {
          driver: gDriver?.driver,
          info: {
            lat: gDriver.info?.lat,
            lng: gDriver.info?.lng,
            teamColor: gDriver.info?.teamColor,
            team: gDriver.info?.team,
            vehicle: gDriver.info?.vehicle,
            address: gDriver.info?.address,
            city: gDriver.info?.city,
            state: gDriver.info?.state,
            country: gDriver.info?.country,
            status: gDriver?.status,
          },
          task: {
            task: gDriver.task?.task,
            lat: gDriver.task?.lat,
            lng: gDriver.task?.lng,
          },
          team: {
            team: gDriver.team?.team,
            lat: gDriver.team?.lat,
            lng: gDriver.team?.lng,
          },
        },
      ]);
    });
  }, [driversMeta]);
  {
    /* Updating the Tasks, Drivers, TaskDRPs & Teams States, (Dependent on Switcher) */
  }
  {
    /* Task */
  }
  useEffect(() => {
    if (isMainMap != {}) {
      tasks.map((task, i) => {
        if (task.task == isMainMap.label) {
          setTask({
            task: task.task,
            source: {
              lat: task.source.lat,
              lng: task.source.lng,
              label: task.source.lng,
              address: task.source.address,
              city: task.source.city,
              state: task.source.state,
              country: task.source.country,
            },
            destination: {
              lat: task.destination.lat,
              lng: task.destination.lng,
              label: task.destination.label,
              address: task.destination.address,
              city: task.destination.city,
              state: task.destination.state,
              country: task.destination.country,
            },
            teamColor: task.teamColor,
            status: task.status,
            taskDRPs: task.taskDRPs,
            team: {
              team: task.team.team,
              lat: task.team.lat,
              lng: task.team.lng,
            },
            driver: {
              driver: task.driver.driver,
              lat: task.driver.lat,
              lng: task.driver.lng,
            },
          });
        }
      });
    }
  }, [isMainMap]);

  {
    /* Team */
  }
  useEffect(() => {
    if (isMainMap != {}) {
      teams.map((team, i) => {
        if (team.team == isMainMap.label) {
          setTeam({
            team: team.team,
            info: {
              lat: team.info.lat,
              lng: team.info.lng,
              operator: team.info.operator,
              teamColor: team.info.teamColor,
              address: team.info.address,
              city: team.info.city,
              state: team.info.state,
              country: team.info.country,
              status: team.info.status,
            },
            task: {
              task: team.task.task,
              lat: team.task.lat,
              lng: team.task.lng,
            },
            driver: {
              driver: team.driver.driver,
              lat: team.driver.lat,
              lng: team.driver.lng,
            },
          });
        }
      });
    }
  }, [isMainMap]);
  {
    /* Driver */
  }
  useEffect(() => {
    if (isMainMap != {}) {
      drivers.map((driver, i) => {
        if (driver.driver == isMainMap.label) {
          setDriver({
            driver: driver.driver,
            info: {
              lat: driver.info.lat,
              lng: driver.info.lng,
              teamColor: driver.info.teamColor,
              team: driver.info.team,
              vehicle: driver.info.vehicle,
              address: driver.info.address,
              city: driver.info.city,
              state: driver.info.state,
              country: driver.info.country,
              status: driver.info.status,
            },
            task: {
              task: driver.task.task,
              lat: driver.task.lat,
              lng: driver.task.lng,
            },
            team: {
              team: driver.team.team,
              lat: driver.team.lat,
              lng: driver.team.lng,
            },
          });
        }
      });
    }
  }, [isMainMap]);

  return isLoaded ? (
    <>
      <div className="z-[125]">{isTabletMid && <MobileMainMapTools />}</div>
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
              {/* Child components, such as markers, info windows, etc. */}
              <>
                {/* Team */}
                {isMainMap && isMainMap.label == team.team ? (
                  <>
                    <TeamItem team={team} />
                  </>
                ) : (
                  <> </>
                )}
                {/* Task */}
                {isMainMap && isMainMap.label == task.task ? (
                  <>
                    <TaskItem task={task} />
                  </>
                ) : (
                  <> </>
                )}
                {/* Driver */}
                {isMainMap && isMainMap.label == driver.driver ? (
                  <>
                    <DriverItem driver={driver} />
                  </>
                ) : (
                  <> </>
                )}
              </>
            </GoogleMap>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="object-cover bg-transparent z-[100]">
            <GoogleMap
              mapContainerStyle={{
                width: "650px",
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
              {/* Child components, such as markers, info windows, etc. */}
              <>
                {/* Team */}
                {isMainMap && isMainMap.label == team.team ? (
                  <>
                    <TeamItem team={team} />
                  </>
                ) : (
                  <> </>
                )}
                {/* Task */}
                {isMainMap && isMainMap.label == task.task ? (
                  <>
                    <TaskItem task={task} />
                  </>
                ) : (
                  <> </>
                )}
                {/* Driver */}
                {isMainMap && isMainMap.label == driver.driver ? (
                  <>
                    <DriverItem driver={driver} />
                  </>
                ) : (
                  <> </>
                )}
              </>
            </GoogleMap>
          </div>
        </>
      )}
    </>
  ) : (
    <>
      <div className="h-full w-full rounded-[12px] flex items-center justify-center bg-primary/50">
        Subiri! Let it Load!!
      </div>
    </>
  );
};
