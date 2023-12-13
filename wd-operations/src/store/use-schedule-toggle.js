import { create } from "zustand";

export const useScheduleToggle = create((set) => ({
  isBoard: true,
  onBoard: () => set({ isBoard: true }),
  onTable: () => set({ isBoard: false }),
  onToggle: () => set((state) => ({ isBoard: !state.isBoard })),
}));

export const useAdminToggle = create((set) => ({
  isTeam: true,
  isVehicle: false,
  isCoordinator: false,
  onTeam: () => set({ isTeam: true, isVehicle: false, isCoordinator: false }),
  onVehicle: () => set({ isTeam: false, isVehicle: true, isCoordinator: false }),
  onCoordinator: () => set({ isTeam: false, isVehicle: false, isCoordinator: true }),
}));
