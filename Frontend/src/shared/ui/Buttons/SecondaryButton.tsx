import { mobileXS } from '@/shared/lib/constants/media'
import { styled } from '@mui/material'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

const StyledButton = styled('button')<{ isAuth?: boolean }>`
	width: 100%;
	position: relative;
	font-size: ${(props) => (props.isAuth ? 15 : 22)}px;
	padding: ${(props) => (props.isAuth ? 9 : 18)}px;
	background-clip: padding-box;
	display: inline-block;
	background-image: var(--gr-primary);
	border-radius: ${(props) => (props.isAuth ? 10 : 20)}px;
	background-repeat: no-repeat;
	transition: background-size 0.3s ease-in-out, box-shadow 0.3s ease,
		color 0.5s ease;
	background-size: 0%;

	&::before {
		width: 100%;
		padding: ${(props) => (props.isAuth ? 2 : 3)}px;
		position: absolute;
		inset: 0;
		background: var(--gr-primary);
		-webkit-mask: linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		content: '';
		z-index: 1;
		border-radius: ${(props) => (props.isAuth ? 10 : 20)}px;
	}

	&:hover {
		background-size: 100%;
		box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.2);
		color: var(--text-black);
	}

	@media ${mobileXS} {
		font-size: ${(props) => (props.isAuth ? 14 : 20)}px;
		padding: ${(props) => (props.isAuth ? 8 : 16)}px;
	}
`

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isAuth?: boolean
	children: ReactNode
}

export const SecondaryButton: FC<SecondaryButtonProps> = ({
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
