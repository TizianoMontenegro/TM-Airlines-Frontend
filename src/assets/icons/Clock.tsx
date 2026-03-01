import type { SVGProps } from "react";
import { iconSize } from ".";

export const Clock = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			width={512}
			height={512}
			{...props}
		>
			<title>Clock</title>
			<path
				d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const SmallClock = ({
	width,
	height,
	...props
}: { width?: number; height?: number } & Omit<
	SVGProps<SVGSVGElement>,
	"width" | "height"
>) => (
	<Clock
		width={width ?? iconSize * 2}
		height={height ?? iconSize * 2}
		{...props}
	/>
);
