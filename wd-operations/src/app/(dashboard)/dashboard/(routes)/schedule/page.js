"use client";

import { useEffect } from "react";
import { ScheduleClient } from "../../../../../components/schedule/main/client";
import { useTaskStore } from "../../../../../store/api/tasks-store";

//NOTE: Status; INITIAL, PENDING, COMPLETED, ONGOING, DELAYED, FAILED

const SchedulePage = () => {
  const { fetchTasks, tasks } = useTaskStore();

  useEffect(() => {
    const fetchTsks = async () => {
      await fetchTasks();
    };

    fetchTsks();
  }, []);

  const formattedSchedule = tasks.map((item) => ({
    id: item._id,
    name: item.name,
    shortDescription: item.shortDescription,
    longDescription: item.longDescription,
    team: item.team,
    startTime: new Date(item.startTime).toLocaleTimeString(),
    endTime: new Date(item.endTime).toLocaleTimeString(),
    eta: item.eta,
    status: item.status,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ScheduleClient data={formattedSchedule} />
      </div>
    </div>
  );
};

export default SchedulePage;
