import { create } from 'zustand'

interface TreeStore {
	activeNodeId: string | null
	buttonWidgetPosition: { x: number; y: number } | null
	setActiveNode: (id: string | null) => void
	setButtonWidgetPosition: (pos: { x: number; y: number }) => void
}

export const useTreeStore = create<TreeStore>(set => ({
	activeNodeId: null,
	buttonWidgetPosition: null,
	setActiveNode: id => set({ activeNodeId: id }),
	setButtonWidgetPosition: pos => set({ buttonWidgetPosition: pos }),
}))
