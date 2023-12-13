import { create } from "zustand";
import axios from "axios";
import { server } from "../../lib/utils/server";
import { toast } from "react-hot-toast"

export const useNotificationStore = create((set) => ({
  notifications: [],
  notification: {},
  fetchNotifications: async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/notification/get-notifications`
      );
      set({ notifications: response.data.notifications });
    } catch (error) {
      // console.error("Error fetching notifications:", error);
      // toast.error("Something went wrong whilst fetching notifications")
    }
  },
  fetchNotification: async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/notification/get-notification/${id}`
      );
      set({ notification: response.data.notification });
    } catch (error) {
      // console.error("Error fetching notification:", error);
      // toast.error("Something went wrong whilst fetching notification")
    }
  },
  addNotification: async (newNotification) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/notification/create-notification`,
        newNotification
      );
      set((state) => ({
        notifications: [...state.notifications, response.data.notification ],
      }));
    } catch (error) {
      console.error("Error adding notification:", error);
      toast.error("Something went wrong whilst creating a notification");
    }
  },
  deleteNotification: async (notificationId) => {
    try {
      await axios.delete(
        `${server}/api/v1/notification/delete-notification/${notificationId}`
      );
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification._id !== notificationId
        ),
      }));
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Deletion failed. Try again later!");
    }
  },
  deleteNotifications: async () => {
    try {
      await axios.delete(`${server}/api/v1/notification/delete-notifications`);
      set({
        notifications: [],
      });
    } catch (error) {
      console.error("Error deleting notifications:", error);
      toast.error("Deletion failed. Try again later!");
    }
  },
}));
