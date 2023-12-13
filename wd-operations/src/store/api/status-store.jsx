import { create } from "zustand";
import axios from "axios";
import { server } from "../../lib/utils/server";
import { toast } from "react-hot-toast";

export const useStatusStore = create((set) => ({
  driver: {},
  task: {},
  teamMapMeta: {},
  driverMapMeta: {},
  taskMapMeta: {},
  team: {},
  updateStatus: async (updatedStatus) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/status/update-status`,
        updatedStatus
      );
      set({ team: response.data.team });
      set({ driver: response.data.driver });
      set({ task: response.data.task });
      set({ teamMapMeta: response.data.teamMeta });
      set({ driverMapMeta: response.data.driverMeta });
      set({ taskMapMeta: response.data.taskMeta });
    } catch (error) {
      console.error("Error updating team:", error);
      toast.error(
        "Something went wrong whilst updating team's details. Please try again"
      );
    }
  },
}));
