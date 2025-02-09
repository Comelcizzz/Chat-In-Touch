import { FC, SVGProps } from 'react'

export const IconSearchGradient: FC<SVGProps<SVGSVGElement>> = (props) => {
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
				d="M42 42L36.2094 36.2093M36.2094 36.2093C37.1999 35.2188 37.9856 34.0429 38.5217 32.7487C39.0577 31.4545 39.3336 30.0674 39.3336 28.6666C39.3336 27.2658 39.0577 25.8787 38.5217 24.5846C37.9856 23.2904 37.1999 22.1145 36.2094 21.124C35.2188 20.1335 34.0429 19.3477 32.7488 18.8117C31.4546 18.2756 30.0675 17.9997 28.6667 17.9997C27.2659 17.9997 25.8788 18.2756 24.5846 18.8117C23.2905 19.3477 22.1145 20.1335 21.124 21.124C19.1236 23.1244 17.9998 25.8376 17.9998 28.6666C17.9998 31.4957 19.1236 34.2089 21.124 36.2093C23.1245 38.2097 25.8376 39.3336 28.6667 39.3336C31.4957 39.3336 34.2089 38.2097 36.2094 36.2093Z"
				stroke="black"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="1.5"
				y="1.5"
				width="57"
				height="57"
				rx="28.5"
				stroke="url(#paint0_linear_44_114)"
				strokeWidth="3"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_44_114"
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
