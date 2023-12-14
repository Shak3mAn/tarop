import { create } from "zustand";

export const useLocationPicker = create((set) => ({
  isOpen: true,
  isLocationPicker: {},
  isInitial: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onInitialTrue: () => set({ isInitial: true }),
  onInitialFalse: () => set({ isInitial: false }),
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  addLocationPicker: (info) => set((state) => ({ ...state, info })),
}));

export const useLatLngPicker = create((set) => ({
  isFrom: null,
  isTeam: null,
  isDriver: null,
  isTo: null,
  tempSource: null,
  tempDestination: null,
  addFromInfo: (info) => set((state) => ({ ...state, isFrom: info })),
  addToInfo: (info) => set((state) => ({ ...state, isTo: info })),
  addTeamInfo: (info) => set((state) => ({ ...state, isTeam: info })),
  addDriverInfo: (info) => set((state) => ({ ...state, isDriver: info })),
  addTempSource: (info) => set((state) => ({ ...state, tempSource: info })),
  addTempDestination: (info) =>
    set((state) => ({ ...state, tempDestination: info })),
}));

export const useDistance = create((set) => ({
  isDistance: null,
  isTeamGeoInfo: null,
  isDriverGeoInfo: null,
  isSourceGeoInfo: null,
  isDestinationGeoInfo: null,
  isEta: null,
  addDistance: (info) => set((state) => ({ ...state, isDistance: info })),
  addTeamGeoInfo: (info) => set((state) => ({ ...state, isTeamGeoInfo: info })),
  addDriverGeoInfo: (info) => set((state) => ({ ...state, isDriverGeoInfo: info })),
  addSourceGeoInfo: (info) =>
    set((state) => ({ ...state, isSourceGeoInfo: info })),
  addDestinationGeoInfo: (info) =>
    set((state) => ({ ...state, isDestinationGeoInfo: info })),
  addEta: (info) => set((state) => ({ ...state, isEta: info })),
}));

export const useRouteToggle = create((set) => ({
  isOpen: true,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useMobileMapToggle = create((set) => ({
  isOpen: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));


export const useTimePicker = create((set) => ({
  isStartTime: { date: new Date() },
  isStartDate: { date: new Date() },
  isEndTime: { date: new Date() },
  isTimePicker: {
    startDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
  },
  addStartTime: (info) =>
    set((state) => ({
      ...state,
      isStartTime: {
        date: info,
      },
    })),
  addStartDate: (info) =>
    set((state) => ({ ...state, isStartDate: { date: info } })),
  addEndTime: (info) =>
    set((state) => ({ ...state, isEndTime: { date: info } })),
  addStartTimePicker: (info) =>
    set((state) => ({
      ...state,
      isTimePicker: {
        ...state.isTimePicker,
        startDate: info.startDate,
        startTime: info.startTime,
      },
    })),
  addEndTimePicker: (info) =>
    set((state) => ({
      ...state,
      isTimePicker: {
        ...state.isTimePicker,
        endTime: info.endTime,
      },
    })),
}));
