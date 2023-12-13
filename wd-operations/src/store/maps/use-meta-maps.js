import { create } from "zustand";

export const useDestinations = create((set) => ({
  isDestination: null,
  addDestination: (info) => set((state) => ({ ...state, isDestination: info })),
}));

export const useDashMapTools = create((set) => ({
  isMapPin: false,
  isRoute: false,
  onTogglePin: () => set((state) => ({ isMapPin: !state.isMapPin })),
  onToggleRoute: () => set((state) => ({ isRoute: !state.isRoute })),
}));

export const useMainMapTools = create((set) => ({
  isMapPin: false,
  isRoute: false,
  onTogglePin: () => set((state) => ({ isMapPin: !state.isMapPin })),
  onToggleRoute: () => set((state) => ({ isRoute: !state.isRoute })),
}));

export const useMainMapModalTools = create((set) => ({
  isRoute: true,
  onToggleRoute: () => set((state) => ({ isRoute: !state.isRoute })),
}))

export const useDashMapModalTools = create((set) => ({
  isRoute: true,
  onToggleRoute: () => set((state) => ({ isRoute: !state.isRoute })),
}));

export const useGlobalSchedule = create((set) => ({
  isTasks: [],
  addTasks: (info) => set((state) => [{ ...state, isTasks: info }]),
}));

export const useGlobalTeams = create((set) => ({
  isTeams: [],
  addTeams: (info) => set((state) => [{ ...state, isTeams: info }]),
}));

export const useGlobalDrivers = create((set) => ({
  isDrivers: [],
  addDrivers: (info) => set((state) => [{ ...state, isDrivers: info }]),
}));

export const useGlobalTasksDRs = create((set) => ({
  isTaskDRs: [],
  addTaskDRs: (info) => set((state) => [{ ...state, isTaskDRs: info }]),
}));

export const useDashMapModalSwitcher = create((set) => ({
  isGeneral: true,
  isTasks: false,
  isTask: "",
  isTeams: false,
  isTeam: "",
  isDrivers: false,
  isDriver: "",
  onGeneralTrue: () => set({ isGeneral: true }),
  onGeneralFalse: () => set({ isGeneral: false }),
  onTasksTrue: () => set({ isTasks: true }),
  onTasksFalse: () => set({ isTasks: false }),
  onTeamsTrue: () => set({ isTeams: true }),
  onTeamsFalse: () => set({ isTeams: false }),
  onDriversTrue: () => set({ isDrivers: true }),
  onDriversFalse: () => set({ isDrivers: false }),
  addTask: (info) => set((state) => ({ ...state, isTask: info })),
  addTeam: (info) => set((state) => ({ ...state, isTeam: info })),
  addDriver: (info) => set((state) => ({ ...state, isDriver: info })),
}));

export const useTeamDistance = create((set) => ({
  isTaskDistance: null,
  isDriverDistance: null,
  addTaskDistance: (info) =>
    set((state) => ({ ...state, isTaskDistance: info })),
  addDriverDistance: (info) =>
    set((state) => ({ ...state, isDriverDistance: info })),
}));

export const useTeamDirection = create((set) => ({
  isTaskDirection: null,
  isDriverDirection: null,
  addTaskDirection: (info) =>
    set((state) => ({ ...state, isTaskDirection: info })),
  addDriverDirection: (info) =>
    set((state) => ({ ...state, isDriverDirection: info })),
}));

export const useDriverDirection = create((set) => ({
  isTeamDirection: null,
  isTaskDirection: null,
  addTeamDirection: (info) =>
    set((state) => ({ ...state, isTeamDirection: info })),
  addTaskDirection: (info) =>
    set((state) => ({ ...state, isTaskDirection: info })),
}));

export const useDriverDistance = create((set) => ({
  isTeamDistance: null,
  isTaskDistance: null,
  addTeamDistance: (info) =>
    set((state) => ({ ...state, isTeamDistance: info })),
  addTaskDistance: (info) =>
    set((state) => ({ ...state, isTaskDistance: info })),
}));

export const useTaskDistance = create((set) => ({
  isTaskDistance: null,
  addTaskDistance: (info) =>
    set((state) => ({ ...state, isTaskDistance: info })),
}));

export const useMainTeamDistance = create((set) => ({
  isTaskDistance: null,
  isDriverDistance: null,
  addTaskDistance: (info) =>
    set((state) => ({ ...state, isTaskDistance: info })),
  addDriverDistance: (info) =>
    set((state) => ({ ...state, isDriverDistance: info })),
}));

export const useMainTeamDirection = create((set) => ({
  isTaskDirection: null,
  isDriverDirection: null,
  addTaskDirection: (info) =>
    set((state) => ({ ...state, isTaskDirection: info })),
  addDriverDirection: (info) =>
    set((state) => ({ ...state, isDriverDirection: info })),
}));

export const useMainDriverDirection = create((set) => ({
  isTeamDirection: null,
  isTaskDirection: null,
  addTeamDirection: (info) =>
    set((state) => ({ ...state, isTeamDirection: info })),
  addTaskDirection: (info) =>
    set((state) => ({ ...state, isTaskDirection: info })),
}));

export const useMainDriverDistance = create((set) => ({
  isTeamDistance: null,
  isTaskDistance: null,
  addTeamDistance: (info) =>
    set((state) => ({ ...state, isTeamDistance: info })),
  addTaskDistance: (info) =>
    set((state) => ({ ...state, isTaskDistance: info })),
}));

export const useMainTaskDistance = create((set) => ({
  isTaskDistance: null,
  addTaskDistance: (info) =>
    set((state) => ({ ...state, isTaskDistance: info })),
}));
