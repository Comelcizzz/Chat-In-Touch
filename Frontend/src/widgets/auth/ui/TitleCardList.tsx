import { TitleCard } from '@/entities/auth/ui'
import { keyframes, styled } from '@mui/material'
import { FC } from 'react'
import { svgList } from '../config/data'
import { mobileXS } from '@/shared/lib/constants/media'

const appear = keyframes`
	from {
		opacity:0;
     	transform: translateY(100%)}

	to {
		opacity: 1;
		transform: translateY(0);
	}
`

const StyledList = styled('div')<{ hidden: boolean }>`
	margin-top: 30px;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, minmax(154px, 340px));
	grid-template-rows: 240px;
	justify-content: center;
	align-content: center;
	gap: 23px;
	transition: all 0.2s ease-in-out;
	animation: ${appear} 0.3s ease-in-out;
	transform: translateY(${(props) => (props.hidden ? '100%' : 0)});
	opacity: ${(props) => (props.hidden ? 0 : 1)};

	@media ${mobileXS} {
		grid-template-columns: repeat(2, minmax(130px, 154px));
		grid-template-rows: 180px 133px;
		gap: 12px;
		margin-top: 40px;

		div:last-child {
			grid-column: span 2;
		}
	}
`

interface TitleCardListProps {
	hidden: boolean
}

export const TitleCardsList: FC<TitleCardListProps> = ({ hidden }) => {
	return (
		<StyledList hidden={hidden}>
			{svgList.map(({ title, svg }) => (
				<TitleCard key={title} title={title}>
					{svg}
				</TitleCard>
			))}
		</StyledList>
	)
}
