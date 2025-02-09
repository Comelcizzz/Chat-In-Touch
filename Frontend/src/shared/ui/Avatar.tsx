import { Avatar, styled, AvatarProps } from '@mui/material'
import { IconAvatar } from '../assets/icons/IconAvatar'
import { FC } from 'react'

const AvatarFallback = styled(IconAvatar)`
	user-select: none;
	display: inline-block;
	fill: currentColor;
	flex-shrink: 0;
	font-size: 1.5rem;
	width: 58%;
	height: 58%;
`

export const CustomAvatar: FC<AvatarProps> = (props) => {
	return (
		<Avatar {...props}>
			<AvatarFallback />
		</Avatar>
	)
}
