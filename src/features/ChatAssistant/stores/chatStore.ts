import { create } from "zustand";

import type { ChatMessage } from "../types";

interface ChatState {
	isOpen: boolean;
	messages: ChatMessage[];
	isLoading: boolean;
	toggle: () => void;
	open: () => void;
	close: () => void;
	addMessage: (message: ChatMessage) => void;
	setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>()((set) => ({
	isOpen: false,
	messages: [],
	isLoading: false,
	toggle: () => set((state) => ({ isOpen: !state.isOpen })),
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
	addMessage: (message) =>
		set((state) => ({ messages: [...state.messages, message] })),
	setLoading: (loading) => set({ isLoading: loading }),
}));
