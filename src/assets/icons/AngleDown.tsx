import type { SVGProps } from "react";
import { iconSize } from ".";

export const AngleDown = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={512}
			height={512}
			{...props}
		>
			<title>Angle-small-down</title>
			<path d="M19.061 7.854a1.5 1.5 0 00-2.122 0l-4.586 4.585a.5.5 0 01-.707 0L7.061 7.854a1.5 1.5 0 00-2.122 2.121l4.586 4.586a3.5 3.5 0 004.95 0l4.586-4.586a1.5 1.5 0 000-2.121z" />
		</svg>
	);
};

export const LightAngleDown = () => <AngleDown fill="#fff" width={iconSize} height={iconSize} />
