import { create } from "zustand";
import axios from "axios";
import { server } from "../../lib/utils/server";
import { toast } from "react-hot-toast"

export const useEventStore = create((set) => ({
  events: [],
  event: {},
  fetchEvents: async () => {
    try {
      const response = await axios.get(`${server}/api/v1/event/get-events`);
      set({ events: response.data.events });
    } catch (error) {
      console.error("Error fetching events:", error);
      // toast.error("Something went wrong whilst fetching events")
    }
  },
  fetchEvent: async (eventId) => {
    try {
      const response = await axios.get(
        `${server}/api/v1/event/get-event/${eventId}`
      );
      set({ event: response.data.event });
    } catch (error) {
      console.error("Error fetching event:", error);
      // toast.error("Something went wrong whilst fetching event")

    }
  },
  addEvent: async (newEvent) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/event/create-event`,
        newEvent
      );
      set((state) => ({ events: [...state.events, response.data.event ] }));
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Event creation error. Please try again");
    }
  },
  deleteEvent: async (eventId) => {
    try {
      await axios.delete(`${server}/api/v1/event/delete-event/${eventId}`);
      set((state) => ({
        events: state.events.filter((event) => event._id !== eventId),
      }));
      toast.success("Successfully deleted event")
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Deletion failed. Try again later!");
    }
  },
  deleteEvents: async () => {
    try {
      await axios.delete(`${server}/api/v1/events/deleted-events`);
      set({
        events: [],
      });
      toast.success("Successfully deleted events")
    } catch (error) {
      console.error("Error deleting events:", error);
      // toast.error("Deletion failed. Try again later!");
    }
  },
}));
