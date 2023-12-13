import { create } from 'zustand';

export const useToggleTaskTab = create((set) => ({
    isDetails: "tab1",
    onDetails: () => set({ isDetails: "tab1" }),
    onDates: () => set({ isDetails: "tab2" }),
}))