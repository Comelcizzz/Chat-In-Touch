import { IconCross } from '@/shared/assets/icons'
import { mobileXS } from '@/shared/lib/constants/media'
import { ButtonBase, styled, ButtonProps } from '@mui/material'
import { FC } from 'react'

const StyledCloseButton = styled(ButtonBase)`
	background: var(--bg-white);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 100px;
	padding: 13px;
	transition: opacity 0.2s ease-out;
	@media ${mobileXS} {
		padding: 10px;
		> svg {
			width: 20px;
			height: 20px;
		}
	}
`

export const CloseButton: FC<ButtonProps> = (props) => {
	return (
		<StyledCloseButton {...props}>
			<IconCross />
		</StyledCloseButton>
	)
}
