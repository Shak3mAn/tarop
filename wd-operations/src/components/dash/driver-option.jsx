"use client";

import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";

import { DriverDashView } from "../maps/dash/driver-dash-map-view";
import { DriversMeta } from "./driver-meta";

export const DriverOptionClient = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Dashboard"
            description="Current Schedule, Metadata on Personnel & Segment of Map Area"
          />
        </div>
        <Separator />

        <div className="flex flex-col gap-y-4 md:grid md:gap-4 md:grid-cols-10 h-auto">
          <div className="p-3 col-span-3">
            {/* Meta Team */}
            <DriversMeta />
          </div>
          <div className="py-3 col-span-7">
            {/* MapView */}
            <DriverDashView />
          </div>
        </div>
      </div>
    </div>
  );
};
