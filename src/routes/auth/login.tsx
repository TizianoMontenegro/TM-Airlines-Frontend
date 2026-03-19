import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

import { useAuthStore } from "@/stores/authStore";

const loginSearchSchema = z.object({
	redirect: z.string().optional().catch(""),
});

export const Route = createFileRoute("/auth/login")({
	validateSearch: loginSearchSchema,
	beforeLoad: () => {
		const { accessToken } = useAuthStore.getState();
		if (accessToken) {
			throw redirect({ to: "/dashboard/manage-booking" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const { redirect } = Route.useSearch();
	const setAuth = useAuthStore((state) => state.setAuth);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username: email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.detail || "Login failed");
			}

			const data = await response.json();

			setAuth({
				access: data.access,
				refresh: data.refresh,
				user: data.user,
			});

			navigate({ to: redirect || "/dashboard/manage-booking", replace: true });
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unexpected error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-max flex items-center justify-center px-4 py-10 bg-background-light dark:bg-background-dark">
			<div className="w-full max-w-md bg-box-light dark:bg-box-dark rounded-lg shadow-lg p-8">
				<h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
				<p className="text-gray-500 text-center mb-8">
					Sign in to your account
				</p>

				{redirect && (
					<div className="mb-4 p-3 bg-gold/10 text-gold text-sm rounded-md">
						Please sign in to access the requested page
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-6">
					<div className="flex flex-col gap-2">
						<label className="text-sm font-semibold uppercase" htmlFor="email">
							Username or Email
						</label>
						{/** biome-ignore lint/correctness/useUniqueElementIds: Need of refer label with input */}
						<input
							type="text"
							name="username"
							required
							placeholder="Enter your username or email"
							id="email"
							className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none focus:border-0 placeholder-gray-400"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label
							className="text-sm font-semibold uppercase"
							htmlFor="password"
						>
							Password
						</label>
						{/** biome-ignore lint/correctness/useUniqueElementIds: Need of refer label with input */}
						<input
							type="password"
							name="password"
							required
							placeholder="••••••••"
							id="password"
							className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none focus:border-0 placeholder-gray-400"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					{error && <p style={{ color: "red" }}>{error}</p>}

					<button
						type="submit"
						className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-md transition active:scale-95"
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</main>
	);
}
