import { styled } from '@mui/material'

interface EllipseProps {
	size: number
	top?: number
	right?: number
	blur?: number
	opacity?: number
	maxWidth?: number
	position?: string
}

export const Ellipse = styled('div')<EllipseProps>`
	background: rgba(116, 130, 255, ${(props) => props.opacity || 0.6});
	filter: blur(${(props) => props.blur || 30}px);
	border-radius: 1000px;
	position: ${(props) => props.position || 'absolute'};
	max-width: ${(props) => props.maxWidth || 400}px;
	width: ${(props) => props.size}px;
	height: ${(props) => props.size}px;
	top: ${(props) => props.top}%;
	right: ${(props) => props.right}%;
	z-index: -1;
`
