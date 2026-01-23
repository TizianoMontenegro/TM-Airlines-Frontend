import type { SVGProps } from "react";
import { iconSize } from ".";

export const Calendar = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={512}
			height={512}
			{...props}
		>
			<title>Calendar</title>
			<g data-name="01 align center">
				<path d="M21 2h-3V0h-2v2H8V0H6v2H3a3 3 0 00-3 3v19h24V5a3 3 0 00-3-3zM2 5a1 1 0 011-1h18a1 1 0 011 1v3H2zm0 17V10h20v12z" />
				<path d="M15 13H17V15H15z" />
				<path d="M11 13H13V15H11z" />
				<path d="M7 13H9V15H7z" />
				<path d="M15 17H17V19H15z" />
				<path d="M11 17H13V19H11z" />
				<path d="M7 17H9V19H7z" />
			</g>
		</svg>
	);
};

export const GreenCalendar = () => (
	<Calendar fill="#206035" width={iconSize * 1} height={iconSize * 1} />
);
