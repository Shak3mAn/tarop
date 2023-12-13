"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import React, { useContext, useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Navigation, Users, Car } from "lucide-react";
import { addMinutes, addHours, format } from "date-fns";

import { UserLocationContext } from "../../../../lib/context/context";
import {
  useTDListSwitcher,
  useMainMapSwitcher,
} from "../../../../store/use-general";
import { TooltipContent } from "../../../ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Separator } from "../../../ui/separator";
import { cn } from "../../../../lib/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const TDItem = ({ tdItems }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const [etaTemp, setEtaTemp] = useState("");
  const [counter, setCounter] = useState(0);
  const [meta, setMeta] = useState({
    distance: "distance",
    duration: "duration",
    eta: "E.T.A",
    status: "status",
  });

  const [locations, setLocations] = useState({
    source: {
      lat: tdItems.info?.lat,
      lng: tdItems.info?.lng,
    },
    destinationA: {
      lat: tdItems.task?.lat,
      lng: tdItems.task?.lng,
    },
    destinationB: {
      lat: tdItems?.option == "team" ? tdItems.driver?.lat : tdItems.team?.lat,
      lng: tdItems?.option == "team" ? tdItems.driver?.lng : tdItems.team?.lng,
    },
  });
  const [formattedItem, setFormattedItem] = useState({});

  const { isTDList } = useTDListSwitcher();
  const { isMainMap, addMainMap } = useMainMapSwitcher();

  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const [distance, setDistance] = useState();

  useEffect(() => {
    if (isTDList?.label == "Teams") {
      setFormattedItem({
        value: tdItems?.id,
        label: tdItems?.team,
      });
      setLocations({
        source: {
          lat: tdItems.info?.lat,
          lng: tdItems.info?.lng,
        },
        destinationA: {
          lat: tdItems.task?.lat,
          lng: tdItems.task?.lng,
        },
        destinationB: {
          lat: tdItems.driver?.lat,
          lng: tdItems.driver?.lng,
        },
      });
    }
    if (isTDList?.label == "Drivers") {
      setFormattedItem({
        value: tdItems?.id,
        label: tdItems?.driver,
      });
      setLocations({
        source: {
          lat: tdItems.info?.lat,
          lng: tdItems.info?.lng,
        },
        destinationA: {
          lat: tdItems.task?.lat,
          lng: tdItems.task?.lng,
        },
        destinationB: {
          lat: tdItems.team?.lat,
          lng: tdItems.team?.lng,
        },
      });
    }
  }, [tdItems, isTDList]);

  useEffect(() => {
    // Set up an interval to call the function every 5 seconds
    const intervalId = setInterval(() => {
      if (tdItems?.status == "Pending") {
        distanceMatrixB();
      }
      if (
        tdItems?.status == "Ongoing" ||
        tdItems?.status == "Delayed" ||
        tdItems?.status == "Initial"
      ) {
        distanceMatrixA();
      }
  //   setCounter((prevCounter) => prevCounter + 1);
    }, 30000);

  // console.log("Real Timing 10 seconds calls counter:", counter)

    // Clear the interval when the component is unmounted or when needed
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (tdItems?.status == "Pending") {
      distanceMatrixB();
    }
    if (
      tdItems?.status == "Ongoing" ||
      tdItems?.status == "Delayed" ||
      tdItems?.status == "Initial"
    ) {
      distanceMatrixA();
    }
  }, [isTDList, tdItems]);

  {
    /* Distance Calcs */
  }
  const distanceMatrixA = () => {
    const DistanceMatrixService = new google.maps.DistanceMatrixService();

    DistanceMatrixService.getDistanceMatrix(
      {
        origins: [{ lat: locations.source?.lat, lng: locations.source?.lng }],
        destinations: [
          {
            lat: locations.destinationA?.lat,
            lng: locations.destinationA?.lng,
          },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
      
          setMeta({
            duration: result.rows[0].elements[0].duration.text,
            distance: result.rows[0].elements[0].distance.text,
            status: tdItems.status,
          });
        } else {
          console.error("ERROR: `DistanceMatrixService` route error!");
        }
      }
    );
  };

  const distanceMatrixB = () => {
    const DistanceMatrixService = new google.maps.DistanceMatrixService();

    DistanceMatrixService.getDistanceMatrix(
      {
        origins: [{ lat: locations.source?.lat, lng: locations.source?.lng }],
        destinations: [
          {
            lat: locations.destinationB?.lat,
            lng: locations.destinationB?.lng,
          },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
       
          setMeta({
            duration: result.rows[0].elements[0].duration.text,
            distance: result.rows[0].elements[0].distance.text,
            status: tdItems.status,
          });
        } else {
          console.error("ERROR: `DistanceMatrixService` route error!");
        }
      }
    );
  };

  {
    /* Calculating E.T.A. */
  }
  useEffect(() => {
    if (
      meta?.duration &&
      meta?.duration != "duration" &&
      meta?.duration != "1 min"
    ) {
      // console.log("Duration Two", meta.duration);
      if (meta?.duration.includes("hour")) {
        let min = 0;
        let currentDate = new Date();

        const regex = /\b\d+\s*hours\b/;
        const match = meta?.duration.match(regex);

        const hours = parseInt(meta?.duration.split("hour")[0]);
        if (!match) {
          min = parseInt(meta?.duration.split("hour")[1]);
        } else {
          min = parseInt(meta?.duration.split("hours")[1]);
        }

        const newTime = addMinutes(addHours(currentDate, hours), min);
        const editDate = new Date(newTime);
       
        const formattedTime = format(editDate, "h:mm a");
        setMeta((prevMeta) => ({ ...prevMeta, eta: formattedTime }));
        setEtaTemp(formattedTime);
      } else {
        let currentDate = new Date();

        const minutes = parseInt(meta?.duration.split("minutes")[0]);

        const newTime = addMinutes(currentDate, minutes);

        const editDate = new Date(newTime);
        const formattedTime = format(editDate, "h:mm a");
        setMeta((prevMeta) => ({ ...prevMeta, eta: formattedTime }));
        setEtaTemp(formattedTime);
      }
    }

  }, [meta?.duration, isTDList]);

  const handleOnNavigate = (formattedItem) => {
    // console.log("handleOnNavigate");
    addMainMap(formattedItem);

    // console.log("Navigation", isMainMap);
  };

  return isLoaded ? (
    <Card className="shadow-sm min-w-[275px] sm:w-[245px] md:w-[225px] hover:bg-primary/5 p-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-1">
        <div>
          <CardDescription className="text-xs font-semibold">
            {isTDList?.label == "Teams" ? <>Team</> : <>Driver</>}
          </CardDescription>
          <CardTitle className="text-xl font-semibold">
            {isTDList?.label == "Teams" ? (
              <>{tdItems?.team}</>
            ) : (
              <>{tdItems?.driver} </>
            )}
            {/* Avengers */}
          </CardTitle>
        </div>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" })
              )}
              onClick={() => handleOnNavigate(formattedItem)}
            >
              <Navigation className="h-4 w-4 transition-all" />
            </button>
          </Tooltip.Trigger>
          <TooltipContent>
            Navigate
            <Tooltip.Arrow className="fill-white" />
          </TooltipContent>
        </Tooltip.Root>
      </CardHeader>
      <CardContent className="p-1">
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          <div className="flex flex-col col-span-1">
            <span className="text-sm items-left justify-start font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Distance
            </span>
            <p className="mt-1 justify-start items-center flex text-sm text-muted-foreground">
              {/* 22 Km */}
              {meta?.distance}
            </p>
          </div>
          <div className="flex flex-col col-span-1">
            <span className="text-sm items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              ETA
            </span>
            <p className="mt-1 justify-left items-center flex text-sm text-muted-foreground">
              {/* 21 mins */}
              {meta?.eta ? meta?.eta : etaTemp}
            </p>
          </div>
          <div className="flex flex-col col-span-1">
            <span className="text-sm items-left justify-start font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Status
            </span>
            <p className="mt-1 justify-start items-center flex text-sm text-muted-foreground">
              {/* Pending */}
              {tdItems?.status}
            </p>
          </div>
          <div className="flex flex-col col-span-1">
            <span className="text-sm items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Team Color
            </span>
            <p className="mt-1 justify-left items-center flex text-sm text-muted-foreground">
              {isTDList?.label === "Teams" ? (
                <Users
                  className={`ml-2 h-4 w-4`}
                  style={{ color: tdItems.info?.teamColor }}
                />
              ) : (
                <Car
                  className={`ml-2 h-4 w-4`}
                  style={{ color: tdItems.info?.teamColor }}
                />
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  ) : (
    <></>
  );
};
