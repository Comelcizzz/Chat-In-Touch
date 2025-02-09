import { FC, SVGProps } from 'react'

export const IconControlUp: FC<SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			{...props}
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10 25L20 15L30 25" stroke="white" />
			<rect
				x="0.5"
				y="0.5"
				width="39"
				height="39"
				rx="19.5"
				stroke="white"
			/>
		</svg>
	)
}
