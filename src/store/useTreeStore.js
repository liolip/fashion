import { create } from 'zustand';
export const useTreeStore = create(set => ({
    activeNodeId: null,
    buttonWidgetPosition: null,
    setActiveNode: id => set({ activeNodeId: id }),
    setButtonWidgetPosition: pos => set({ buttonWidgetPosition: pos }),
}));
