import { FC, SVGProps } from 'react'

export const IconControlDown: FC<SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			{...props}
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path  d="M10 15L20 25L30 15" stroke="white" />
			<rect
				x="0.5"
				y="-0.5"
				width="39"
				height="39"
				rx="19.5"
				transform="matrix(1 0 0 -1 0 39)"
				stroke="white"
			/>
		</svg>
	)
}


