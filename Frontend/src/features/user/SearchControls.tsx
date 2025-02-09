import { styled } from '@mui/material'
import { IconControlDown, IconControlUp } from '@/shared/assets/icons'
import { FC } from 'react'
import { HookHandlers } from '@/entities/user/hooks/useControls'
import { mobileXS } from '@/shared/lib/constants/media'
import { IconControlUpGr } from '@/shared/assets/icons/IconControlUpGr'
import { IconControlDownGr } from '@/shared/assets/icons/IconControlDownGr'

const ControlsWrapper = styled('div')`
	display: flex;
	gap: 12px;

	@media ${mobileXS} {
		gap: 10px;
	}
`

const StyledControl = styled('button')`
	@media ${mobileXS} {
		> svg {
			width: 36px;
			height: 36px;
		}
	}
`

interface SearchControlsProps {
	upHandlers: HookHandlers
	downHandlers: HookHandlers
	className?: string
	filled?: boolean
	gradientId?: number
}

export const SearchControls: FC<SearchControlsProps> = ({
	upHandlers,
	downHandlers,
	className,
	filled,
	gradientId,
}) => {
	return (
		<ControlsWrapper className={className}>
			<StyledControl {...upHandlers}>
				{filled ? (
					<IconControlUpGr gradientId={gradientId} />
				) : (
					<IconControlUp />
				)}
			</StyledControl>
			<StyledControl {...downHandlers}>
				{filled ? (
					<IconControlDownGr gradientId={gradientId} />
				) : (
					<IconControlDown />
				)}
			</StyledControl>
		</ControlsWrapper>
	)
}
