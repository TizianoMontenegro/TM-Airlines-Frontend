export type Flights = Flight[];

export interface Flight {
	id: number;
	origin: Origin;
	destination: Destination;
	flight_number: string;
	departure_time: string;
	arrival_time: string;
	status: string;
}

export interface Origin {
	id: number;
	code: string;
	city: string;
	country: string;
}

export interface Destination {
	id: number;
	code: string;
	city: string;
	country: string;
}
