import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

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
			// "Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.detail || "Booking not found");
	}

	return response.json();
};

function ManageBooking() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["booking"],
		queryFn: fetchBooking,
	});

	useEffect(() => console.log(data), [data]); // DELETE IN PRODUCTION

	return (
		<main className="min-h-max flex items-center justify-center px-4 py-10 bg-background-light dark:bg-background-dark">
			<div className="w-full max-w-md bg-box-light dark:bg-box-dark rounded-lg shadow-lg p-8">
				<h1 className="text-3xl font-bold text-center mb-2">
					Manage Your Booking
				</h1>

				<div className="text-center">
					{isLoading && <p className="text-gray-500">Loading...</p>}

					{isError && <p style={{ color: "red" }}>{error?.message}</p>}

					{data && (
						<div className="text-left space-y-2">
							{data.map((booking) => {
								return (
									<div key={booking.id}>
										<p>
											<strong>Book ID:</strong> {booking.id}
										</p>
										<p>
											<strong>Booking Code:</strong> {booking.code}
										</p>
										<p>
											<strong>Created At:</strong> {booking.created_at}
										</p>
										<p>
											<strong>Status:</strong> {booking.status}
										</p>
										<p>
											<strong>User ID:</strong> {booking.user}
										</p>
										<p>
											<strong>Flight ID:</strong> {booking.flight}
										</p>
										{/* <p>
											<strong>Passenger:</strong> {data.passenger_name}
										</p>
										<p>
											<strong>Origin:</strong> {data.flight_details.origin}
										</p>
										<p>
											<strong>Destination:</strong> {data.flight_details.destination}
										</p>
										<p>
											<strong>Departure:</strong> {data.flight_details.departure_time}
										</p>
										<p>
											<strong>Arrival:</strong> {data.flight_details.arrival_time}
										</p> */}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
