import { create } from "zustand";
import axios from "axios";
import { server } from "../../lib/utils/server";
import { toast } from "react-hot-toast";

export const useTeamStore = create((set) => ({
  teams: [],
  teamMapMeta: {},
  driverMapMeta: {},
  taskMapMeta: {},
  team: {},
  teamsName: [],
  teamColor: [],
  teamLocation: [],
  fetchTeams: async () => {
    try {
      const response = await axios.get(`${server}/api/v1/team/get-teams`);
      set({ teams: response.data.teams });
      set({
        teamsName: response.data.teams.map((team) => ({
          id: team._id,
          name: team.team,
        })),
      });
      set({
        teamsLocation: response.data.teams.map((team) => ({
          teamId: team._id,
          team: team.team,
          lat: team.setLocation?.lat,
          lng: team.setLocation?.lng,
          teamColor: team?.teamColor,
          driverId: team?.driverId,
          driver: team?.driver,
        })),
      });
      // set({
      //   teamColor: response.data.teams.map((team) => ({
      //     id: team._id,
      //     name: team.teamColor,
      //   })),
      // });
      // console.log("This is the response", response.data.teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      // toast.error(
      //   "Something went wrong whilst fetching teams. Please try again"
      // );
    }
  },
  fetchTeam: async () => {
    try {
      const response = await axios.get(`${server}/api/v1/team/get-team/${id}`);
      set({ team: response.data.team });
    } catch (error) {
      console.error("Error fetching team:", error);
      // toast.error(
      //   "Something went wrong whilst fetching team. Please try again"
      // );
    }
  },
  addTeam: async (newTeam, driverLocation) => {
    try {
      const response = await axios.post(`${server}/api/v1/team/create-team`, {
        ...newTeam,
        driverLocation: driverLocation,
      });
      set((state) => ({ teams: [...state.teams, response.data.saveT] }));
      set({
        teamMapMeta: response.data.saveTMM,
      });
      set({
        driverMapMeta: response.data.saveDMM,
      });
      toast.success("Team Created!");
    } catch (error) {
      console.error("Error adding team:", error);
      toast.error("Something went wrong whilst adding team. Please try again");
    }
  },
  updateTeam: async (teamId, updatedTeam) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/team/update-team/${teamId}`,
        updatedTeam
      );
      set((state) => ({
        teams: state.teams.map((team) =>
          team._id === teamId ? response.data.team : team
        ),
      }));
      set({ teamMapMeta: response.data.teamMeta });
      set({ driverMapMeta: response.data.driverMeta });
      set({ taskMapMeta: response.data.taskMeta });

      toast.success("Team Details Updated Successfully!");
    } catch (error) {
      console.error("Error updating team:", error);
      toast.error(
        "Something went wrong whilst updating team's details. Please try again"
      );
    }
  },

  // Update Team Location
  updateTeamLocation: async (operationCoordinator, setLocation) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/team/update-team-location`,
        { operationCoordinator, setLocation }
      );
      set((state) => ({
        teams: state.teams.map((team) =>
          team.operationCoordinator === operationCoordinator
            ? response.data.teamL
            : team
        ),
      }));
      set({ teamMapMeta: response.data.teamML });
      set({ driverMapMeta: response.data.driverML });
      set({ taskMapMeta: response.data.taskML });
    } catch (error) {
      console.error("Error updating team's location:", error);
      // toast.error(
      //   "Something went wrong whilst updating team's location. Please try again"
      // );
    }
  },

  deleteTeam: async (teamId) => {
    try {
      await axios.delete(`${server}/api/v1/team/delete-team/${teamId}`);
      set((state) => ({
        teams: state.teams.filter((team) => team._id !== teamId),
      }));
      toast.success("Team Deleted");
    } catch (error) {
      console.error("Error deleting team:", error);
      toast.error(
        "Something went wrong whilst deleting the team. Please try again"
      );
    }
  },
}));
