import { create } from "zustand";
import axios from "axios";
import { server } from "../../lib/utils/server";
import { toast } from "react-hot-toast";


export const useTeamsMapMeta = create((set) => ({
  teamsMeta: [],
  teamMeta: {},
  teamsMM: [],
  teams: [],
  addNewTeamMeta: (info) =>
    set((state) => ({ teamsMeta: [...state.teamsMeta, info] })),
  updateNewTeamMeta: (info) =>
    set((state) => ({
      teamsMeta: state.teamsMeta.map((teamMeta) =>
        teamMeta._id === info._id ? info : teamMeta
      ),
    })),
  deleteNewTeamMeta: (info) =>
    set((state) => ({
      teamsMeta: state.teamsMeta.filter((team) => team._id !== info._id),
    })),
  fetchTeamsMeta: async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/team-map-meta/get-team-map-metas`
      );
      const teamsMetaArray = response.data.teamMapMetas.map((teamMapMeta) => ({
        ...teamMapMeta,
        option: "team",
      }));
  
      const teamsArray = response.data.teamMapMetas.map((teamMapMeta) => ({
        id: teamMapMeta.teamId,
        name: teamMapMeta.team,
        option: "Team"
      }));
  
      set({
        teamsMM: response.data.teamMapMetas,
        teamsMeta: teamsMetaArray,
        teams: teamsArray,
      });
      console.log("Response & TeamsMeta:", response.data.teamMapMetas, teams)
    } catch (error) {
      // console.error("Error fetching getTeamMetas:", error);
      // toast.error("Something went wrong whilst fetching teams map meta");
    }
  },
  fetchTeamMeta: async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/team-map-meta/get-team-map-meta/${id}`
      );
      set({ teamMeta: response.data.teamMapMeta });
    } catch (error) {
      // console.error("Error fetching teamMapMeta:", error);
      // toast.error("Something went wrong whilst fetching team map meta");
    }
  },
  addTeamMeta: async (newTeamMeta) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/team-map-meta/create-team-map-meta`,
        newTeamMeta
      );
      set((state) => ({ teamsMeta: [...state.teamsMeta, response.data] }));
    } catch (error) {
      // console.error("Error adding teamMeta:", error);
      // toast.error("Something went wrong whilst adding team map meta");
    }
  },
  updateTeamMeta: async (teamId, updatedTeamMeta) => {
    try {
      const response = await axios.put(
        `${server}/api/v1/team-map-meta/update-team-map-meta`,
        { teamId, updatedTeamMeta }
      );
      set((state) => ({
        teamsMeta: state.teamsMeta.map((teamMeta) =>
          teamMeta.teamId === teamId ? response.data.teamMapMeta : teamMeta
        ),
      }));
      toast.success("Update Successful!");
    } catch (error) {
      // console.error("Error updating teamMeta:", error);
      // toast.error("Something went wrong whilst updating teams map meta");
    }
  },

  // Update Tasks Location
  updateTeamMetaTskL: async (teamId, taskLocation) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/team-map-meta/update-team-task-location`,
        { teamId, taskLocation }
      );
      set((state) => ({
        teamsMeta: state.teamsMeta.map((teamMeta) =>
          teamMeta.teamId === team ? response.data.teamMapMeta : teamMeta
        ),
      }));
    } catch (error) {
      // console.error("Error updating teamMeta:", error);
      // toast.error(
      //   "Something went wrong whilst updating teams map meta task's location"
      // );
    }
  },

  // Update Driver's Location
  updateTeamMetaDrvL: async (teamId, driverLocation) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/team-map-meta/update-team-driver-location`,
        { teamId, driverLocation }
      );
      set((state) => ({
        teamsMeta: state.teamsMeta.map((teamMeta) =>
          teamMeta.teamId === team ? response.data.teamMapMeta : teamMeta
        ),
      }));
    } catch (error) {
      // console.error("Error updating teamMeta:", error);
      // toast.error(
      //   "Something went wrong whilst updating teams map meta driver's location"
      // );
    }
  },

  deleteTeamMeta: async (teamMetaId) => {
    try {
      await axios.delete(
        `${server}/api/v1/team-map-meta/delete-team-map-meta/${teamMetaId}`
      );
      set((state) => ({
        teamsMeta: state.teamsMeta.filter(
          (teamMeta) => teamMeta._id !== teamMetaId
        ),
      }));
      toast.success("Team Map Meta Successfully Deleted!");
    } catch (error) {
      // console.error("Error deleting teamMeta:", error);
      // toast.error("Something went wrong whilst deleting teams map meta");
    }
  },
}));

export const useDriversMapMeta = create((set) => ({
  driversMeta: [],
  driverMeta: {},
  driversMM: [],
  drivers: [],
  addNewDriverMeta: (info) =>
    set((state) => ({ driversMeta: [...state.driversMeta, info] })),
  updateNewDriverMeta: (info) =>
    set((state) => ({
      driversMeta: state.driversMeta.map((driverMeta) =>
        driverMeta._id === info._id ? info : driverMeta
      ),
    })),
  deleteNewDriverMeta: (info) =>
    set((state) => ({
      driversMeta: state.driversMeta.filter(
        (driver) => driver._id !== info._id
      ),
    })),
  fetchDriversMeta: async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/driver-map-meta/get-driver-map-metas`
      );
      const driversMetaArray = response.data.driverMapMetas.map((driverMapMeta) => ({
        ...driverMapMeta,
        option: "driver",
      }));
  
      const driversArray = response.data.driverMapMetas.map((driverMapMeta) => ({
        id: driverMapMeta.driverId,
        name: driverMapMeta.driver,
        option: "Driver"
      }));
  
      set({
        driversMM: response.data.driverMapMetas,
        driversMeta: driversMetaArray,
        drivers: driversArray,
      });
      console.log("Response & DriversMeta:", response.data.driverMapMetas, drivers)
    } catch (error) {
      // console.error("Error fetching getDriverMetas:", error);
      // toast.error("Something went wrong whilst fetching drivers map meta");
    }
  },
  fetchDriverMeta: async (userData) => {
    try {
      const response = await axios.get(
        `${server}/api/v1/driver-map-meta/get-driver-map-meta`,
        { params: userData }
      );
      set({ driverMeta: response.data.driverMapMeta });
    } catch (error) {
      // console.error("Error fetching driverMapMeta:", error);
      // toast.error("Something went wrong whilst fetching driver map meta");
    }
  },
  addDriverMeta: async (newDriverMeta) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/driver-map-meta/create-driver-map-meta`,
        newDriverMeta
      );
      set((state) => ({
        driversMeta: [...state.driversMeta, response.data.savedDriverMapMeta],
      }));
    } catch (error) {
      // console.error("Error adding driverMeta:", error);
      // toast.error("Something went wrong whilst creating a new driver map meta");
    }
  },
  updateDriverMeta: async (driverId, updatedDriverMeta) => {
    try {
      const response = await axios.put(
        `${server}/api/v1/driver-map-meta/update-driver-map-meta`,
        { driverId, updatedDriverMeta }
      );
      set((state) => ({
        driversMeta: state.driversMeta.map((driverMeta) =>
          driverMeta.driverId === driverId
            ? response.data.driverMapMeta
            : driverMeta
        ),
      }));
    } catch (error) {
      // console.error("Error updating driverMeta:", error);
      // toast.error("Something went wrong whilst updating driver map meta");
    }
  },

  //Update Tasks Location
  updateDriverMetaTskL: async (teamId, taskLocation) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/driver-map-meta/update-driver-meta-task-location`,
        { teamId, taskLocation }
      );
      set((state) => ({
        driversMeta: state.driversMeta.map((driverMeta) =>
          driverMeta.teamId === teamId
            ? response.data.driverMapMeta
            : driverMeta
        ),
      }));
    } catch (error) {
      // console.error("Error updating driverMeta:", error);
    }
  },

  // Update Teams Location
  updateDriverMetaTmL: async (teamId, teamLocation) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/driver-map-meta/update-driver-meta-team-location`,
        { teamId, teamLocation }
      );
      set((state) => ({
        driversMeta: state.driversMeta.map((driverMeta) =>
          driverMeta.teamId === teamId
            ? response.data.driverMapMeta
            : driverMeta
        ),
      }));
    } catch (error) {
      // console.error("Error updating driverMeta:", error);
    }
  },

  deleteDriverMeta: async (driverMetaId) => {
    try {
      await axios.delete(
        `${server}/api/v1/driver-map-meta/delete-driver-map-meta/${driverMetaId}`
      );
      set((state) => ({
        driversMeta: state.driversMeta.filter(
          (driverMeta) => driverMeta._id !== driverMetaId
        ),
      }));
    } catch (error) {
      // console.error("Error deleting driverMeta:", error);
      // toast.error("Something went wrong whilst deleting driver map meta");
    }
  },
}));

export const useTasksMapMeta = create((set) => ({
  tasksMeta: [],
  taskMeta: {},
  tasksMM: [],
  tasks: [],
  taskItems: [],
  addNewTaskMeta: (info) =>
    set((state) => ({ tasksMeta: [...state.tasksMeta, info] })),
  updateNewTaskMeta: (info) =>
    set((state) => ({
      tasksMeta: state.tasksMeta.map((taskMeta) =>
        taskMeta._id === info._id ? info : taskMeta
      ),
    })),
  deleteNewTaskMeta: (info) =>
    set((state) => ({
      tasksMeta: state.tasksMeta.filter((task) => task._id !== info._id),
    })),
  fetchTasksMeta: async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/task-map-meta/get-task-map-metas`
      );
      const tasksMetaArray = response.data.taskMapMetas.map((taskMapMeta) => ({
        ...taskMapMeta,
        option: "task",
      }));
  
      const tasksArray = response.data.taskMapMetas.map((taskMapMeta) => ({
        id: taskMapMeta.taskId,
        name: taskMapMeta.task,
        option: "Task"
      }));

      const taskItemArray = response.data.taskMapMetas.map((taskMapMeta) => ({
        id: taskMapMeta?.taskId,
        task: taskMapMeta?.task,
        team: taskMapMeta.team?.team,
        startTime: taskMapMeta?.startTime,
        endTime: taskMapMeta?.endTime,
        status: taskMapMeta?.status,
        source: {
          lat: taskMapMeta.source?.lat,
          lng: taskMapMeta.source?.lng,
        },
        destination: {
          lat: taskMapMeta.destination?.lat,
          lng: taskMapMeta.destination?.lng,
        },
        teamDstn: {
          lat: taskMapMeta.team?.lat,
          lng: taskMapMeta.team?.lng,
        },
      }))
  
      set({
        tasksMM: response.data.taskMapMetas,
        tasksMeta: tasksMetaArray,
        tasks: tasksArray,
        taskItems: taskItemArray,
      });
      console.log("Response & TasksMeta:", response.data.taskMapMetas, tasks)
    } catch (error) {
      // console.error("Error fetching getTasksMetas:", error);
      // toast.error("Something went wrong whilst fetching tasks map meta");
    }
  },
  fetchTaskMeta: async () => {
    try {
      const response = await axios.get(
        `${server}/api/v1/task-map-meta/get-task-map-meta/${id}`
      );
      set({ taskMeta: response.data.taskMapMeta });
    } catch (error) {
      // console.error("Error fetching taskMeta:", error);
      // toast.error("Something went wrong whilst fetching task map meta");
    }
  },
  addTaskMeta: async (newTaskMeta) => {
    try {
      const response = await axios.post(
        `${server}/api/v1/task-map-meta/create-task-map-meta`,
        newTaskMeta
      );
      set((state) => ({
        tasksMeta: [...state.tasksMeta, response.data.savedTaskMapMeta],
      }));
    } catch (error) {
      // console.error("Error adding taskMeta:", error);
      // toast.error("Something went wrong whilst creating a new task map meta");
    }
  },
  updateTaskMeta: async (taskId, updatedTaskMeta) => {
    try {
      const response = await axios.put(
        `${server}/api/v1/task-map-meta/update-task-map-meta`,
        { taskId, updatedTaskMeta }
      );
      set((state) => ({
        tasksMeta: state.tasksMeta.map((taskMeta) =>
          taskMeta.taskId === taskId ? response.data.taskMapMeta : taskMeta
        ),
      }));
    } catch (error) {
      // console.error("Error updating taskMeta:", error);
      // toast.error("Something went wrong whilst updating the task map meta");
    }
  },

  // Update Team's Location
  updateTaskMetaTmL: async (teamId, teamLocation) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/task-map-meta/update-task-meta-team-location`,
        { teamId, teamLocation }
      );
      set((state) => ({
        tasksMeta: state.tasksMeta.map((taskMeta) =>
          taskMeta.teamId === teamId ? response.data.taskMapMeta : taskMeta
        ),
      }));
    } catch (error) {
      // console.error("Error updating taskMeta:", error);
    }
  },

  // Update Driver's Location
  updateTaskMetaDrvL: async (teamId, driverLocation) => {
    try {
      const response = await axios.patch(
        `${server}/api/v1/task-map-meta/update-task-meta-driver-location`,
        { teamId, driverLocation }
      );
      set((state) => ({
        tasksMeta: state.tasksMeta.map((taskMeta) =>
          taskMeta.teamId === teamId ? response.data.taskMapMeta : taskMeta
        ),
      }));
    } catch (error) {
      // console.error("Error updating taskMeta:", error);
    }
  },

  deleteTaskMeta: async (taskMetaId) => {
    try {
      await axios.delete(
        `${server}/api/v1/task-map-meta/delete-task-map-meta/${taskMetaId}`
      );
      set((state) => ({
        tasksMeta: state.tasksMeta.filter(
          (taskMeta) => taskMeta._id !== taskMetaId
        ),
      }));
    } catch (error) {
      // console.error("Error deleting taskMeta:", error);
      // toast.error("Something went wrong whilst deleting the task map meta");
    }
  },
}));
