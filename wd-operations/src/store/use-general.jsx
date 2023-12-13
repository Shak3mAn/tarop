import { create } from "zustand";

export const useUserInfo = create((set) => ({
  isUser: null,
  addUserInfo: (info) => set((state) => ({ ...state, isUser: info })),
}));

export const useButtonMain = create((set) => ({
  isCreateTeamMain: false,
  onOpenTeamMain: () => set({ isCreateTeamMain: true }),
  onCloseTeamMain: () => set({ isCreateTeamMain: false }),
}));

export const useWelcomeModal = create((set) => ({
  isApproved: false,
  isUserSubmit: false,
  isCongratulationOpened: false,
  onApproval: () => set({ isApproved: true }),
  onDisapproval: () => set({ isApproved: false }),
  onUserSubmit: () => set({ isUserSubmit: true }),
  onCongratulationOpened: () => set({ isCongratulationOpened: true }),
}));

export const useTempUserWelcome = create((set) => ({
  isTempApproved: false,
  isTempUserSubmit: false,
  isTempCongratulationOpened: false,
  onTempApproval: () => set({ isTempApproved: true }),
  onTempDisapproval: () => set({ isTempApproved: false }),
  onTempUserSubmit: () => set({ isTempUserSubmit: true }),
  onTempCongratulationOpened: () => set({ isTempCongratulationOpened: true }),
}));

export const useUserWelcome = create((set) => ({
  isUserApproved: false,
  isUserUserSubmit: false,
  isUserCongratulationOpened: false,
  onUserApproval: () => set({ isUserApproved: true }),
  onUserDisapproval: () => set({ isUserApproved: false }),
  onUserUserSubmit: () => set({ isUserUserSubmit: true }),
  onUserCongratulationOpened: () => set({ isUserCongratulationOpened: true }),
}));

export const useDashMapSwitcher = create((set) => ({
  isDashMap: {},
  addDashMap: (info) => set((state) => ({ ...state, isDashMap: info })),
}));

export const useDashDriver = create((set) => ({
  isDashDriver: {},
  addDashDriver: (info) => set((state) => ({ ...state, isDashDriver: info })),
}));

export const useMapOverviewSwitcher = create((set) => ({
  isMapOverview: {},
  addMapOverview: (info) => set((state) => ({ ...state, isMapOverview: info })),
}));

export const useMetaMapSwitcher = create((set) => ({
  isMeta: {},
  addMeta: (info) => set((state) => ({ ...state, isMeta: info })),
}));

export const useTDListSwitcher = create((set) => ({
  isTDList: {},
  addTDList: (info) => set((state) => ({ ...state, isTDList: info })),
}));

export const useDriverMode = create((set) => ({
  isNavigate: {},
  isToggleNavigate: true,
  addNavigate: (info) => set((state) => ({ ...state, isNavigate: info })),
  onToggleNavigate: () => set((state) => ({ isToggleNavigate: !state.isToggleNavigate }))
}))

export const useMainMapSwitcher = create((set) => ({
  isMainMap: {},
  addMainMap: (info) => set((state) => ({ ...state, isMainMap: info })),
}));

export const useMainNavigation = create((set) => ({
  isNavigation: {},
  addNavigation: (info) => set((state) => ({ ...state, isNavigation: info })),
}));
