import type { SVGProps } from "react";
import { iconSize } from ".";

export const Medal = (props: SVGProps<SVGSVGElement>) => {
	return (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		data-name="Layer 1"
		viewBox="0 0 24 24"
		{...props}
	>
		<title>Medal</title>
		<path d="M23.98 0h-9.09l-2.883 5.826L9.133 0H.031l4.751 9.63A8.952 8.952 0 003 15c0 4.962 4.038 9 9 9s9-4.038 9-9a8.953 8.953 0 00-1.783-5.371L23.98 0zm-7.848 2h4.627l-3.01 6.082a8.968 8.968 0 00-3.712-1.849L16.132 2zM7.889 2l2.086 4.23a8.973 8.973 0 00-3.727 1.853L3.248 2H7.89zm4.11 20c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1.418-8.5h3.582v.742l-2.744 1.63 1.154 3.135-.635.443-2.762-2.136-2.773 2.145-.611-.46 1.074-3.175L7 14.246v-.747h3.602l.997-3.528h.822l.996 3.528z" />
	</svg>
	)
}
export const YellowMedal = () => <Medal fill="#d4af37" width={iconSize} height={iconSize} />
export const YellowMedal2 = () => <Medal fill="#d4af37" width={iconSize * 2} height={iconSize * 2} />
