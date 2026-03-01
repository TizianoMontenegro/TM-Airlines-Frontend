import type { SVGProps } from "react";
import { iconSize } from ".";

export const Sync = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			width={512}
			height={512}
			{...props}
		>
			<title>Sync</title>
			<path
				d="M19 15.9999L4 15.9999M4 15.9999L7 12.9999M4 15.9999L7.00006 19M5 7.99994L20 7.99994M20 7.99994L17.0001 5M20 7.99994L17.0001 10.9999"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const SmallSync = ({
	width,
	height,
	...props
}: { width?: number; height?: number } & Omit<
	SVGProps<SVGSVGElement>,
	"width" | "height"
>) => (
	<Sync
		width={width ?? iconSize * 2}
		height={height ?? iconSize * 2}
		{...props}
	/>
);
