"use client";

import { cva } from "class-variance-authority";
import { useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { useTasksMapMeta } from "../../../store/api/map-meta-store";

import { BoardColumn } from "./column";
import { taskItems } from "../../../lib/utils/data";

//TODO:  Deal with the column amount setting accordingly

export const BoardView = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const [toDo, setToDo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  const{ fetchTasksMeta, taskItems} = useTasksMapMeta();

  useEffect(() => {
    const fetchTsksMeta = async () => {
   await  fetchTasksMeta(); }

   fetchTsksMeta();
  }, [])

  useEffect(() => {
    if (!taskItems) return;
    setToDo([]);
    setProgress([]);
    setCompleted([]);

    {
      taskItems.map((tasks) => {
        if (tasks.status == "Initial" || tasks.status == "Pending") {
          setToDo((prev) => [...prev, tasks]);
        }
        if (tasks.status == "Ongoing" || tasks.status == "Delayed") {
          setProgress((prev) => [...prev, tasks]);
        }
        if (tasks.status == "Completed" || tasks.status == "Failed") {
          setCompleted((prev) => [...prev, tasks]);
        }
      });
    }
  }, [taskItems]);
  return isLoaded ? (
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-2 md:flex p-4 rounded-lg justify-between h-full md:h-screen w-full md:space-x-5 mx-1 md:mx-5 md:pr-8 my-3 md:pb-5">
      <BoardColumn colName={"To Do"} taskData={toDo} />
      <BoardColumn colName={"In Progress"} taskData={progress} />
      <BoardColumn colName={"Completed"} taskData={completed} />
    </div>
  ) : (
    <>
      <div className="items-center h-screen w-full flex justify-center text-primary bg-muted-foreground/95 bg-opacity-40">
        Google Maps API has not Loaded
      </div>
    </>
  );
};
