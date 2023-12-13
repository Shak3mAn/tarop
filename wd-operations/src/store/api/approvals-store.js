import { create } from "zustand";
import axios from "axios";
import {toast } from "react-hot-toast";
import { server } from "../../lib/utils/server";

export const useApprovalsStore = create((set) => ({
  approvals: [],
  approval: {},
  fetchApprovals: async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/approval/get-approvals`
      );
      set({ approvals: response.data.approvals });
    } catch (error) {
      // console.error("Error fetching approvals:", error);
      // toast.error("Something went wrong whilst fetching approvals :-(")
    }
  },
  fetchApproval: async (approvalId) => {
    try {
      const response = await axios.get(
        `${server}/api/v1/approval/get-approval/${approvalId}`
      );
      set({ approval: response.data.approval });
    } catch (error) {
      // console.error("Error fetching approval:", error);
      // toast.error("Something went wrong whilst fetching approval :-(")
    }
  },
  addApproval: async (newApproval) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/approval/create-approval`,
        newApproval
      );
      set((state) => ({
        approvals: [...state.approvals, response.data.approval ],
      }));
    } catch (error) {
      console.error("Error adding approval:", error);
      toast.error("Submission error. Please try again");
    }
  },
  deleteApproval: async (approvalId) => {
    try {
      await axios.delete(
        `${server}/api/v1/approval/delete-approval/${approvalId}`
      );
      set((state) => ({
        approvals: state.approvals.filter(
          (approval) => approval._id !== approvalId
        ),
      }));
    } catch (error) {
      console.error("Error deleting approval:", error);
      toast.error("Deletion failed. Try again later!");
    }
  },
  deleteApprovals: async () => {
    try {
      await axios.delete(`${server}/api/v1/approval/delete-approvals`);
      set({
        approvals: [],
      });
    } catch (error) {
      console.error("Error deleting approvals:", error);
      toast.error("Deletion failed. Try again later!");
    }
  },
}));
