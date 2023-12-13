"use client";

import { useState, useEffect } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { addMinutes, addHours, format } from "date-fns";

import { useDriverDistance } from "../../store/maps/use-meta-maps";

import { Separator } from "../ui/separator";

export const DriverTravel = ({ driverMeta }) => {
  const [loading, setLoading] = useState(false);
  const [etaTemp, setEtaTemp] = useState("");

  const [meta, setMeta] = useState({
    origin: "origin",
    destination: "destination",
    duration: "duration",
    distance: "distance",
    eta: "E.T.A.",
    status: "status",
    name: driverMeta?.driver ? driverMeta?.driver : "Name",
    team: driverMeta.info?.team ? driverMeta.info?.team : "Team",
    task: driverMeta.task?.task ? driverMeta.task?.task : "Task",
  });

  const { isTeamDistance, isTaskDistance } = useDriverDistance();
  const isDrvDst = useDriverDistance();

  useEffect(() => {
    if (isTaskDistance) {
      if (
        isTaskDistance.status == "Ongoing" ||
        isTaskDistance.status == "Delayed" ||
        isTaskDistance.status == "Initial"
      ) {
        setMeta({
          origin: isTaskDistance.originAddress,
          destination: isTaskDistance.destinationAddress,
          duration: isTaskDistance.duration,
          distance: isTaskDistance.distance,
          status: isTaskDistance.status,
        });
      }
      if (isTaskDistance.status == "Pending") {
        setMeta({
          origin: isTeamDistance?.originAddress,
          destination: isTeamDistance?.destinationAddress,
          duration: isTeamDistance?.duration,
          distance: isTeamDistance?.distance,
          status: isTeamDistance?.status,
        });
      }
    }
  }, [isDrvDst]);

  {
    /* Calculating the E.T.A. */
  }
  useEffect(() => {
    // console.log("Is start tIME: ", isStartDateTime);
    // console.log("Duration", meta.duration);
    if (
      meta.duration &&
      meta.duration != "duration" &&
      meta.duration != "1 min"
    ) {
      // console.log("Duration Two", meta.duration);
      if (meta.duration.includes("hour")) {
        let min = 0;
        let currentDate = new Date();

        const regex = /\b\d+\s*hours\b/;
        const match = meta.duration.match(regex);

        const hours = parseInt(meta.duration.split("hour")[0]);
        if (!match) {
          min = parseInt(meta.duration.split("hour")[1]);
        } else {
          min = parseInt(meta.duration.split("hours")[1]);
        }
        // console.log("Hours", hours);
        // console.log("Min, Dash:", min);

        // console.log("Formatted Date", currentDate);

        const newTime = addMinutes(addHours(currentDate, hours), min);
        const editDate = new Date(newTime);
        // console.log("ETA: ", format(editDate, "h:mm a"));
        const formattedTime = format(editDate, "h:mm a");
        setMeta((prevMeta) => ({ ...prevMeta, eta: formattedTime }));
        setEtaTemp(formattedTime);
        // console.log("ETA F*: ", meta.eta);
      } else {
        let currentDate = new Date();

        const minutes = parseInt(meta.duration.split("minutes")[0]);
        // console.log("Only Minutes:", minutes);

        // console.log("Formatted Date", currentDate);

        const newTime = addMinutes(currentDate, minutes);

        const editDate = new Date(newTime);
        // console.log("ETA: ", format(editDate, "h:mm a"));
        const formattedTime = format(editDate, "h:mm a");
        setMeta((prevMeta) => ({ ...prevMeta, eta: formattedTime }));
        setEtaTemp(formattedTime);
      }
    }

    // console.log("Current State Meta:", meta);
  }, [meta.duration]);

  return (
    <>
      <div className="flex flex-col space-y-1.5 justify-center items-left pt-3 pb-2">
        <h3 className="text-card-foreground text-base font-semibold tracking-tight mr-4">
          Driver
        </h3>
      </div>

      <Separator className="h-[0.5px]" />

      {/* Team Metadata */}
      <div className="flex px-4 -mt-2 mb-3">
        {!loading ? (
          <>
            <div>
              <ScrollArea.Root className="w-full h-auto overflow-hidden px-1 py-1">
                <ScrollArea.Viewport className="w-full h-full rounded-md">
                  <div className="flex flex-col space-y-2 mt-2">
                    <span className="text-sm items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Driver
                    </span>
                    <p className="mt-1 ml-4 justify-start items-center flex text-sm text-muted-foreground">
                      {meta.name}
                    </p>
                    <span className="text-sm items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Team
                    </span>
                    <p className="mt-1 ml-4 justify-start items-center flex text-sm text-muted-foreground">
                      {meta.team}
                    </p>
                    <span className="text-sm items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Drivers location
                    </span>
                    <p className="mt-1 ml-4 justify-start items-center flex text-sm text-muted-foreground">
                      {meta.origin}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 mt-2 ">
                    <span className="text-sm items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {meta.status == "Pending" ? (
                        <>Teams location</>
                      ) : (
                        <>Destination</>
                      )}
                    </span>
                    <p className="mt-1 ml-4 justify-start items-center flex text-sm text-muted-foreground">
                      {meta.destination}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 mt-2">
                    <span className="text-sm items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      E.T.A.
                    </span>
                    <p className="mt-1 ml-4 justify-start items-center flex text-sm text-muted-foreground">
                      {meta.eta ? meta.eta : etaTemp}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 mt-2">
                    <span className="text-sm items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Duration
                    </span>
                    <p className="mt-1 ml-4 justify-start items-center flex text-sm text-muted-foreground">
                      {meta.duration}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 mt-2">
                    <span className="text-sm items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Status
                    </span>
                    <p className="mt-1 ml-4 justify-start font-semibold items-center flex text-sm text-muted-foreground">
                      {meta.status}
                    </p>
                  </div>
                </ScrollArea.Viewport>
              </ScrollArea.Root>
            </div>
          </>
        ) : (
          <div className="text-lg font-medium text-foreground">
            Loading Meta data
          </div>
        )}
      </div>
    </>
  );
};
