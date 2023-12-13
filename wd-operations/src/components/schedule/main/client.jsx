"use client";

import { Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { StatusModal } from "../../modals/status/status"
import { DataTable } from "../../ui/data-table";
import { columns } from "./columns";
import { Heading } from "../../ui/heading";
import { BoardView } from "../board-view/board-view";
import { ViewToggle } from "./view-toggle";
import { ScheduleSeparator } from "../../ui/misc/tester-separator";
import { MainCreateTaskModal } from "../../modals/task/main-create-task-modal"

import { useScheduleToggle } from "../../../store/use-schedule-toggle";

//TODO: Add different required Paths
export const ScheduleClient = ({ data }) => {
  const scheduleToggle = useScheduleToggle();

  return (
    <>
      <div className="flex items-center pb-2 justify-between">
        <Heading
          title="Schedule"
          description="Manage different tasks in the schedule"
        />
        <div className="space-x-2 flex">
        <StatusModal />
        <MainCreateTaskModal />
        </div>
      </div>

      <ViewToggle />
      <ScheduleSeparator />
      {!scheduleToggle.isBoard == true ? (
        <>
          <DataTable searchKey="name" columns={columns} data={data} />
        </>
      ) : (
        <>
          <BoardView />
        </>
      )}
    </>
  );
};
