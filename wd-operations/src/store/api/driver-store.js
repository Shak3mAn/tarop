import { create } from "zustand";
import axios from "axios";
import { server } from "../../lib/utils/server";
import { toast } from "react-hot-toast";

export const useDriverStore = create((set) => ({
  drivers: [],
  driverMapMeta: {},
  taskMapMeta: {},
  teamMapMeta: {},
  driver: {},
  driversName: [],
  driversInfo: [],
  fetchDrivers: async () => {
    try {
      const response = await axios.get(`${server}/api/v1/driver/get-drivers`);
      set({ drivers: response.data.drivers });
      set({
        driversName: response.data.drivers.map((driver) => ({
          id: driver._id,
          name: driver.driver,
        })),
      });
      set({
        driversInfo: response.data.drivers.map((driver) => ({
          driverId: driver._id,
          driver: driver.driver,
          lat: driver.setLocation?.lat,
          lng: driver.setLocation?.lng
        })),
      });
    } catch (error) {
      // console.error("Error fetching drivers:", error);
      // toast.error(
      //   "Something went wrong whilst fetching drivers. Please try again"
      // );
    }
  },
  fetchDriver: async (driverId) => {
    try {
      const response = await axios.get(
        `${server}/api/v1/driver/get-driver/${driverId}`
      );
      set({ driver: response.data.driver });
    } catch (error) {
      // console.error("Error fetching driver:", error);
      // toast.error(
      //   "Something went wrong whilst fetching driver. Please try again"
      // );
    }
  },
  addDriver: async (newDriver) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/driver/create-driver`,
        newDriver
      );
      set((state) => ({ drivers: [...state.drivers, response.data.saveDrv] }));
      set({
        driverMapMeta: response.data.saveDrvMM,
      });
      toast.success("Driver Created!");
    } catch (error) {
      console.error("Error adding driver:", error);
      toast.error(
        "Something went wrong whilst adding driver. Please try again"
      );
    }
  },
  updateDriver: async (driverId, updatedDriver) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/driver/update-driver/${driverId}`,
        updatedDriver
      );
      set((state) => ({
        drivers: state.drivers.map((driver) =>
          driver._id === driverId ? response.data.driver : driver
        ),
      }));
      set({ driverMapMeta: response.data.driverMeta });
      set({ taskMapMeta: response.data.taskMeta });
      set({ teamMapMeta: response.data.teamMeta });
      toast.success("Driver Details Updated Successfully!");
    } catch (error) {
      console.error("Error updating driver:", error);
      toast.error(
        "Something went wrong whilst updating driver details. Please try again"
      );
    }
  },

  // Update driver location
  updateDriverLocation: async (email, setLocation) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/driver/update-driver-location`,
        { email, setLocation }
      );
      set((state) => ({
        drivers: state.drivers.map((driver) =>
          driver.email === email ? response.data.driverL : driver
        ),
      }));
      set({ driverMapMeta: response.data.driverMl });
      set({ taskMapMeta: response.data.taskML });
      set({ teamMapMeta: response.data.teamML });
    } catch (error) {
      console.error("Error updating driver location:", error);
    //   toast.error(
    //     "Something went wrong whilst updating driver's location. Please try again"
    //   );
    }
  },

  deleteDriver: async (driverId) => {
    try {
      await axios.delete(`${server}/api/v1/driver/delete-driver/${driverId}`);
      set((state) => ({
        drivers: state.drivers.filter((driver) => driver._id !== driverId),
      }));
      // set({
      //   driverMapMeta: state.drivers.filter(
      //     (driver) => driver._id === driverId
      //   ),
      // });
      toast.success("Driver Deleted");
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast.error(
        "Something went wrong while deleting the driver. Please try again"
      );
    }
  },
}));
