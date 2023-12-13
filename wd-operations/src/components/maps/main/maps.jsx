"use client";

import { Heading } from "../../ui/heading";
import { Separator } from "../../ui/separator";
import { MapView } from "./MapView";
import { Meta } from "../meta/meta";
import { TeamLists } from "../teams/TeamLists";

//TODO: Add a different priority tracking card that provide a comprehensive overview of the current state of the drivers. In other words it changes with the status.

export const MapClient = () => {

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Maps"
          description="Track and Manage Vehicle Movements"
        />
      </div>
      <Separator />
      <div className="flex flex-col space-y-4 md:grid md:gap-4 md:grid-cols-10 h-auto ">
        <div className="p-3 col-span-3">
          {/* Meta Team */}
          <Meta />
        </div>
        <div className="py-3 space-y-4 col-span-7">
          <MapView />

          {/* Team list & Driver List */}
          <div className="py-3 mx-2">
            <TeamLists />
          </div>
        </div>
      </div>
    </>
  );
};
