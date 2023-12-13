import { create } from "zustand";
import axios from "axios";
import { server } from "../../lib/utils/server";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  users: [],
  user: null,
  person: null,
  fetchUser: async (userData) => {
    try {
      const response = await axios.get(
        `${server}/api/v1/user/get-user`,
        { params: userData }
      );
      set({ person: response.data.user });
      set({ user: response.data.user });
    } catch (error) {
      console.error("Error fetching user:", error);
      // toast.error(
      //   "Something went wrong whilst fetching user. Please try again"
      // );
    }
  },
  fetchUsers: async () => {
    try {
      const response = await axios.get(`${server}/api/v1/user/get-users`);
      set({ users: response.data.users });
    } catch (error) {
      console.error("Error fetching users:", error);
      // toast.error(
      //   "Something went wrong whilst fetching users. Please try again"
      // );
    }
  },
  addUser: async (newUser) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/user/create-user`,
        newUser
      );
      set((state) => ({ users: [...state.users, response.data.user] }));
      toast.success("User Created!");
    } catch (error) {
      console.error("Error creating new user record:", error);
      toast.error("Something went wrong whilst creating user. Please try again");
    }
  },
  updateUser: async (userId, updatedUser) => {
    try {
      const response = await axios.put(
        `${server}/api/v1/user/updated-user/${userId}`,
        updatedUser
      );
      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? response.data.user : user
        ),
      }));
      toast.success("User Details Updated Successfully!");
    } catch (error) {
      console.error("Error updating user records:", error);
      toast.error(
        "Something went wrong whilst updating user's details. Please try again"
      );
    }
  },
  updateUserAdmin: async (userId, updatedUser) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/user/update-user-admin-status/${userId}`,
        updatedUser
      );
      set({ user: response.data.user });
    } catch (error) {
      console.error("Error updating user's admin records:", error);
      toast.error(
        "Something went wrong whilst updating user's admin details. Please try again"
      );
    }
  },
  updateUserApproval: async (userId, updatedUser) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/user/update-user-approval/${userId}`,
        updatedUser
      );
      set({ user: response.data.user });
    } catch (error) {
      console.error("Error updating user approval records:", error);
      toast.error(
        "Something went wrong whilst updating user's approval details. Please try again"
      );
    }
  },

  updateUserCongratulation: async (userId, updatedUser) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/user/update-user-congratulation/${userId}`,
        updatedUser
      );
      set({ user: response.data.user });
    } catch (error) {
      console.error("Error updating user's congratulation records:", error);
      // toast.error(
      //   "Something went wrong whilst updating user's details. Please try again"
      // );
    }
  },
  deleteUser: async (userId) => {
    try {
      await axios.delete(`${server}/api/v1/user/delete-user/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
      }));
      toast.success("User Deleted");
    } catch (error) {
      console.error("Error deleting user record:", error);
      toast.error(
        "Something went wrong whilst deleting the user. Please try again"
      );
    }
  },
  // get the user role, name & phone-no.
  getUserRole: () => {
    return useUserStore.getState().user?.role;
  },
  getUserName: () => {
    return useUserStore.getState().user?.name;
  },
  getUserPhoneNo: () => {
    return useUserStore.getState().user?.phoneNo;
  },
  getUserEmail: () => {
    return useUserStore.getState().user?.email;
  },
  getUserIsAdmin: () => {
    return useUserStore.getState().user?.isAdmin;
  }
}));
