import { FC, SVGProps } from 'react'

export const IconSignUpGradient: FC<SVGProps<SVGSVGElement>> = (props) => {
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
				d="M41.9999 16.6667H17.9999C17.2927 16.6667 16.6144 16.9476 16.1143 17.4477C15.6142 17.9478 15.3333 18.6261 15.3333 19.3334V35.3334C15.3333 36.0406 15.6142 36.7189 16.1143 37.219C16.6144 37.7191 17.2927 38 17.9999 38H27.3333V40.6667H24.6666V43.3334H35.3333V40.6667H32.6666V38H41.9999C42.7072 38 43.3854 37.7191 43.8855 37.219C44.3856 36.7189 44.6666 36.0406 44.6666 35.3334V19.3334C44.6666 18.6261 44.3856 17.9478 43.8855 17.4477C43.3854 16.9476 42.7072 16.6667 41.9999 16.6667ZM41.9999 26H32.6666V28.6667H41.9999V35.3334H17.9999V28.6667H24.6666V32.6667L29.9999 27.3334L24.6666 22V26H17.9999V19.3334H41.9999V26Z"
				fill="black"
			/>
			<rect
				x="1.5"
				y="1.5"
				width="57"
				height="57"
				rx="28.5"
				stroke="url(#paint0_linear_44_13)"
				strokeWidth="3"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_44_13"
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
