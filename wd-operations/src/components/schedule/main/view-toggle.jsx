"use client";

import { Presentation, Plus, Table } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import * as Tooltip from "@radix-ui/react-tooltip";

import { TooltipContent } from "../../ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { cn } from "../../../lib/utils/utils";
import { useScheduleToggle } from "../../../store/use-schedule-toggle";

export const ViewToggle = () => {
  const scheduleToggle = useScheduleToggle();
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {!isTabletMid ? (
        <div
          className={
            "grid transition-all w-[265px] duration-200 ease-in-out grid-cols-2 gap-x-3 justify-start items-center mt-2 -mb-2 cursor-pointer"
          }
        >
          <div
            className={cn(
              "flex space-x-1.5 items-center justify-around tracking-tighter",
              scheduleToggle.isBoard
                ? `text-primary text-base font-bold`
                : `text-muted-foreground/60 font-medium text-base`
            )}
            onClick={scheduleToggle.onBoard}
          >
            <Presentation className="ml-2 h-4 w-4" />
            <span>Board View</span>
          </div>
          <div
            className={cn(
              "flex space-x-1.5 items-center justify-around tracking-tighter",
              !scheduleToggle.isBoard 
              ? `text-primary text-base font-bold` 
              : `text-muted-foreground/60 font-medium text-base`
            )}
            onClick={scheduleToggle.onTable}

          >
            <Table className="ml-2 h-4 w-4" />
            <span>Table View</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 w-[120px] pb-1 justify-start gap-x-3 items-center mt-2 transition-all duration-200 ease-in-out cursor-pointer">
          <div
            className={cn(
                "flex items-center justify-around",
              scheduleToggle.isBoard
                ? `text-primary font-bold`
                : `text-muted-foreground/60`
            )}
            onClick={scheduleToggle.onBoard}
          >
            <Presentation className="ml-2 h-5 w-5" />
          </div>
          <div
            className={cn(
                "flex items-center justify-around",
              !scheduleToggle.isBoard
                ? `text-primary font-bold`
                : `text-muted-foreground/60`
            )}
            onClick={scheduleToggle.onTable}
          >
            <Table className="ml-2 h-5 w-5" />
          </div>
        </div>
      )}
    </>
  );
};
