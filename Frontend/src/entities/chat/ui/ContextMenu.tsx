import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { Message } from '@/shared/types/message.interface'
import { styled } from '@mui/material'
import { Dispatch, FC, SetStateAction } from 'react'
import { deleteMessage } from '..'
import { setMode } from '@/entities/chatForm'
import { selectUser } from '@/entities/user'
import { mobileXS } from '@/shared/lib/constants/media'

type Coords = { x: number; y: number }

const ContextMenuWrapper = styled('div')<Coords>`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: ${(props) => props.y}px;
	left: ${(props) => props.x}px;
	padding: 9px 0;
	background-color: var(--bg-white);
	color: var(--text-black);
	border-radius: 10px;

	@media ${mobileXS} {
		padding: 8px 0;
	}
`

const ContextMenuItem = styled('button')`
	font-size: 16px;
	line-height: 150%;
	letter-spacing: 0.32px;
	padding: 9px 20px;
	background-color: var(--bg-white);
	transition: background 0.2s ease-in-out;
	&:hover {
		background-color: #a09c9c;
	}

	@media ${mobileXS} {
		font-size: 14px;
		padding: 8px 18px;
	}
`

interface ContextMenuProps {
	message: Message
	coords: Coords
	setSnackBar: Dispatch<SetStateAction<boolean>>
}

export const ContextMenu: FC<ContextMenuProps> = ({
	coords,
	message,
	setSnackBar,
}) => {
	const { _id: messageId, text, attachedFiles, user } = message
	const currentUserId = useAppSelector(selectUser)._id
	const dispatch = useAppDispatch()

	const handleEdit = () => {
		dispatch(setMode({ text, attachedFiles, _id: messageId }))
	}

	const handleDelete = () => {
		dispatch(deleteMessage({ messageId }))
	}

	const handleCopy = async (text: string) => {
		if ('clipboard' in navigator) {
			await navigator.clipboard.writeText(text)
			setSnackBar(true)
		} else {
			document.execCommand('copy', true, text)
			setSnackBar(true)
		}
	}

	return (
		<ContextMenuWrapper y={coords.y} x={coords.x}>
			<ContextMenuItem onClick={() => handleCopy(text)}>
				Copy
			</ContextMenuItem>
			{currentUserId === user && (
				<ContextMenuItem onClick={handleEdit}>Edit</ContextMenuItem>
			)}
			<ContextMenuItem onClick={handleDelete}>Delete</ContextMenuItem>
		</ContextMenuWrapper>
	)
}
