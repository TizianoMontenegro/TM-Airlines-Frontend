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
		<form onSubmit={handleLogin}>
			<h2>Login</h2>

			<div>
				<label htmlFor="username">Username</label>
				<input
					name="username"
					placeholder="username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</div>

			<div>
				<label htmlFor="password">Password</label>
				<input
					name="password"
					placeholder="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>

			{error && <p style={{ color: "red" }}>{error}</p>}

			<button type="submit" disabled={loading}>
				{loading ? "Logging in..." : "Login"}
			</button>
		</form>
	);
	// return <>
	// <h1>Login</h1>
	// {/* MODIFY ACTION ATTRIBUTE TO USE THE LOGIN API */}
	// <form action="" method='post'>
	//   <input type="text" name='username' placeholder='username' />
	//   <input type="password" name='password' placeholder='password' />
	//   <input type='submit' value='Login' />
	// </form>
	// </>
}
