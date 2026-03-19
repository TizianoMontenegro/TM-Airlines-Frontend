import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	user: unknown | null;
	setAuth: (data: { access: string; refresh: string; user?: unknown }) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,
			user: null,

			setAuth: ({ access, refresh, user }) =>
				set({
					accessToken: access,
					refreshToken: refresh,
					user: user || null,
				}),

			logout: () =>
				set({
					accessToken: null,
					refreshToken: null,
					user: null,
				}),
		}),
		{
			name: "auth-storage",
		},
	),
);
