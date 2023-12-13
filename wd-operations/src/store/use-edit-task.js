import { create } from 'zustand';

export const useEditTask = create((set) => ({
    isEditing: false,
    isEditData: {},
    onEdit: () => set({ isEditing: true }),
    onCancel: () => set({ isEditing: false }),
    onToggle: () => set((state) => ({ isEditing: !state.isEditing})),
    addEditData: (info) => set((state) => ({ ...state, info }))
}))