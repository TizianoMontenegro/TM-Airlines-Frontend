import type { SVGProps } from "react";
import { iconSize } from ".";

export const Camera = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={512}
			height={512}
			{...props}
		>
			<title>Photos</title>
			<g data-name="01 align center">
				<path d="M21 4h-2.508l-3.086-4H8.593L5.508 4H3a3 3 0 00-3 3v17h24V7a3 3 0 00-3-3zM9.577 2h4.847l1.542 2H8.034zM22 22H2V7a1 1 0 011-1h18a1 1 0 011 1z" />
				<path d="M12 8a6 6 0 106 6 6.006 6.006 0 00-6-6zm0 10a4 4 0 114-4 4 4 0 01-4 4z" />
			</g>
		</svg>
	);
};

export const LightCamera = () => <Camera fill="#fff" width={iconSize * 1.4} height={iconSize * 1.4} />
