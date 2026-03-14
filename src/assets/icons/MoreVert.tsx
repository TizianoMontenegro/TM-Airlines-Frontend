import type { SVGProps } from "react";

export const MoreVert = (props: SVGProps<SVGSVGElement>) => {
	const fill = props.fill || "#000000";
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			width={512}
			height={512}
			{...props}
		>
			<title>MoreVert</title>
			<path
				fill={fill}
				d="M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM10 19a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
			/>
		</svg>
	);
};
