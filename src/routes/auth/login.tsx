import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const loginUser = async (username: string, password: string) => {
		const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.detail || "Login failed");
		}

		return response.json();
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault(); // prevent page reload
		setError(null);
		setLoading(true);

		try {
			const tokens = await loginUser(username, password);

			localStorage.setItem("accessToken", tokens.access);
			localStorage.setItem("refreshToken", tokens.refresh);

			console.log("Login successful");
		} catch (err: any) {
			setError(err.message);
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

				<form onSubmit={handleLogin} className="space-y-6">
					{/* Username / Email */}
					<div className="flex flex-col gap-2">
						<label
							className="text-sm font-semibold uppercase"
							htmlFor="username"
						>
							Username or Email
						</label>
						{/** biome-ignore lint/correctness/useUniqueElementIds: Need of refer label with input */}
						<input
							type="text"
							name="username"
							required
							placeholder="Enter your username"
							id="username"
							className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none focus:border-0 placeholder-gray-400"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					{/* Password */}
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

					{/* Submit Button */}
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
