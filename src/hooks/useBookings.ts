import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiClient";

export const useBookings = () => {
	return useQuery({
		queryKey: ["bookings"],
		queryFn: () => apiFetch("/bookings/"),
	});
};
