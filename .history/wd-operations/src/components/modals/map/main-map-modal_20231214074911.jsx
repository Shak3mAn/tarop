"use client";

import { Locate, MapPin, Map, Route, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hook-form";
import { cva } from "class-variance-authority";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { addMinutes, addHours, format } from "date-fns";
import { useMediaQuery } from "react-responsive";

import {
  useMainMapModalTools,
  useMainTeamDistance,
  useMainDriverDistance,
  useMainTaskDistance,
} from "../../../store/maps/use-meta-maps";
import { useMobileMapToggle } from "../../../store/maps/use-location-picker";
import {
  useDriversMapMeta,
  useTasksMapMeta,
  useTeamsMapMeta,
} from "../../../store/api/map-meta-store";
import { useMainMapSwitcher } from "../../../store/use-general";

import { MapView } from "../../maps/modals/main-map-view";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/maps/dialog";
import { Button } from "../../ui/button";
import { switcher } from "../../../lib/utils/data";

import { cn } from "../../../lib/utils/utils";
import { Separator } from "../../ui/separator";
import MainMapSwitcher from "../../switchers/main-map-switcher";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border  border-input rounded-full bg-background hover:bg-accent hover:text-accent-foreground",
        mainOutline:
          "border opacity-75 hover:opacity-95 rounded-full border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9",
        mainIcon: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const MainMapModal = ({ className }) => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

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

  const mobileMapToggle = useMobileMapToggle();
  const routeToggle = useMainMapModalTools();
  const { isMainMap } = useMainMapSwitcher();
  const isTeamDst = useMainTeamDistance();
  const isTaskDst = useMainTaskDistance();
  const isDriverDst = useMainDriverDistance();

  const { isTeamDistance, isTaskDistance } = useMainDriverDistance();
  const isTaskDstTeam = useMainTeamDistance((state) => state.isTaskDistance);
  const isDriverDstTeam = useMainTeamDistance(
    (state) => state.isDriverDistance
  );
  const isTaskDstTask = useMainTaskDistance((state) => state.isTaskDistance);

  const { fetchTeamsMeta, teams } = useTeamsMapMeta();
  const { fetchDriversMeta, drivers } = useDriversMapMeta();
  const { fetchTasksMeta, tasks } = useTasksMapMeta();

  useEffect(() => {
    const fetchTmsDrvsTsksMeta = async () => {
      await fetchTeamsMeta();
      await fetchDriversMeta();
      await fetchTasksMeta();
    };

    fetchTmsDrvsTsksMeta();
  }, []);

  const formattedSwitchers = {
    teams,
    drivers,
    tasks,
  };

  useEffect(() => {
    if (isMainMap) {

      if (isTeamDistance && isMainMap.label === isTeamDistance.driver) {
        if (isTeamDistance.status == "Pending") {
          setMeta({
            origin: isTeamDistance.originAddress,
            destination: isTeamDistance.destinationAddress,
            duration: isTeamDistance.duration,
            distance: isTeamDistance.distance,
            status: isTeamDistance.status,
          });
        }
        if (
          isTeamDistance.status == "Ongoing" ||
          isTeamDistance.status == "Delayed" ||
          isTeamDistance.status == "Initial"
        ) {
          setMeta({
            origin: isTaskDistance?.originAddress,
            destination: isTaskDistance?.destinationAddress,
            duration: isTaskDistance?.duration,
            distance: isTaskDistance?.distance,
            status: isTaskDistance?.status,
          });
        }
      }
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
      if (isTaskDstTask && isMainMap.label === isTaskDstTask.task) {
        setMeta({
          origin: isTaskDstTask.originAddress,
          destination: isTaskDstTask.destinationAddress,
          duration: isTaskDstTask.duration,
          distance: isTaskDstTask.distance,
        });
      }
    }
  }, [isDriverDst, isTaskDst, isTeamDst]);

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

        const newTime = addMinutes(addHours(currentDate, hours), min);
        const editDate = new Date(newTime);

        const formattedTime = format(editDate, "h:mm a");
        setMeta((prevMeta) => ({ ...prevMeta, eta: formattedTime }));
        setEtaTemp(formattedTime);
      } else {
        let currentDate = new Date();

        const minutes = parseInt(meta.duration.split("minutes")[0]);

        const newTime = addMinutes(currentDate, minutes);

        const editDate = new Date(newTime);
        
        const formattedTime = format(editDate, "h:mm a");
        setMeta((prevMeta) => ({ ...prevMeta, eta: formattedTime }));
        setEtaTemp(formattedTime);
      }
    }
  }, [meta.duration, isMainMap]);

  return (
    <>
      <DialogPrimitive.Root>
        <DialogPrimitive.Trigger asChild>
          <button
            className={cn(
              buttonVariants({
                variant: "mainOutline",
                size: "mainIcon",
                className: className,
              })
            )}
          >
            <Locate className="h-4 w-4" />
          </button>
        </DialogPrimitive.Trigger>

        <DialogContent>
          <div className="flex md:grid md:grid-cols-10">
            {!isTabletMid ? (
              <>
                <div className="hidden md:flex md:col-span-6">
                  <MapView />
                </div>
                <div className="flex flex-col md:col-span-4">
                  <div className="z-[100] p-8 ml-6 bg-card rounded-tr-lg rounded-br-lg shadow-md">
                    <DialogHeader className="flex pt-2 flex-row items-center justify-between">
                      <div className="flex space-x-2">
                        <div className="h-7 w-7 rounded-full border items-center flex justify-center">
                          <Map className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                          <DialogTitle>Map</DialogTitle>
                          <DialogDescription>
                            Map Meta Information{" "}
                          </DialogDescription>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={routeToggle.onToggleRoute}
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              size: "icon",
                            })
                          )}
                        >
                          <Route className="h-4 w-4" />
                        </button>
                      </div>
                    </DialogHeader>
                    <div className="">
                      <div className="space-y-4 py-1 pb-4">
                        <div className="space-y-4">
                          <>
                            <Separator className={"h-[0.5px]"} />
                            <div className="ml-2 mt-6 pb-10">
                              <div className="flex pb-3 pt-0 items-center justify-between">
                                <div className="font-bold text-sm">
                                  Meta Data
                                </div>
                                <MainMapSwitcher items={formattedSwitchers} />
                                {/* <div className="text-sm font-semibold text-primary/50 mr-5">
                              {" "}
                              From / To
                            </div> */}
                              </div>
                              <div className="border-border border rounded-md">
                                <div className="flex flex-col pl-4 space-y-0 pb-2 pt-2">
                                  <label className="text-primary text-sm font-medium">
                                    Source :
                                  </label>
                                  <p className="ml-4 text-sm text-primary/80 ">
                                    - {meta.origin}
                                  </p>
                                </div>
                                <div className="flex flex-col pl-4 space-y-0 pb-2">
                                  <label className="text-primary font-medium text-sm">
                                    {meta.status != "Pending" ? (
                                      <>Destination :</>
                                    ) : (
                                      <>Driver</>
                                    )}
                                  </label>
                                  <p className="ml-4 text-sm text-primary/80 ">
                                    - {meta.destination}
                                  </p>
                                </div>
                                <div className="flex flex-col pl-4 space-y-0 pb-2">
                                  <label className="text-primary text-sm font-medium">
                                    Distance :
                                  </label>
                                  <p className="ml-4 text-sm text-primary/80 ">
                                    - {meta.distance}
                                  </p>
                                </div>
                                <div className="flex flex-col pl-4 space-y-0 pb-2">
                                  <label className="text-primary text-sm font-medium">
                                    Duration :
                                  </label>
                                  <p className="ml-4 text-sm text-primary/80 ">
                                    - {meta.duration}
                                  </p>
                                </div>
                                <div className="flex flex-col pl-4 space-y-0 pb-2">
                                  <label className="text-primary text-sm font-medium">
                                    E.T.A. :
                                  </label>
                                  <p className="ml-4 text-sm font-semibold w-fit px-2 py-1 rounded-lg text-primary/80 ">
                                    - {meta.eta ? meta.eta : etaTemp}
                                  </p>
                                </div>
                                {meta.status && meta.status != "status" ? (
                                  <div className="flex flex-col pl-4 space-y-0 pb-2">
                                    <label className="text-primary text-sm font-medium">
                                      Status :
                                    </label>
                                    <p className="ml-4 text-sm font-semibold w-fit px-2 py-1 rounded-lg text-primary/80 ">
                                      - {meta.status}
                                    </p>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </>

                          <div className="pt-10 space-x-2 flex items-end justify-end w-full">
                            <DialogPrimitive.Close asChild>
                              <Button disabled={loading} variant="outline">
                                Cancel
                              </Button>
                            </DialogPrimitive.Close>

                            <DialogPrimitive.Close asChild>
                              <Button disabled={loading}>Continue</Button>
                            </DialogPrimitive.Close>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {mobileMapToggle.isOpen ? (
                  <div className="flex md:hidden md:col-span-6">
                    <MapView />
                  </div>
                ) : (
                  <>
                    <div className=" relative w-full flex flex-col md:col-span-4">
                      <div className="z-[120] h-[80vh] p-8 bg-card rounded-lg shadow-md">
                        <DialogHeader className="flex pt-2 flex-row items-center justify-between">
                          <div className="flex space-x-2">
                            <div className="h-7 w-7 rounded-full border items-center flex justify-center">
                              <Map className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                              <DialogTitle>Map</DialogTitle>
                              <DialogDescription>
                                Map Meta Information{" "}
                              </DialogDescription>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <button
                              onClick={mobileMapToggle.onToggle}
                              className={cn(
                                buttonVariants({
                                  variant: "outline",
                                  size: "icon",
                                })
                              )}
                            >
                              <Smartphone className="h-4 w-4" />
                            </button>
                          </div>
                        </DialogHeader>
                        <div className="">
                          <div className="space-y-4 py-1 pb-4">
                            <div className="space-y-4">
                              <>
                                <Separator className={"h-[0.5px]"} />
                                <div className="ml-2 mt-6 pb-10">
                                  <div className="flex pb-3 pt-0 items-center justify-between">
                                    <div className="font-bold text-sm mr-2">
                                      Meta Data
                                    </div>
                                    <MainMapSwitcher
                                      items={formattedSwitchers}
                                    />
                                    {/* <div className="text-sm font-semibold text-primary/50 mr-5">
                              {" "}
                              From / To
                            </div> */}
                                  </div>
                                  <div className="border-border border rounded-md">
                                    <div className="flex flex-col pl-4 space-y-0 pb-2 pt-2">
                                      <label className="text-primary text-sm font-medium">
                                        Source :
                                      </label>
                                      <p className="ml-4 text-sm text-primary/80 ">
                                        - {meta.origin}
                                      </p>
                                    </div>
                                    <div className="flex flex-col pl-4 space-y-0 pb-2">
                                      <label className="text-primary font-medium text-sm">
                                        {meta.status != "Pending" ? (
                                          <>Destination :</>
                                        ) : (
                                          <>Driver</>
                                        )}
                                      </label>
                                      <p className="ml-4 text-sm text-primary/80 ">
                                        - {meta.destination}
                                      </p>
                                    </div>
                                    <div className="flex flex-col pl-4 space-y-0 pb-2">
                                      <label className="text-primary text-sm font-medium">
                                        Distance :
                                      </label>
                                      <p className="ml-4 text-sm text-primary/80 ">
                                        - {meta.distance}
                                      </p>
                                    </div>
                                    <div className="flex flex-col pl-4 space-y-0 pb-2">
                                      <label className="text-primary text-sm font-medium">
                                        Duration :
                                      </label>
                                      <p className="ml-4 text-sm text-primary/80 ">
                                        - {meta.duration}
                                      </p>
                                    </div>
                                    <div className="flex flex-col pl-4 space-y-0 pb-2">
                                      <label className="text-primary text-sm font-medium">
                                        E.T.A. :
                                      </label>
                                      <p className="ml-4 text-sm font-semibold w-fit px-2 py-1 rounded-lg text-primary/80 ">
                                        - {meta.eta ? meta.eta : etaTemp}
                                      </p>
                                    </div>
                                    {meta.status && meta.status != "status" ? (
                                      <div className="flex flex-col pl-4 space-y-0 pb-2">
                                        <label className="text-primary text-sm font-medium">
                                          Status :
                                        </label>
                                        <p className="ml-4 text-sm font-semibold w-fit px-2 py-1 rounded-lg text-primary/80 ">
                                          - {meta.status}
                                        </p>
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                              </>

                              <div className="pt-10 space-x-2 flex items-end bottom-6 right-10 justify-end w-full">
                                {/* <DialogPrimitive.Close asChild>
                                  <Button disabled={loading} variant="outline">
                                    Cancel
                                  </Button>
                                </DialogPrimitive.Close> */}

                                <DialogPrimitive.Close asChild>
                                  <Button disabled={loading}>Continue</Button>
                                </DialogPrimitive.Close>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </DialogPrimitive.Root>
    </>
  );
};
