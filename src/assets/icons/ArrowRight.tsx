import type { SVGProps } from "react";
import { iconSize } from ".";

export const ArrowRight = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={512}
			height={512}
			{...props}
		>
			<title>Arrow-right</title>
			<path d="M18 12a2 2 0 00-.59-1.4l-4.29-4.3a1 1 0 00-1.41 0 1 1 0 000 1.42L15 11H5a1 1 0 000 2h10l-3.29 3.29a1 1 0 001.41 1.42l4.29-4.3A2 2 0 0018 12z" />
		</svg>
	);
};

export const LightArrowRight = () => <ArrowRight fill="#fff" width={iconSize * 2} height={iconSize * 2} />
