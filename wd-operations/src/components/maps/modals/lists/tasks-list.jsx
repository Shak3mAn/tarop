"use client";

import React from "react";

import { TaskItem } from "./task-item";

export const TasksList = ({ tasks }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <div key={index}>
          <TaskItem task={task} />
        </div>
      ))}
    </>
  );
};
