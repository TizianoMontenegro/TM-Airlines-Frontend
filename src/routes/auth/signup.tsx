import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/auth/signup")({
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
	const setAuth = useAuthStore((state) => state.setAuth);

	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		if (password !== passwordConfirm) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(
				"http://127.0.0.1:8000/api/v1/auth/register/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						first_name: firstName,
						last_name: lastName,
						date_of_birth: dateOfBirth,
						password,
						password_confirm: passwordConfirm,
					}),
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.detail || "Registration failed");
			}

			const loginResponse = await fetch(
				"http://127.0.0.1:8000/api/v1/auth/login/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username: email, password }),
				},
			);

			if (!loginResponse.ok) {
				throw new Error("Login after registration failed");
			}

			const tokens = await loginResponse.json();
			setAuth({
				access: tokens.access,
				refresh: tokens.refresh,
				user: tokens.user,
			});

			navigate({ to: "/dashboard/manage-booking", replace: true });
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
				<h1 className="text-3xl font-bold text-center mb-2">
					Create Your Account
				</h1>
				<p className="text-gray-500 text-center mb-8">Join TM Airlines</p>

				<form onSubmit={handleSignup} className="space-y-6">
					<div className="flex flex-col gap-2">
						<label className="text-sm font-semibold uppercase" htmlFor="email">
							Email
						</label>
						{/** biome-ignore lint/correctness/useUniqueElementIds: Need of refer label with input */}
						<input
							type="email"
							name="email"
							required
							placeholder="Enter your email"
							id="email"
							className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none focus:border-0 placeholder-gray-400"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="flex gap-4">
						<div className="flex-1 flex flex-col gap-2">
							<label
								className="text-sm font-semibold uppercase"
								htmlFor="firstName"
							>
								First Name
							</label>
							{/** biome-ignore lint/correctness/useUniqueElementIds: Need of refer label with input */}
							<input
								type="text"
								name="firstName"
								placeholder="First name"
								id="firstName"
								className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none focus:border-0 placeholder-gray-400"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>

						<div className="flex-1 flex flex-col gap-2">
							<label
								className="text-sm font-semibold uppercase"
								htmlFor="lastName"
							>
								Last Name
							</label>
							{/** biome-ignore lint/correctness/useUniqueElementIds: Need of refer label with input */}
							<input
								type="text"
								name="lastName"
								placeholder="Last name"
								id="lastName"
								className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none focus:border-0 placeholder-gray-400"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<label
							className="text-sm font-semibold uppercase"
							htmlFor="dateOfBirth"
						>
							Date of Birth
						</label>
						{/** biome-ignore lint/correctness/useUniqueElementIds: Need of refer label with input */}
						<input
							type="date"
							name="dateOfBirth"
							id="dateOfBirth"
							className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none focus:border-0 placeholder-gray-400"
							value={dateOfBirth}
							onChange={(e) => setDateOfBirth(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label
							className="text-sm font-semibold uppercase"
							htmlFor="password"
						>
							Password
						</label>
						<div className="relative">
							{/** biome-ignore lint/correctness/useUniqueElementIds: Need of refer label with input */}
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								required
								placeholder="••••••••"
								id="password"
								className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none focus:border-0 placeholder-gray-400"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<label
							className="text-sm font-semibold uppercase"
							htmlFor="passwordConfirm"
						>
							Confirm Password
						</label>
						<div className="relative">
							{/** biome-ignore lint/correctness/useUniqueElementIds: Need of refer label with input */}
							<input
								type={showPasswordConfirm ? "text" : "password"}
								name="passwordConfirm"
								required
								placeholder="••••••••"
								id="passwordConfirm"
								className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none focus:border-0 placeholder-gray-400"
								value={passwordConfirm}
								onChange={(e) => setPasswordConfirm(e.target.value)}
							/>
							<button
								type="button"
								onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
							>
								{showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
					</div>

					{error && <p style={{ color: "red" }}>{error}</p>}

					<button
						type="submit"
						className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-md transition active:scale-95"
						disabled={loading}
					>
						{loading ? "Creating account..." : "Sign Up"}
					</button>

					<p className="text-center text-sm text-gray-500">
						Already have an account?{" "}
						<a href="/auth/login" className="text-primary hover:underline">
							Login
						</a>
					</p>
				</form>
			</div>
		</main>
	);
}
