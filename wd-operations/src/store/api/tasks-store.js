import { create } from "zustand";
import axios from "axios";
import { server } from "../../lib/utils/server";
import { toast } from "react-hot-toast";

export const useTaskStore = create((set) => ({
  tasks: [],
  taskStatus: [],
  taskMapMeta: {},
  teamMapMeta: {},
  driverMapMeta: {},
  task: {},
  fetchTasks: async () => {
    try {
      const response = await axios.get(`${server}/api/v1/task/get-tasks`);
      set({ tasks: response.data.tasks });
      set({
        taskStatus: response.data.tasks.map((task) => ({
          taskId: task._id,
          name: task.name,
        }))
      })
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // toast.error(
      //   "Something went wrong whilst fetching tasks. Please try again"
      // );
    }
  },
  fetchTask: async (id) => {
    try {
      const response = await axios.get(`${server}/api/v1/task/get-task/${id}`);
      set({ task: response.data.task });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // toast.error(
      //   "Something went wrong whilst fetching task. Please try again"
      // );
    }
  },
  addTask: async (newTask, teamLocation, driverLocation) => {
    try {
      const response = await axios.post(`${server}/api/v1/task/create-task`, {
        ...newTask,
        teamLocation: teamLocation,
        driverLocation: driverLocation,
      });
      set((state) => ({ tasks: [...state.tasks, response.data.saveTsk] }));
      set({
        taskMapMeta: response.data.saveTskMM,
      });
      set({
        teamMapMeta: response.data.saveTmMM,
      });
      set({
        driverMapMeta: response.data.saveDrvMM,
      });
      toast.success("Task Created!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Something went wrong whilst adding task. Please try again");
    }
  },
  updateTask: async (taskId, updatedTask, teamLocation, driverLocation) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/task/update-task/${taskId}`,
        {
          ...updatedTask,
          teamLocation: teamLocation,
          driverLocation: driverLocation,
        }
      );
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === taskId ? response.data.task : task
        ),
      }));
      set({ taskMapMeta: response.data.taskMapMeta });
      set({
        teamMapMeta: response.data.teamMeta,
      });
      set({
        driverMapMeta: response.data.driverMeta,
      });
      toast.success("Task Updated!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error(
        "Something went wrong whilst updating task. Please try again"
      );
    }
  },
  deleteTask: async (taskId) => {
    try {
      await axios.delete(`${server}/api/v1/task/delete-task/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== taskId),
      }));
      // set((state) => ({
      //   taskMapMeta: state.tasks.filter((task) => task._id === taskId),
      // }));
      toast.success("Task Deleted!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(
        "Something went wrong whilst deleting the task. Please try again"
      );
    }
  },
}));
