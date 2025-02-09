import { FC, SVGProps } from 'react'

export const IconBack: FC<SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			{...props}
			width="11"
			height="20"
			viewBox="0 0 11 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10 19L1 10L10 1" stroke="white" />
		</svg>
	)
}
