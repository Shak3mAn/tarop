import { create } from "zustand";
import axios from "axios";
import { server } from "../../lib/utils/server";
import { toast } from "react-hot-toast";

export const useTempUserStore = create((set) => ({
  tempUsers: [],
  tempUser: null,
  fetchTempUser: async (tempUserData) => {
    try {
      const response = await axios.get(
        `${server}/api/v1/temp-user/get-temp-user`,
        {
            params: tempUserData,
          }  
           );
      set({ tempUser: response.data.tempUser });
    } catch (error) {
      console.error("Error fetching tempUser:", error);
      // toast.error(
      //   "Something went wrong whilst fetching tempUser. Please try again"
      // );
    }
  },
  fetchTempUsers: async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/temp-user/get-temp-users`
      );
      set({ tempUsers: response.data.tempUsers });
    } catch (error) {
      console.error("Error fetching tempUsers:", error);
      // toast.error(
      //   "Something went wrong whilst fetching tempUsers. Please try again"
      // );
    }
  },
  addTempUser: async (newTempUser) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/temp-user/create-temp-user`,
        newTempUser
      );
      set((state) => ({
        tempUsers: [...state.tempUsers, response.data.tempUser],
      }));
    } catch (error) {
      console.error("Error creating new tempUser record:", error);
      // toast.error(
      //   "Something went wrong whilst creating tempUser. Please try again"
      // );
    }
  },
  updateTempUserApproval: async (tempUserId, updatedTempUser) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/temp-user/update-temp-user-approval/${tempUserId}`,
        updatedTempUser
      );
      set({ tempUser: response.data.tempUser });
    } catch (error) {
      console.error("Error updating tempUser's approval records:", error);
      // toast.error(
      //   "Something went wrong whilst updating tempUser's approval details. Please try again"
      // );
    }
  },
  updateTempUserCongratulation: async (tempUserId, updatedTempUser) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/temp-user/update-temp-user-congratulation/${tempUserId}`,
        updatedTempUser
      );
      set({ tempUser: response.data.tempUser });
    } catch (error) {
      console.error("Error updating tempUser's congratulation records:", error);
      // toast.error(
      //   "Something went wrong whilst updating tempUser's details. Please try again"
      // );
    }
  },
  deleteTempUser: async (tempUserId) => {
    try {
      await axios.delete(
        `${server}/api/v1/temp-user/delete-temp-user/${tempUserId}`
      );
      set((state) => ({
        tempUser: state.tempUsers.filter(
          (tempUser) => tempUser._id !== tempUserId
        ),
      }));
    //   toast.success("Temp User Deleted");
    } catch (error) {
      console.error("Error deleting tempUser record:", error);
      // toast.error(
      //   "Something went wrong whilst deleting the tempUser. Please try again"
      // );
    }
  },
}));
