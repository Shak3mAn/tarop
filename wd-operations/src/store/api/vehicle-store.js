import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import { server } from "../../lib/utils/server";

export const useVehicleStore = create((set) => ({
  vehicles: [],
  vehicle: {},
  vehicleName: [],
  vehicleMake: [],
  fetchVehicles: async () => {
    try {
      const response = await axios.get(`${server}/api/v1/vehicle/get-vehicles`);
      set({ vehicles: response.data.vehicles });
      set({
        vehicleName: response.data.vehicles.map((vehicle) => ({
          id: vehicle._id,
          name: vehicle.vehicle,
        })),
      });
      set({
        vehicleMake: response.data.vehicles.map((vehicle) => ({
          id: vehicle._id,
          name: vehicle.vehicleMake,
        })),
      });
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      // toast.error(
      //   "Something went wrong whilst fetching vehicles. Please try again"
      // );
    }
  },
  fetchVehicle: async (id) => {
    try {
      const response = await axios.get(
        `${server}/api/v1/vehicle/get-vehicle/${id}`
      );
      set({ vehicle: response.data.vehicle });
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      // toast.error(
      //   "Something went wrong whilst fetching vehicle. Please try again"
      // );
    }
  },
  addVehicle: async (newVehicle) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/vehicle/create-vehicle`,
        newVehicle
      );
      set((state) => ({
        vehicles: [...state.vehicles, response.data.vehicle],
      }));
      toast.success("Vehicle Created!");
    } catch (error) {
      console.error("Error adding vehicle:", error);
      if (error.response && error.response.status === 409) {
        // Handle conflict (vehicle with the same name already exists)
        toast.error("Vehicle with the same name already exists!");
      } else {
        // Handle other errors
        toast.error(
          "Something went wrong whilst creating a Vehicle. Please try again"
        );
      }
    }
  },
  updateVehicle: async (vehicleId, updatedVehicle) => {
    try {
      const response = await axios.put(
        `${server}/api/v1/vehicle/update-vehicle/${vehicleId}`,
        updatedVehicle
      );
      set((state) => ({
        vehicles: state.vehicles.map((vehicle) =>
          vehicle._id === vehicleId ? response.data.vehicle : vehicle
        ),
      }));
      toast.success("Vehicle Details Updated Successfully!");
    } catch (error) {
      console.error("Error updating vehicle:", error);
      toast.error(
        "Something went wrong whilst updating vehicle's details. Please try again"
      );
    }
  },
  deleteVehicle: async (vehicleId) => {
    try {
      await axios.delete(
        `${server}/api/v1/vehicle/delete-vehicle/${vehicleId}`
      );
      set((state) => ({
        vehicles: state.vehicles.filter((vehicle) => vehicle._id !== vehicleId),
      }));
      toast.success("Vehicle Deleted");
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast.error(
        "Something went wrong whilst deleting the vehicle. Please try again"
      );
    }
  },
  // get the vehicle 
}));
