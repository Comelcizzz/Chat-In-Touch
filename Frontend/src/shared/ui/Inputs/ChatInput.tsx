import { styled } from '@mui/material'
import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'

const StyledInputWrapper = styled('div')`
	width: 100%;
	position: relative;
	font-size: 15px;
	padding: 9px;
	background-clip: padding-box;
	display: inline-block;

	&::before {
		width: 100%;
		padding: 2px;
		position: absolute;
		inset: 0;
		background: var(--gr-primary);
		-webkit-mask: linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		content: '';
		z-index: -1;
		border-radius: 10px;
	}
`

const StyledInput = styled('input')`
	width: 100%;
	background: transparent;
`

const StyledError = styled('p')`
	position: absolute;
	color: var(--text-danger);
	padding-top: 10px;
	font-size: 10px;
	left: 0;
`

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string
	children?: ReactNode
}

export const ChatInput = forwardRef<HTMLInputElement, InputProps>(
	({ error, children, ...rest }, ref) => {
		return (
			<StyledInputWrapper>
				{children}
				<StyledInput autoComplete="off" {...rest} ref={ref} />
				{error && <StyledError>{error}</StyledError>}
			</StyledInputWrapper>
		)
	}
)
