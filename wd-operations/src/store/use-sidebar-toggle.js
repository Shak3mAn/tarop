import { create } from 'zustand';

export const useSidebarToggle = create((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onToggle: () => set((state) => ({ isOpen: !state.isOpen}))
}));
