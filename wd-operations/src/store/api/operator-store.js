import { create } from "zustand";
import axios from "axios";
import { server } from "../../lib/utils/server";
import { toast } from "react-hot-toast";

export const useOperatorStore = create((set) => ({
  operators: [],
  operator: {},
  operationCoordinators: [],
  fetchOperators: async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/operator/get-operators`
      );
      set({ operators: response.data.operators });
      set({
        operationCoordinators: response.data.operators.map((operator) => ({
          id: operator._id,
          name: operator.fullName,
        })),
      });
    } catch (error) {
      // console.error("Error fetching operators:", error);
      // toast.error("Something went wrong whilst fetching operators. Please try again")
    }
  },
  fetchOperator: async (id) => {
    try {
      const response = await axios.get(
        `${server}/api/v1/operator/get-operator/${id}`
      );
      set({ operator: response.data.operator });
    } catch (error) {
      // console.error("Error fetching operator:", error);
      // toast.error("Something went wrong whilst fetching operator. Please try again")
    }
  },
  addOperator: async (newOperator) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/operator/create-operator`,
        newOperator
      );
      set((state) => ({ operators: [ ...state.operators, response.data.operator ] }));
      toast.success("Operator Created!")
    } catch (error) {
      console.error("Error adding operator:", error);
      toast.error("Something went wrong whilst adding operator. Please try again")
    }
  },
  updateOperator: async (operatorId, updatedOperator) => {
    try {
      const response = await axios.put(
        `${server}/api/v1/operator/update-operator/${operatorId}`,
        updatedOperator
      );
      set((state) => ({
        operators: state.operators.map((operator) =>
          operator._id === operatorId ? response.data.operator : operator
        ),
      }));
      toast.success("Operator Details Updated Successfully!")
    } catch (error) {
      console.error("Error updating operator:", error);
      toast.error("Something went wrong whilst updating operator details. Please try again")
    }
  },

  // Update Operator location
  updateOperatorLocation: async (email, setLocation) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/operator/update-operator-location`,
        { email, setLocation }
      );
      set((state) => ({
        operators: state.operators.map((operator) =>
          operator.email === email ? response.data.operator : operator
        ),
      }));
    } catch (error) {
      // console.error("Error updating operator location:", error);
      // toast.error("Something went wrong whilst updating operator's location. Please try again")
    }
  },
  deleteOperator: async (operatorId) => {
    try {
      await axios.delete(
        `${server}/api/v1/operator/delete-operator/${operatorId}`
      );
      set((state) => ({
        operators: state.operators.filter(
          (operator) => operator._id !== operatorId
        ),
      }));
    } catch (error) {
      console.error("Error deleting operator:", error);
      toast.error("Something went wrong whilst deleting the operator. Please try again");
    }
  },
}));
