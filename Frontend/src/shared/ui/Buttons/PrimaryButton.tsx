import { mobileXS } from '@/shared/lib/constants/media'
import { ButtonBase, styled, ButtonProps } from '@mui/material'
import { FC } from 'react'

const StyledButton = styled(ButtonBase)<{ isAuth?: boolean }>`
	font-size: ${(props) => (props.isAuth ? 15 : 22)}px;
	border-radius: ${(props) => (props.isAuth ? 10 : 20)}px;
	width: 100%;
	padding: ${(props) => (props.isAuth ? '9px 0' : '18px 0')};
	color: var(--text-black);
	background-image: var(--gr-primary);
	background-position: center;
	background-size: 100%;
	transition: box-shadow 0.3s ease, background-size 0.3s ease-in-out,
		background-position 0.3s ease-in-out;

	&:hover {
		box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.2);
		background-size: 250%;
		background-position: left;
	}

	@media ${mobileXS} {
		font-size: ${(props) => (props.isAuth ? 14 : 20)}px;
		padding: ${(props) => (props.isAuth ? '8px 0' : '16px 0')};
	}
`

interface PrimaryButtonProps extends ButtonProps {
	isAuth?: boolean
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
	children,
	isAuth,
	...rest
}) => {
	return (
		<StyledButton isAuth={isAuth} {...rest}>
			{children}
		</StyledButton>
	)
}
