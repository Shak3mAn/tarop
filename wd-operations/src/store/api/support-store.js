import { create } from "zustand";
import axios from "axios";
import { server } from "../../lib/utils/server";
import { toast } from "react-hot-toast";

export const useSupportStore = create((set) => ({
  supports: [],
  support: {},
  supportCoordinators: [],
  fetchSupports: async () => {
    try {
      const response = await axios.get(`${server}/api/v1/support/get-supports`);
      set({ supports: response.data.supports });
      set({
        supportCoordinators: response.data.supports.map((support) => ({
          id: support._id,
          name: support.fullName,
        })),
      });
    } catch (error) {
      // console.error("Error fetching supports:", error);
      // toast.error(
      //   "Something went wrong whilst fetching supports. Please try again"
      // );
    }
  },
  fetchSupport: async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/support/get-support/${id}`
      );
      set({ support: response.data.support });
    } catch (error) {
      // console.error("Error fetching support:", error);
      // toast.error(
      //   "Something went wrong whilst fetching support. Please try again"
      // );
    }
  },
  addSupport: async (newSupport) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/support/create-support`,
        newSupport
      );
      set((state) => ({
        supports: [...state.supports, response.data.support],
      }));
      toast.success("Support Coordinator Created!");
    } catch (error) {
      console.error("Error adding support:", error);
      toast.error(
        "Something went wrong whilst adding support. Please try again"
      );
    }
  },
  updateSupport: async (supportId, updatedSupport) => {
    try {
      const response = await axios.put(
        `${server}/api/v1/support/update-support/${supportId}`,
        updatedSupport
      );
      set((state) => ({
        supports: state.supports.map((support) =>
          support._id === supportId ? response.data.support : support
        ),
      }));
      toast.success("Support Details Updated Successfully!");
    } catch (error) {
      console.error("Error updating support:", error);
      toast.error(
        "Something went wrong whilst updating support details. Please try again"
      );
    }
  },
  deleteSupport: async (supportId) => {
    try {
      await axios.delete(
        `${server}/api/v1/support/delete-support/${supportId}`
      );
      set((state) => ({
        supports: state.supports.filter((support) => support._id !== supportId),
      }));
      toast.success("Driver Deleted");
    } catch (error) {
      console.error("Error deleting support:", error);
      toast.error(
        "Something went wrong whilst deleting the support. Please try again"
      );
    }
  },
}));
