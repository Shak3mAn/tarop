"use client";

import { useState, useEffect } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { addMinutes, addHours, format } from "date-fns";

import { useMainTeamDistance } from "../../../store/maps/use-meta-maps";
import { useMainMapSwitcher } from "../../../store/use-general";

import { Separator } from "../../ui/separator";
import MetaSwitcher from "../../switchers/MetaSwitcher";

export const Travel = ({ teams }) => {
  const [loading, setLoading] = useState(false);
  const [etaTemp, setEtaTemp] = useState("");

  const [meta, setMeta] = useState({
    origin: "origin",
    destination: "destination",
    duration: "duration",
    distance: "distance",
    eta: "E.T.A.",
    status: "status",
  });

  const { isMainMap } = useMainMapSwitcher();
  const isTeamDst = useMainTeamDistance();

  const isTaskDstTeam = useMainTeamDistance((state) => state.isTaskDistance);
  const isDriverDstTeam = useMainTeamDistance(
    (state) => state.isDriverDistance
  );

  useEffect(() => {
    if (isMainMap) {

      if (isTaskDstTeam && isMainMap.label === isTaskDstTeam.team) {
        if (
          isTaskDstTeam.status == "Ongoing" ||
          isTaskDstTeam.status == "Delayed" ||
          isTaskDstTeam.status == "Initial"
        ) {
          setMeta({
            origin: isTaskDstTeam.originAddress,
            destination: isTaskDstTeam.destinationAddress,
            duration: isTaskDstTeam.duration,
            distance: isTaskDstTeam.distance,
            status: isTaskDstTeam.status,
          });
        }
        if (isTaskDstTeam.status == "Pending") {
          setMeta({
            origin: isDriverDstTeam?.originAddress,
            destination: isDriverDstTeam?.destinationAddress,
            duration: isDriverDstTeam?.duration,
            distance: isDriverDstTeam?.distance,
            status: isDriverDstTeam?.status,
          });
        }
      }
    }
    // console.log("What about Meta:", meta);
  }, [isTeamDst]);

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
  }, [meta.duration, isMainMap]);

  return (
    <>
      <div className="flex flex-col space-y-1.5 justify-center items-left pt-3 pb-2">
        <h3 className="text-card-foreground text-base font-semibold tracking-tight mr-4">
          Team
        </h3>
        <MetaSwitcher items={teams} />
      </div>

      <Separator className="h-[0.5px]" />

      {/* Team Metadata */}
      <div className="flex px-4 -mt-2 mb-3">
        {!loading ? (
          <>
            <div>
              <h3 className="">{meta.name}</h3>
              <ScrollArea.Root className="w-full h-auto overflow-hidden px-1 py-1">
                <ScrollArea.Viewport className="w-full h-full rounded-md">
                  <div className="flex flex-col space-y-2 mt-2">
                    <span className="text-sm items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Teams location
                    </span>
                    <p className="mt-1 ml-4 justify-start items-center flex text-sm text-muted-foreground">
                      {meta.origin}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 mt-2 ">
                    <span className="text-sm items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {meta.status == "Pending" ? (<>Drivers location</>) : (<>Destination</>)}
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
