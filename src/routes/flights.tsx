import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useId, useState } from "react";
import {
	AngleRight,
	Calendar,
	Download,
	Medal,
	MoreVert,
} from "@/assets/icons";
import type { Flights } from "@/types";

export const Route = createFileRoute("/flights")({
	component: RouteComponent,
});

const fetchFlights = async () => {
	const response = await fetch("http://127.0.0.1:8000/api/v1/flights/");

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.detail || "Flights not found");
	}

	return response.json();
};

const getStatusStyles = (
	status: string,
): { bg: string; text: string; dot: string } => {
	switch (status.toLowerCase()) {
		case "scheduled":
		case "on time":
			return {
				bg: "bg-green-100",
				text: "text-green-800",
				dot: "bg-green-600",
			};
		case "departed":
		case "flying":
			return {
				bg: "bg-gray-100",
				text: "text-gray-800",
				dot: "bg-gray-600",
			};
		case "delayed":
			return {
				bg: "bg-accent-red/10",
				text: "text-accent-red",
				dot: "bg-accent-red",
			};
		case "arrived":
			return {
				bg: "bg-green-100",
				text: "text-green-800",
				dot: "bg-green-600",
			};
		default:
			return {
				bg: "bg-gray-100",
				text: "text-gray-800",
				dot: "bg-gray-600",
			};
	}
};

