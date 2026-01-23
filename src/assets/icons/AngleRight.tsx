import type { SVGProps } from "react";
import { iconSize } from ".";

export const AngleRight = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={512}
			height={512}
			{...props}
		>
			<title>Angle-small-right</title>
			<path d="M15.75 9.525l-4.586-4.586a1.5 1.5 0 00-2.121 2.122l4.586 4.585a.5.5 0 010 .708l-4.586 4.585a1.5 1.5 0 002.121 2.122l4.586-4.586a3.505 3.505 0 000-4.95z" />
		</svg>
	);
};

export const GreenAngleRight = () => <AngleRight fill="#206035" width={iconSize * 2} height={iconSize * 2} />
