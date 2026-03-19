import { createFileRoute, redirect } from "@tanstack/react-router";

import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/dashboard/profile")({
	beforeLoad: ({ location }) => {
		const { accessToken } = useAuthStore.getState();
		if (!accessToken) {
			throw redirect({
				to: "/auth/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: Profile,
});

function Profile() {
	const { user, logout } = useAuthStore();

	return (
		<main className="min-h-screen bg-background-light dark:bg-background-dark px-6 lg:px-20 py-12">
			<div className="max-w-2xl mx-auto">
				<h2 className="text-4xl font-black mb-8 text-primary dark:text-white">
					My Profile
				</h2>

				<div className="bg-box-light dark:bg-box-dark rounded-lg shadow-lg p-8">
					<div className="space-y-6">
						<div>
							<p className="text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70 mb-1">
								Email
							</p>
							<p className="text-lg font-medium text-charcoal dark:text-white">
								{(user as { email?: string })?.email || "Not available"}
							</p>
						</div>

						<div>
							<p className="text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70 mb-1">
								First Name
							</p>
							<p className="text-lg font-medium text-charcoal dark:text-white">
								{(user as { first_name?: string })?.first_name ||
									"Not available"}
							</p>
						</div>

						<div>
							<p className="text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70 mb-1">
								Last Name
							</p>
							<p className="text-lg font-medium text-charcoal dark:text-white">
								{(user as { last_name?: string })?.last_name || "Not available"}
							</p>
						</div>
					</div>

					<div className="mt-8 pt-6 border-t border-primary/5 dark:border-white/10">
						<button
							type="button"
							onClick={logout}
							className="w-full bg-accent-red text-white font-bold py-3 rounded-md hover:opacity-90 transition-opacity"
						>
							Sign Out
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