function RouteComponent() {
	const [activeFilter, setActiveFilter] = useState("all");
	const originCityId = useId();
	const destinationId = useId();

	const { data, isLoading, isError, error } = useQuery<Flights>({
		queryKey: ["Flights"],
		queryFn: fetchFlights,
	});

	if (isLoading)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-primary dark:text-white text-lg">
					Loading flights...
				</div>
			</div>
		);

	if (isError)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-accent-red">{error.message}</div>
			</div>
		);

	return (
		<main className="min-h-screen bg-background-light dark:bg-background-dark px-6 lg:px-20 py-12">
			<div className="max-w-7xl mx-auto">
				<section className="mb-16">
					<h2 className="text-4xl md:text-5xl font-black mb-4 text-primary dark:text-white">
						Public Flight History
					</h2>
					<p className="text-medium-gray dark:text-white/70 text-lg max-w-2xl leading-relaxed">
						Monitoring regional services and operational logs for the current
						quarter.
					</p>
				</section>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					<aside className="lg:col-span-4 flex flex-col gap-8">
						<div className="bg-box-light dark:bg-box-dark p-8 rounded-md shadow-soft border border-primary/5 dark:border-white/10">
							<h3 className="text-2xl font-black mb-6 text-primary dark:text-white">
								Advanced Filters
							</h3>
							<div className="space-y-5">
								<div className="space-y-2">
									<label
										htmlFor={originCityId}
										className="text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70"
									>
										Origin City
									</label>
									<select
										id={originCityId}
										className="w-full px-4 py-3 bg-surface-light dark:bg-white/5 border-none rounded-md focus:ring-2 focus:ring-primary/20 text-charcoal dark:text-white placeholder:text-medium-gray/50 dark:placeholder:text-white/30"
									>
										<option>All Origins</option>
										<option>Rome (FCO)</option>
										<option>Milan (MXP)</option>
										<option>Venice (VCE)</option>
										<option>Florence (FLR)</option>
									</select>
								</div>
								<div className="space-y-2">
									<label
										htmlFor={destinationId}
										className="text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70"
									>
										Destination
									</label>
									<select
										id={destinationId}
										className="w-full px-4 py-3 bg-surface-light dark:bg-white/5 border-none rounded-md focus:ring-2 focus:ring-primary/20 text-charcoal dark:text-white placeholder:text-medium-gray/50 dark:placeholder:text-white/30"
									>
										<option>All Destinations</option>
										<option>Paris (CDG)</option>
										<option>London (LHR)</option>
										<option>New York (JFK)</option>
										<option>Tokyo (NRT)</option>
									</select>
								</div>
								<div className="space-y-3">
									<span className="text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70">
										Flight Status
									</span>
									<div className="flex flex-wrap gap-2">
										<button
											type="button"
											onClick={() => setActiveFilter("all")}
											className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
												activeFilter === "all"
													? "bg-primary text-white"
													: "bg-surface-light dark:bg-white/5 text-medium-gray dark:text-white/70 hover:bg-gold/20"
											}`}
										>
											All
										</button>
										<button
											type="button"
											onClick={() => setActiveFilter("scheduled")}
											className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
												activeFilter === "scheduled"
													? "bg-primary text-white"
													: "bg-surface-light dark:bg-white/5 text-medium-gray dark:text-white/70 hover:bg-gold/20"
											}`}
										>
											Scheduled
										</button>
										<button
											type="button"
											onClick={() => setActiveFilter("departed")}
											className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
												activeFilter === "departed"
													? "bg-primary text-white"
													: "bg-surface-light dark:bg-white/5 text-medium-gray dark:text-white/70 hover:bg-gold/20"
											}`}
										>
											Departed
										</button>
										<button
											type="button"
											onClick={() => setActiveFilter("delayed")}
											className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
												activeFilter === "delayed"
													? "bg-primary text-white"
													: "bg-surface-light dark:bg-white/5 text-medium-gray dark:text-white/70 hover:bg-gold/20"
											}`}
										>
											Delayed
										</button>
									</div>
								</div>
								<div className="space-y-2">
									<span className="text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70">
										Date Range
									</span>
									<div className="flex items-center gap-2 rounded-md bg-surface-light dark:bg-white/5 px-4 py-3">
										<Calendar className="w-5 h-5 text-medium-gray dark:text-white/50" />
										<span className="text-sm text-charcoal dark:text-white">
											Oct 12 - Oct 19
										</span>
									</div>
								</div>
								<button
									type="button"
									className="w-full bg-primary text-white font-bold py-4 rounded-md shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
								>
									Apply Filters
								</button>
								<button
									type="button"
									className="w-full text-center text-xs font-bold text-medium-gray dark:text-white/50 hover:text-primary dark:hover:text-white transition-colors"
								>
									Clear all filters
								</button>
							</div>
						</div>

						<div className="rounded-md bg-primary p-8 text-white shadow-soft relative overflow-hidden">
							<div className="relative z-10">
								<div className="flex items-center gap-2 mb-1">
									{/* <Medal className="w-4 h-4 text-gold" fill="#d4af37" /> */}
									<p className="text-gold text-sm font-bold uppercase tracking-widest">
										Loyalty Program
									</p>
								</div>
								<h4 className="font-serif text-2xl font-black mb-3">
									MilleMiglia Gold
								</h4>
								<p className="text-white/80 text-sm mb-6">
									You are 2,400 miles away from your next reward tier.
								</p>
								<button
									type="button"
									className="rounded-md bg-gold px-6 py-3 text-sm font-bold text-primary hover:bg-white transition-colors"
								>
									View Benefits
								</button>
							</div>
							<Medal
								className="absolute -bottom-full -right-4 text-[10rem] w-24 text-white/10 opacity-50"
								fill="currentColor"
							/>
						</div>
					</aside>

					<section className="lg:col-span-8 flex flex-col gap-8">
						<div className="flex items-center justify-between">
							<span className="text-sm font-semibold text-primary dark:text-white bg-primary/10 dark:bg-white/10 px-4 py-2 rounded-full">
								{data?.length || 0} Flights Found
							</span>
							<button
								type="button"
								className="flex items-center gap-2 rounded-md border border-primary/20 bg-white dark:bg-white/5 dark:border-white/10 px-5 py-2.5 text-sm font-bold text-primary dark:text-white hover:bg-surface-light dark:hover:bg-white/10 transition-colors"
							>
								<Download className="w-5 h-5" fill="currentColor" />
								Export Report (CSV)
							</button>
						</div>

						<div className="overflow-hidden rounded-md border border-primary/5 dark:border-white/10 bg-box-light dark:bg-box-dark shadow-soft">
							<table className="w-full text-left">
								<thead>
									<tr className="bg-surface-light/50 dark:bg-white/5 border-b border-primary/5 dark:border-white/10">
										<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70">
											Flight No.
										</th>
										<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70">
											Origin
										</th>
										<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70">
											Destination
										</th>
										<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70">
											Departure
										</th>
										<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70">
											Arrival
										</th>
										<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70">
											Status
										</th>
										<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70"></th>
									</tr>
								</thead>
								<tbody className="divide-y divide-primary/5 dark:divide-white/10">
									{data && data.length > 0 ? (
										data.map((flight) => {
											const statusStyles = getStatusStyles(flight.status);
											return (
												<tr
													key={flight.id}
													className="hover:bg-surface-light/50 dark:hover:bg-white/5 transition-colors"
												>
													<td className="px-6 py-5">
														<span className="font-bold text-primary dark:text-white">
															{flight.flight_number}
														</span>
													</td>
													<td className="px-6 py-5">
														<div className="flex flex-col">
															<span className="font-bold text-charcoal dark:text-white">
																{flight.origin.city}
															</span>
															<span className="text-xs text-medium-gray dark:text-white/50">
																{flight.origin.code}
															</span>
														</div>
													</td>
													<td className="px-6 py-5">
														<div className="flex flex-col">
															<span className="font-bold text-charcoal dark:text-white">
																{flight.destination.city}
															</span>
															<span className="text-xs text-medium-gray dark:text-white/50">
																{flight.destination.code}
															</span>
														</div>
													</td>
													<td className="px-6 py-5 text-sm text-charcoal dark:text-white/80">
														{flight.departure_time}
													</td>
													<td className="px-6 py-5 text-sm text-charcoal dark:text-white/80">
														{flight.arrival_time}
													</td>
													<td className="px-6 py-5">
														<span
															className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${statusStyles.bg} ${statusStyles.text}`}
														>
															<span
																className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`}
															></span>
															{flight.status}
														</span>
													</td>
													<td className="px-6 py-5 text-right">
														<button
															type="button"
															className="text-medium-gray dark:text-white/50 hover:text-primary dark:hover:text-white transition-colors"
														>
															<MoreVert
																className="w-5 h-5"
																fill="currentColor"
															/>
														</button>
													</td>
												</tr>
											);
										})
									) : (
										<tr>
											<td
												colSpan={7}
												className="px-6 py-12 text-center text-medium-gray dark:text-white/70"
											>
												No flights found.
											</td>
										</tr>
									)}
								</tbody>
							</table>
							<div className="flex items-center justify-between bg-surface-light/30 dark:bg-white/5 px-6 py-4">
								<span className="text-sm text-medium-gray dark:text-white/50">
									Showing {data?.length || 0} flights
								</span>
								<div className="flex gap-2">
									<button
										type="button"
										className="flex h-8 w-8 items-center justify-center rounded border border-primary/10 dark:border-white/10 bg-white dark:bg-white/5 text-medium-gray dark:text-white/50"
									>
										<AngleRight
											className="w-4 h-4 rotate-180"
											fill="currentColor"
										/>
									</button>
									<button
										type="button"
										className="flex h-8 px-3 items-center justify-center rounded border border-primary bg-primary text-xs font-bold text-white"
									>
										1
									</button>
									<button
										type="button"
										className="flex h-8 px-3 items-center justify-center rounded border border-primary/10 dark:border-white/10 bg-white dark:bg-white/5 text-xs font-bold text-medium-gray dark:text-white/50 hover:bg-surface-light dark:hover:bg-white/10"
									>
										2
									</button>
									<button
										type="button"
										className="flex h-8 px-3 items-center justify-center rounded border border-primary/10 dark:border-white/10 bg-white dark:bg-white/5 text-xs font-bold text-medium-gray dark:text-white/50 hover:bg-surface-light dark:hover:bg-white/10"
									>
										3
									</button>
									<button
										type="button"
										className="flex h-8 w-8 items-center justify-center rounded border border-primary/10 dark:border-white/10 bg-white dark:bg-white/5 text-medium-gray dark:text-white/50"
									>
										<AngleRight className="w-4 h-4" fill="currentColor" />
									</button>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="group relative h-56 overflow-hidden rounded-md shadow-soft border border-primary/5 dark:border-white/10">
								<div
									className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
									style={{
										backgroundImage:
											"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrlkW-mj2iqXE7t0YnIF3f-dErlN8QofKIkE8lZXyIGwsh6qFuZjASRN80lNcnFca09z3iks1zlIvIsFpyawX1jMOPJpi4qfzsMhq2QGA1pfPYOSLtL8chILA3svJFPggg65elufjbOaHKT0sUB6NbvNk1pApOK4IzP6BNsMMivKEj6w63d-ZlVmf1F2V7XX1tGXOZQlY39rF-CLlLaNFDz9Sc0fHWG18CoZImt67s_D9qX6wBU7dkJjPwEejgLsOBZlUa4klwBkk')",
									}}
								></div>
								<div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent"></div>
								<div className="absolute bottom-6 left-6">
									<h4 className="font-serif text-xl font-bold text-white">
										Fleet Performance
									</h4>
									<p className="text-white/80 text-sm">
										A320neo Reliability Stats
									</p>
								</div>
							</div>
							<div className="group relative h-56 overflow-hidden rounded-md shadow-soft border border-primary/5 dark:border-white/10">
								<div
									className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
									style={{
										backgroundImage:
											"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsUY-9xA1K38hbtziBiW7pxn9IzLWA_AiIZdh1XoLG5Wk-jI6xd-lIz0OEqkZQJHAUbT3w6LiDHNDujZG4J6mBjAYfFLEmoynL0TJ_-N-1gZSWlnbygsPcsd2QmSHmCjRFBrjrsWzKOLm8lnH8-iQk_GgQKjMZLy5OLSrbHs9YLuO0kcxH0f-Q7jg3Uh33HnbFO179wLm3xVlmZy8KwUnbVeOZvycjdL0KfbOuvwm0lWM9ID1pVSxhBa3eGmMvcBtgsa9MjjG3uNM')",
									}}
								></div>
								<div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent"></div>
								<div className="absolute bottom-6 left-6">
									<h4 className="font-serif text-xl font-bold text-white">
										Route Network
									</h4>
									<p className="text-white/80 text-sm">
										Expanding to Southern Italy
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
