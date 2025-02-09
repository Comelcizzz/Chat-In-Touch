import { mobileXS } from '@/shared/lib/constants/media'
import { styled } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

const CardWrapper = styled('div')`
	background: var(--bg-white);

	max-width: 340px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 24px;

	@media ${mobileXS} {
		border-radius: 12px;
		> svg {
			width: 54px;
			height: 54px;
		}
	}
`
const CardTitle = styled('p')`
	font-size: 20px;
	line-height: 150%;

	@media ${mobileXS} {
		font-size: 18px;
	}
`

interface titleCardProps {
	title: string
}

export const TitleCard: FC<PropsWithChildren<titleCardProps>> = ({
	children,
	title,
}) => {
	return (
		<CardWrapper>
			{children}
			<CardTitle>{title}</CardTitle>
		</CardWrapper>
	)
}
