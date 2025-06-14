import { create } from 'zustand'

interface TreeStore {
	activeNodeId: string | null
	buttonWidgetPosition: { x: number; y: number } | null
	buttonWidgetVisible: boolean
	setActiveNode: (id: string | null) => void
	setButtonWidgetPosition: (pos: { x: number; y: number }) => void
	setButtonWidgetVisible: (visible: boolean) => void
}

export const useTreeStore = create<TreeStore>(set => ({
	activeNodeId: null,
	buttonWidgetPosition: null,
	buttonWidgetVisible: false,
	setActiveNode: id => set({ activeNodeId: id }),
	setButtonWidgetPosition: pos => set({ buttonWidgetPosition: pos }),
	setButtonWidgetVisible: visible => set({ buttonWidgetVisible: visible }),
}))
