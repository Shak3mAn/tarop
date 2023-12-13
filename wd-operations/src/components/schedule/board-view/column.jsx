"use client";

import { useState, useEffect, useRef } from "react";
import { cva } from "class-variance-authority";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { LayoutList, Plus } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

import { CreateTaskModal } from "../../modals/task/create-task-modal";
import { TooltipContent } from "../../ui/tooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "../../ui/card";
import { TaskItem } from "./task";
import { useSidebarToggle } from "../../../store/use-sidebar-toggle";

import { cn } from "../../../lib/utils/utils";

export const BoardColumn = ({ taskData, colName }) => {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];

  const sidebarToggle = useSidebarToggle();
  const elementRef = useRef(null);

  const [color, setColor] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!taskData) return;

    // setTasks([]);

    setTasks(taskData);
  }, [taskData]);

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedTasks = [...tasks];

      const taskSourceIndex = source.index;
      const taskDestinationIndex = destination.index;

      const [removedTask] = reorderedTasks.splice(taskSourceIndex, 1);
      reorderedTasks.splice(taskDestinationIndex, 0, removedTask);

      return setTasks(reorderedTasks);
    }

    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const taskSourceIndex = tasks.findIndex(
      (task) => task.id === source.droppableId
    );
    const taskDestinationIndex = tasks.findIndex(
      (task) => task.id === destination.droppableId
    );

    const newSourceItems = [...tasks[taskSourceIndex].task];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...tasks[taskDestinationIndex].task]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newTasks = [...tasks];

    newTasks[taskSourceIndex] = {
      ...tasks[taskSourceIndex],
      task: newSourceItems,
    };
    newTasks[taskDestinationIndex] = {
      ...tasks[taskDestinationIndex],
      task: newDestinationItems,
    };

    setTasks(newTasks);
  };

  return (
    <Card
      className={cn(
        `justify-center items-center shadow-sm min-w-[280px] sm:w-[280px] h-auto pt-4 pb-7 transition-all ease-in-out duration-500 pl-2 pr-2`,
        sidebarToggle.isOpen ? `md:w-[345px]` : `md:w-[414px]`
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-1 mx-2">
        <div className="flex-col space-x-2">
          <CardDescription className="text-sm font-semibold">
            ({tasks.length}) {colName}
            {/* {tasks.map((task) => (
              <div>{task.team}</div>
            ))} */}
          </CardDescription>
        </div>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <CreateTaskModal />
          </Tooltip.Trigger>
          <TooltipContent>
            Add new task
            <Tooltip.Arrow className="fill-white" />
          </TooltipContent>
        </Tooltip.Root>
      </CardHeader>
      <CardContent className="p-3 flex justify-center items-center">
        <>
          <DragDropContext onDragEnd={handleDragAndDrop}>
            <Droppable droppableId="task-list" type="group">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div
                    className="grid grid-cols-1 gap-y-3 md:flex md:flex-col md:space-y-3 md:h-[720px] md:overflow-y-auto scrollbar-hide"
                    ref={elementRef}
                  >
                    {tasks.map((task, index) => (
                      <Draggable
                        draggableId={task.task}
                        index={index}
                        key={task.id}
                      >
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            {task && <TaskItem taskItems={task} />}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      </CardContent>
    </Card>
  );
};
