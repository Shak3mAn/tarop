"use client";

import { Navigation, Route } from "lucide-react";
import { cva } from "class-variance-authority";

import { useDashMapModalTools } from "../../../store/maps/use-meta-maps";
import { useDriverMode } from "../../../store/use-general";

import { DriverDashMapModal } from "../../modals/map/driver-map-modal";

import { cn } from "../../../lib/utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border opacity-75 hover:opacity-95 border-input rounded-full bg-background hover:bg-accent hover:text-accent-foreground",
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

export const DriverDashTools = () => {
  const routeToggle = useDashMapModalTools();
  const { onToggleNavigate } = useDriverMode();

  return (
    <div className="flex absolute z-[50] flex-col bg-transparent space-y-1.5 transition-all ease-in-out duration-300">
      <div
        className={cn(
          "bg-card p-1 rounded-xl shadow-md items-center space-x-3 w-[119px] justify-start flex transition-all duration-150 ease-in-out hover:scale-110 hover:ml-2 hover:mt-1"
        )}
      >
        <div className="flex items-center justify-center">
          <button
            onClick={routeToggle.onToggleRoute}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "icon",
                className:
                  "transition-all ease-in-out duration-200 hover:scale-110 active:scale-90",
              })
            )}
          >
            <Route className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => onToggleNavigate()}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "icon",
                className:
                  "transition-all ease-in-out duration-200 hover:scale-110 active:scale-90",
              })
            )}
          >
            <Navigation className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <DriverDashMapModal className="transition-all ease-in-out duration-200 hover:scale-110 active:scale-90"  />
        </div>
      </div>
    </div>
  );
};
