import { useAuthStore } from "@/stores/authStore";

export const API_URL =
	import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api/v1";

export const apiFetch = async (
	endpoint: string,
	options: RequestInit = {},
): Promise<unknown> => {
	const { accessToken, refreshToken, setAuth, logout } =
		useAuthStore.getState();

	const makeRequest = async (token?: string) => {
		return fetch(`${API_URL}${endpoint}`, {
			...options,
			headers: {
				"Content-Type": "application/json",
				...(token && { Authorization: `Bearer ${token}` }),
				...options.headers,
			},
		});
	};

	let response = await makeRequest(accessToken || undefined);

	if (response.status === 401 && refreshToken) {
		const refreshResponse = await fetch(`${API_URL}/auth/refresh/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh: refreshToken }),
		});

		if (refreshResponse.ok) {
			const data = await refreshResponse.json();

			setAuth({
				access: data.access,
				refresh: refreshToken,
			});

			response = await makeRequest(data.access);
		} else {
			logout();
			throw new Error("Session expired");
		}
	}

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.detail || "Request error");
	}

	return response.json();
};
