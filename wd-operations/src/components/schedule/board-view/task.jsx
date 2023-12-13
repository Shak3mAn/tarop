"use client";

import React, { useEffect, useState } from "react";
import { Edit, LayoutList } from "lucide-react";
import { parseISO, format } from "date-fns";
import { cva } from "class-variance-authority";

import { Progress } from "../../ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { cn } from "../../../lib/utils/utils";
// import { EditTaskModal } from "../../modals/task/edit-task-modal";
import { useSidebarToggle } from "../../../store/use-sidebar-toggle";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input border-hidden bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-7 w-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const TaskItem = ({ taskItems }) => {
  const sidebarToggle = useSidebarToggle();
  const [meta, setMeta] = useState({
    distanceSrcDest: 100,
    distanceTmDest: 0,
    status: "status",
    startTime: "startTime",
    endTime: "endTime",
  });

  const [teamCoord, setTeamCoord] = useState({
    lat: 0,
    lng: 0,
  });
  const [teamCoordTemp, setTeamCoordTemp] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const startTimeStr = taskItems?.startTime;
    const endTimeStr = taskItems?.endTime;

    let startTStr = "";
    let endTStr = "";

    if (startTimeStr) {
      const startTimeObt = parseISO(startTimeStr);
      const endTimeObt = parseISO(endTimeStr);

      const startT = format(startTimeObt, "HH:mm");
      const endT = format(endTimeObt, "HH:mm");

      startTStr = startT;
      endTStr = endT;
    }
    setMeta({
      startTime: startTStr,
      endTime: endTStr,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTeamCoord({
        lat: taskItems.teamDstn?.lat,
        lng: taskItems.teamDstn?.lng,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [taskItems?.teamDstn]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        teamCoord.lat !== teamCoordTemp.lat ||
        teamCoord.lng !== teamCoordTemp.lng
      ) {
        if (
          taskItems?.status === "Ongoing" ||
          taskItems?.status === "Delayed"
        ) {
          distanceMatrixTeam();
        }
      }
    }, 20000);

    return () => clearInterval(intervalId);
  }, [teamCoord, teamCoordTemp, taskItems?.status]);

  useEffect(() => {
    if (taskItems?.status === "Ongoing" || taskItems?.status === "Delayed") {
      distanceMatrixSrc();
    }
  }, [taskItems?.status]);

  useEffect(() => {
    if (taskItems?.status === "Pending" || taskItems?.status === "Initial") {
      setMeta((prevState) => ({
        ...prevState,
        distanceSrcDest: 100,
        distanceTmDest: 0,
        status: taskItems?.status,
      }));
    }
    if (
      (taskItems?.status === "Ongoing" || taskItems?.status === "Delayed") &&
      teamCoord.lat &&
      teamCoord.lng
    ) {
      distanceMatrixTeam();
    }
    if (taskItems?.status === "Completed" || taskItems?.status === "Failed") {
      setMeta((prevState) => ({
        ...prevState,
        distanceSrcDest: 100,
        distanceTmDest: 100,
        status: taskItems?.status,
      }));
    }
  }, [taskItems?.status, teamCoord.lng]);

  const distanceMatrixSrc = () => {
    const DistanceMatrixService = new google.maps.DistanceMatrixService();

    DistanceMatrixService.getDistanceMatrix(
      {
        origins: [{ lat: taskItems?.source.lat, lng: taskItems.source?.lng }],
        destinations: [
          { lat: taskItems.destination?.lat, lng: taskItems.destination?.lng },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          setMeta((prev) => ({
            ...prev,
            distanceSrcDest: parseFloat(
              result.rows[0].elements[0].distance.text
            ),
          }));
        } else {
          console.error("ERROR: `DistanceMatrixService` route error!");
        }
      }
    );
  };

  const distanceMatrixTeam = () => {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [{ lat: teamCoord.lat, lng: teamCoord.lng }],
        destinations: [
          { lat: taskItems.destination?.lat, lng: taskItems.destination?.lng },
        ],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
         
          setMeta((prev) => ({
            ...prev,
            distanceTmDest: parseFloat(
              result.rows[0].elements[0].distance.text
            ),
            status: taskItems?.status,
          }));
          setTeamCoordTemp({
            lat: teamCoord.lat,
            lng: teamCoord.lng,
          });
        } else {
          console.error("ERROR: `DistanceMatrixService` route error!");
        }
      }
    );
  };

  return (
    <>
      <Card
        className={cn(
          "shadow-sm min-w-[235px] w-auto sm:min-w-[240px]  md:min-w-[200px] hover:bg-primary/5 cursor-grab  p-2",
          sidebarToggle.isOpen ? `md:w-[275px]` : `md:w-[325px]`
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-1.5 p-1">
          <div className="space-y-0">
            <CardTitle className="text-base font-semibold">
              {taskItems?.task}
            </CardTitle>
            <CardDescription className="text-xs">
              {taskItems?.team}
            </CardDescription>
          </div>
          <button
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "icon",
              })
            )}
          >
            <Edit className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="p-1">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <div className="justify-start items-center mt-2 flex flex-row space-x-2 col-span-1">
              <LayoutList className="h-3 w-3 text-muted-foreground" />
              <span className="flex text-xs text-muted-foreground">
                Progress
              </span>
            </div>
            <div className="justify-end items-center mt-2 flex col-span-1">
              <span className="text-xs items-left justify-left font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {parseInt((meta.distanceTmDest / meta.distanceSrcDest) * 100)}%
                {/* {meta.distanceSrcDest} & {meta.distanceTmDest} */}
              </span>
            </div>
            <div className="flex col-span-2 py-1 mb-2">
              {(meta.status === "Completed" || meta.status === "Failed") && (
                <Progress className="h-2" value={100} />
              )}
              {(meta.status === "Ongoing" || meta.status === "Delayed") && (
                <Progress
                  className="h-2"
                  value={
                    meta.distanceTmDest > meta.distanceSrcDest
                      ? (meta.distanceSrcDest / meta.distanceTmDest) * 100
                      : (meta.distanceTmDest / meta.distanceSrcDest) * 100
                  }
                />
              )}
              {(meta.status === "Initial" || meta.status === "Pending") && (
                <Progress className="h-2" value={0} />
              )}
            </div>
            <div className="flex col-span-1">
              <span className="justify-start rounded-full bg-primary/5 items-center flex text-xs p-2 text-muted-foreground">
                {meta?.startTime} - {meta?.endTime}
              </span>
            </div>
            <div className="flex justify-end items-center col-span-1">
              <span className="justify-start rounded-full bg-primary/5 items-center flex text-xs font-semibold p-2 text-muted-foreground">
                {meta.status}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
