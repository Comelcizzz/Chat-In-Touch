import { styled } from '@mui/material'
import { FC, HTMLProps } from 'react'

const StyledText = styled('p')<{ Size: number }>`
	color: var(--text-white);
	font-family: 'Stolzl';
	font-size: ${(props) => props.Size}px;
	line-height: 150%;
	letter-spacing: 0.02em;
`

interface TextProps extends HTMLProps<HTMLParagraphElement> {
	Size: number
	text: string
}

export const Text: FC<TextProps> = ({ Size, text }) => {
	return <StyledText Size={Size}>{text}</StyledText>
}
