import { FC, SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
	gradientId?: number
}

export const IconControlUpGr: FC<Props> = ({ gradientId, ...rest }) => {
	return (
		<svg
			{...rest}
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M10 25L20 15L30 25"
				stroke={`url(#paint0_linear_589_148${gradientId || 8})`}
			/>
			<rect
				x="0.5"
				y="0.5"
				width="39"
				height="39"
				rx="19.5"
				stroke={`url(#paint1_linear_589_148${gradientId || 8})`}
			/>
			<defs>
				<linearGradient
					id={`paint0_linear_589_148${gradientId || 8}`}
					x1="10"
					y1="20"
					x2="30"
					y2="20"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#00F0FF" />
					<stop offset="1" stopColor="#00FF1A" />
				</linearGradient>
				<linearGradient
					id={`paint1_linear_589_148${gradientId || 8}`}
					x1="0"
					y1="20"
					x2="40"
					y2="20"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#00F0FF" />
					<stop offset="1" stopColor="#00FF1A" />
				</linearGradient>
			</defs>
		</svg>
	)
}
