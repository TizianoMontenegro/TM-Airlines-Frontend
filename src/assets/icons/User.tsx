import type { SVGProps } from "react";
import { iconSize } from ".";

export const User = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={512}
			height={512}
			{...props}
		>
			<title>User</title>
			<g data-name="01 align center">
				<path d="M21 24h-2v-5.043A2.96 2.96 0 0016.043 16H7.957A2.96 2.96 0 005 18.957V24H3v-5.043A4.963 4.963 0 017.957 14h8.086A4.963 4.963 0 0121 18.957zM12 12a6 6 0 116-6 6.006 6.006 0 01-6 6zm0-10a4 4 0 104 4 4 4 0 00-4-4z" />
			</g>
		</svg>
	);
};

export const LightUser = () => <User fill="#fff" width={iconSize * 2} height={iconSize * 2} />
export const GreenPassenger = () => <User fill="#206035" width={iconSize * 1} height={iconSize * 1} />
