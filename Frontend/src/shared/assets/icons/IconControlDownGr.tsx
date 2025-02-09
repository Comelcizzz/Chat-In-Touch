import { FC, SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
	gradientId?: number
}

export const IconControlDownGr: FC<Props> = ({ gradientId, ...rest }) => {
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
				d="M10 15L20 25L30 15"
				stroke={`url(#paint0_linear_589_149${gradientId ?? 0})`}
			/>
			<rect
				x="0.5"
				y="-0.5"
				width="39"
				height="39"
				rx="19.5"
				transform="matrix(1 0 0 -1 0 39)"
				stroke={`url(#paint1_linear_589_149${gradientId ?? 0})`}
			/>
			<defs>
				<linearGradient
					id={`paint0_linear_589_149${gradientId ?? 0}`}
					x1="30"
					y1="20"
					x2="10"
					y2="20"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#00FF1A" />
					<stop offset="1" stopColor="#00F0FF" />
				</linearGradient>
				<linearGradient
					id={`paint1_linear_589_149${gradientId ?? 0}`}
					x1="40"
					y1="20"
					x2="0"
					y2="20"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#00FF1A" />
					<stop offset="1" stopColor="#00F0FF" />
				</linearGradient>
			</defs>
		</svg>
	)
}
