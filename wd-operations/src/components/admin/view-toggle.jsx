"use client";

import { HardHat, Users, CarFront } from "lucide-react";
import { useMediaQuery } from "react-responsive";

import { cn } from "../../lib/utils/utils";
import { useAdminToggle } from "../../store/use-schedule-toggle";

export const ViewToggle = () => {
  const adminToggle = useAdminToggle();
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {!isTabletMid ? (
        <div
          className={
            "grid transition-all w-[380px] duration-200 ease-in-out grid-cols-3 gap-x-3 justify-start items-center mt-2 -mb-2 cursor-pointer"
          }
        >
          <div
            className={cn(
              "flex col-span-1 space-x-1.5 items-center tracking-tighter",
              adminToggle.isTeam
                ? `text-primary text-base font-bold`
                : `text-muted-foreground/60 font-medium text-base`
            )}
            onClick={adminToggle.onTeam}
          >
            <Users className="ml-2 h-4 w-4" />
            <span>Teams</span>
          </div>
          <div
            className={cn(
              "flex col-span-1 space-x-1.5 items-center tracking-tighter",
              adminToggle.isVehicle
                ? `text-primary text-base font-bold`
                : `text-muted-foreground/60 font-medium text-base`
            )}
            onClick={adminToggle.onVehicle}
          >
            <CarFront className="h-4 w-4" />
            <span>Vehicles</span>
          </div>
          <div
            className={cn(
              "flex col-span-1 space-x-1.5 items-center tracking-tighter",
              adminToggle.isCoordinator
                ? `text-primary text-base font-bold`
                : `text-muted-foreground/60 font-medium text-base`
            )}
            onClick={adminToggle.onCoordinator}
          >
            <HardHat className="h-4 w-4" />
            <span>Coordinators</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 w-[200px] pb-1 justify-start gap-x-3 items-center mt-2 transition-all duration-200 ease-in-out cursor-pointer">
          <div
            className={cn(
              "flex col-span-1 items-center justify-around",
              adminToggle.isTeam
                ? `text-primary font-bold`
                : `text-muted-foreground/60`
            )}
            onClick={adminToggle.onTeam}
          >
            <Users className="ml-2 h-5 w-5" />
          </div>
          <div
            className={cn(
              "flex col-span-1 items-center justify-around",
              adminToggle.isVehicle
                ? `text-primary font-bold`
                : `text-muted-foreground/60`
            )}
            onClick={adminToggle.onVehicle}
          >
            <CarFront className="ml-2 h-5 w-5" />
          </div>
          <div
            className={cn(
              "flex col-span-1 items-center justify-around",
              adminToggle.isCoordinator
                ? `text-primary font-bold`
                : `text-muted-foreground/60`
            )}
            onClick={adminToggle.onCoordinator}
          >
            <HardHat className="ml-2 h-5 w-5" />
          </div>
        </div>
      )}
    </>
  );
};
