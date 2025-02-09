import { FC, SVGProps } from 'react'

export const IconChecked: FC<SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			{...props}
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3 15.6667L11.6667 24.3333L29 7"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
