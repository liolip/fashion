import { create } from 'zustand';
export const useTreeStore = create(set => ({
    activeNodeId: null,
    buttonWidgetPosition: null,
    buttonWidgetVisible: false,
    setActiveNode: id => set({ activeNodeId: id }),
    setButtonWidgetPosition: pos => set({ buttonWidgetPosition: pos }),
    setButtonWidgetVisible: visible => set({ buttonWidgetVisible: visible }),
}));
