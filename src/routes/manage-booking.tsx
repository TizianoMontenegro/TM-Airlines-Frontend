import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";
import {
	GreenAngleRight,
	LightArrowRight,
	SmallClock,
	SmallSync,
	SmallUserCheck,
	YellowMedal2,
} from "@/assets/icons";

export const Route = createFileRoute("/manage-booking")({
	component: ManageBooking,
});

interface Booking {
	id: number;
	code: string;
	created_at: string;
	flight: number;
	status: string;
	user: number;
}

type BookingResponse = Booking[];

const fetchBooking = async (): Promise<BookingResponse> => {
	const accessToken = localStorage.getItem("accessToken");
	const response = await fetch("http://127.0.0.1:8000/api/v1/bookings/", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.detail || "Booking not found");
	}

	return response.json();
};

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
		year: "numeric",
	};
	return date.toLocaleDateString("en-GB", options);
};

const getStatusStyles = (status: string): string => {
	switch (status.toLowerCase()) {
		case "confirmed":
			return "bg-green-100 text-green-800";
		case "pending":
			return "bg-gold/20 text-charcoal";
		default:
			return "bg-gray-100 text-gray-800";
	}
};

function ManageBooking() {
	const navigate = useNavigate();
	const bookingRefId = useId();
	const lastNameId = useId();

	const [searchRef, setSearchRef] = useState("");
	const [lastName, setLastName] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			navigate({ to: "/auth/login" });
		}
	}, [navigate]);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["booking"],
		queryFn: fetchBooking,
	});

	useEffect(() => console.log(data), [data]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Searching for:", searchRef, lastName);
	};

	const customIconSize1 = 14;

	return (
		<main className="min-h-screen bg-background-light dark:bg-background-dark px-6 lg:px-20 py-12">
			<div className="max-w-7xl mx-auto">
				<section className="mb-16">
					<h2 className="text-4xl md:text-5xl font-black mb-4 text-primary dark:text-white">
						Manage Your Journey
					</h2>
					<p className="text-medium-gray dark:text-white/70 text-lg max-w-2xl leading-relaxed">
						Refine your travel details, enhance your experience with premium
						add-ons, or simply prepare for your upcoming flight across the
						Italian peninsula and beyond.
					</p>
				</section>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					<div className="lg:col-span-4">
						<div className="bg-box-light dark:bg-box-dark p-8 rounded-md shadow-soft border border-primary/5 dark:border-white/10 sticky top-32">
							<h3 className="text-2xl font-black mb-6 text-primary dark:text-white">
								Find My Booking
							</h3>
							<form className="space-y-5" onSubmit={handleSearch}>
								<div className="space-y-2">
									<label
										className="text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70"
										htmlFor={bookingRefId}
									>
										Booking Reference
									</label>
									<input
										className="w-full px-4 py-3 bg-surface-light dark:bg-white/5 border-none rounded-md focus:ring-2 focus:ring-primary/20 text-charcoal dark:text-white placeholder:text-medium-gray/50 dark:placeholder:text-white/30"
										id={bookingRefId}
										placeholder="e.g. AZ789X"
										type="text"
										value={searchRef}
										onChange={(e) => setSearchRef(e.target.value)}
									/>
								</div>
								<div className="space-y-2">
									<label
										className="text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70"
										htmlFor={lastNameId}
									>
										Last Name
									</label>
									<input
										className="w-full px-4 py-3 bg-surface-light dark:bg-white/5 border-none rounded-md focus:ring-2 focus:ring-primary/20 text-charcoal dark:text-white placeholder:text-medium-gray/50 dark:placeholder:text-white/30"
										id={lastNameId}
										placeholder="Rossi"
										type="text"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</div>
								<button
									className="w-full bg-primary text-white font-bold py-4 rounded-md shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
									type="submit"
								>
									<span>Search Booking</span>
									<LightArrowRight />
								</button>
							</form>
							<div className="mt-6 pt-6 border-t border-primary/5 dark:border-white/10">
								<p className="text-xs text-medium-gray dark:text-white/50 italic leading-relaxed">
									Need help? Contact our premium concierge at{" "}
									<span className="text-primary dark:text-white font-bold">
										1-800-TMAIRLINES
									</span>
								</p>
							</div>
						</div>
					</div>

					<div className="lg:col-span-8 space-y-12">
						<section>
							<div className="flex items-center justify-between mb-6">
								<h3 className="text-2xl font-black text-primary dark:text-white">
									My Bookings
								</h3>
								<span className="text-sm font-semibold text-primary dark:text-white bg-primary/10 px-3 py-1 rounded-full">
									{data ? `${data.length} Active Trips` : "0 Active Trips"}
								</span>
							</div>
							<div className="overflow-hidden bg-box-light dark:bg-box-dark rounded-md shadow-soft border border-primary/5 dark:border-white/10">
								{isLoading ? (
									<div className="p-8 text-center text-medium-gray dark:text-white/70">
										Loading...
									</div>
								) : isError ? (
									<div className="p-8 text-center text-accent-red">
										{error?.message}
									</div>
								) : data && data.length > 0 ? (
									<table className="w-full text-left">
										<thead>
											<tr className="bg-surface-light dark:bg-white/5 border-b border-primary/5 dark:border-white/10">
												<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70">
													Booking Code
												</th>
												<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70">
													Created At
												</th>
												<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70">
													Destination
												</th>
												<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-medium-gray dark:text-white/70 text-right">
													Status
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-primary/5 dark:divide-white/10">
											{data.map((booking) => (
												<tr
													key={booking.id}
													className="hover:bg-surface-light/50 dark:hover:bg-white/5 transition-colors"
												>
													<td className="px-6 py-5 font-bold text-primary dark:text-white">
														{booking.code}
													</td>
													<td className="px-6 py-5 text-sm text-medium-gray dark:text-white/70">
														{formatDate(booking.created_at)}
													</td>
													<td className="px-6 py-5 text-sm font-medium dark:text-white">
														Flight #{booking.flight}
													</td>
													<td className="px-6 py-5 text-right">
														<span
															className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
																booking.status,
															)}`}
														>
															{booking.status}
														</span>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								) : (
									<div className="p-8 text-center text-medium-gray dark:text-white/70">
										No bookings found. Search for a booking using your reference
										code.
									</div>
								)}
							</div>
						</section>

						<section>
							<h3 className="text-2xl font-black mb-8 text-primary dark:text-white">
								Enhance Your Experience
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="group bg-box-light dark:bg-box-dark p-6 rounded-md shadow-soft hover:shadow-soft-hover border border-primary/5 dark:border-white/10 transition-all cursor-pointer">
									<div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
										<SmallUserCheck />
									</div>
									<h4 className="text-xl font-black mb-3 text-primary dark:text-white">
										Check-in
									</h4>
									<p className="text-medium-gray dark:text-white/70 text-sm leading-relaxed mb-4">
										Secure your boarding pass and choose your favorite seat up
										to 48h before flight.
									</p>
									<span className="text-primary dark:text-white text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1">
										Start now{" "}
										<GreenAngleRight
											width={customIconSize1}
											height={customIconSize1}
										/>
									</span>
								</div>

								<div className="group bg-box-light dark:bg-box-dark p-6 rounded-md shadow-soft hover:shadow-soft-hover border border-primary/5 dark:border-white/10 transition-all cursor-pointer">
									<div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
										<SmallClock />
									</div>
									<h4 className="text-xl font-black mb-3 text-primary dark:text-white">
										Flight Status
									</h4>
									<p className="text-medium-gray dark:text-white/70 text-sm leading-relaxed mb-4">
										Real-time updates on arrivals, departures, and gate
										information across our network.
									</p>
									<span className="text-primary dark:text-white text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1">
										Track flight{" "}
										<GreenAngleRight
											width={customIconSize1}
											height={customIconSize1}
										/>
									</span>
								</div>

								<div className="group bg-box-light dark:bg-box-dark p-6 rounded-md shadow-soft hover:shadow-soft-hover border border-primary/5 dark:border-white/10 transition-all cursor-pointer">
									<div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
										<SmallSync />
									</div>
									<h4 className="text-xl font-black mb-3 text-primary dark:text-white">
										Change Flight
									</h4>
									<p className="text-medium-gray dark:text-white/70 text-sm leading-relaxed mb-4">
										Modify your travel dates or destinations with our flexible
										rebooking options.
									</p>
									<span className="text-primary dark:text-white text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1">
										Modify trip{" "}
										<GreenAngleRight
											width={customIconSize1}
											height={customIconSize1}
										/>
									</span>
								</div>

								<div className="group bg-box-light dark:bg-box-dark p-6 rounded-md shadow-soft hover:shadow-soft-hover border border-primary/5 dark:border-white/10 transition-all cursor-pointer relative overflow-hidden">
									<div className="absolute top-0 right-0 bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-tighter rounded-bl-md">
										Premium
									</div>
									<div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
										<YellowMedal2 />
									</div>
									<h4 className="text-xl font-black mb-3 text-primary dark:text-white">
										Upgrade
									</h4>
									<p className="text-medium-gray dark:text-white/70 text-sm leading-relaxed mb-4">
										Indulge in extra comfort. Bid for an upgrade or use your
										points for Business Class.
									</p>
									<span className="text-primary dark:text-white text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1">
										Bid now{" "}
										<GreenAngleRight
											width={customIconSize1}
											height={customIconSize1}
										/>
									</span>
								</div>
							</div>
						</section>

						<section className="mt-24 bg-primary rounded-md overflow-hidden flex flex-col md:flex-row items-center">
							<div className="flex-1 p-12 text-white">
								<h3 className="text-3xl font-black mb-4">Stay Connected</h3>
								<p className="text-white/80 mb-8 max-w-md">
									Receive real-time updates on your flight and exclusive offers
									for your next trips to Italy.
								</p>
								<div className="flex gap-4">
									<input
										className="flex-1 px-6 py-4 rounded-md bg-white/10 border-white/20 text-white placeholder:text-white/50 outline-none focus:ring-1 focus:ring-gold"
										placeholder="Your email"
										type="email"
									/>
									<button
										className="px-8 py-4 bg-gold text-primary font-bold rounded-md hover:bg-white transition-colors"
										type="button"
									>
										Subscribe
									</button>
								</div>
							</div>
							<div className="w-full md:w-1/3 h-64 md:h-full relative">
								<img
									alt="Breathtaking view of the Italian coast from an airplane window"
									className="absolute inset-0 w-full h-full object-cover opacity-80"
									src="https://i.postimg.cc/kG2RmKdV/Image_fx_(11).jpg"
								/>
								<div className="absolute inset-0 bg-linear-to-r from-primary to-transparent"></div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
}
