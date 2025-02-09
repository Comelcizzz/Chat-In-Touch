import { PrimaryButton } from '@/shared/ui/Buttons'
import { SecondaryButton } from '@/shared/ui/Buttons'
import { styled } from '@mui/material'
import { FC } from 'react'

interface NavBlockProps {
	onClickLogin: () => void
	onClickRegister: () => void
}

const NavBlockWrapper = styled('div')`
	padding-top: 92px;
	width: 100%;
	max-width: 340px;
	text-align: center;
	margin: 0 auto;
`

const StyledText = styled('p')`
	padding: 8px;
	font-size: 20px;
	line-height: 150%;
	color: #424242;
`

export const NavBlock: FC<NavBlockProps> = ({
	onClickLogin,
	onClickRegister,
}) => {
	return (
		<NavBlockWrapper>
			<PrimaryButton onClick={onClickLogin}>Sign in</PrimaryButton>
			<StyledText>or</StyledText>
			<SecondaryButton onClick={onClickRegister}>Sign up</SecondaryButton>
		</NavBlockWrapper>
	)
}
