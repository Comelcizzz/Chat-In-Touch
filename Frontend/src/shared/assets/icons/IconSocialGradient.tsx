import { FC, SVGProps } from 'react'

export const IconSocialGradient: FC<SVGProps<SVGSVGElement>> = (props) => {
	return (
		<svg
			{...props}
			width="60"
			height="60"
			viewBox="0 0 60 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M40.6667 16.6667H19.3334C17.8667 16.6667 16.6667 17.8667 16.6667 19.3334V43.3334L22.0001 38H40.6667C42.1334 38 43.3334 36.8 43.3334 35.3334V19.3334C43.3334 17.8667 42.1334 16.6667 40.6667 16.6667ZM40.6667 35.3334H20.9334L19.3334 36.9334V19.3334H40.6667V35.3334Z"
				fill="black"
			/>
			<rect
				x="1.5"
				y="1.5"
				width="57"
				height="57"
				rx="28.5"
				stroke="url(#paint0_linear_44_102)"
				strokeWidth="3"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_44_102"
					x1="30"
					y1="0"
					x2="30"
					y2="60"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#00F0FF" />
					<stop offset="1" stopColor="#00FF1A" />
				</linearGradient>
			</defs>
		</svg>
	)
}
