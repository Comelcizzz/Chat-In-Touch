import type {
	Dispatch,
	MouseEvent as MouseEventReact,
	SetStateAction,
	TouchEvent as TouchEventReact,
} from 'react'
import { useContextMenu, likeMessage } from '@/entities/chat'
import { selectUser } from '@/entities/user'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { getEventCoordinates } from '@/shared/lib/utils/getEventCoordinates'
import { useState } from 'react'

type Coordinates = {
	x: number
	y: number
}

interface MessageHandlers {
	onMouseEnter: () => void
	onMouseLeave: () => void
	onContextMenu: (
		e: TouchEventReact<HTMLDivElement> | MouseEventReact<HTMLDivElement>
	) => void
	onDoubleClick: () => void
}

interface UseMessageCardReturn {
	clicked: boolean
	coordinates: Coordinates
	handleCloseModal: () => void
	handleOpenModal: () => void
	handleLike: () => void
	handlers: MessageHandlers
	modalAvatar: boolean
	setSnackBarAppearance: Dispatch<SetStateAction<boolean>>
	snackBarAppearance: boolean
	userId: string
	messageHovered: boolean
}

export const useMessageCard = (messageId: string): UseMessageCardReturn => {
	const dispatch = useAppDispatch()
	const [messageHovered, setMessageHovered] = useState(false)
	const [snackBarAppearance, setSnackBarAppearance] = useState(false)
	const [modalAvatar, setModalAvatar] = useState(false)
	const {
		_id: userId,
		avatar: avatarUrl,
		username,
	} = useAppSelector(selectUser)

	const { clicked, coordinates, setClicked, setCoordinates } =
		useContextMenu()

	const handleContextMenu = (
		e: TouchEventReact<HTMLDivElement> | MouseEventReact<HTMLDivElement>
	) => {
		e.preventDefault()

		setCoordinates(getEventCoordinates(e))
		setClicked(true)
	}

	const handleCloseModal = () => {
		setModalAvatar(false)
	}

	const handleOpenModal = () => {
		setModalAvatar(true)
	}

	const handleLike = () => {
		dispatch(likeMessage({ userId, messageId, avatarUrl, username }))
	}

	const handleDoubleClick = () => {
		handleLike()
	}

	const handleMouseEnter = () => {
		setMessageHovered(true)
	}

	const handleMouseLeave = () => {
		setMessageHovered(false)
	}

	return {
		handlers: {
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			onContextMenu: handleContextMenu,
			onDoubleClick: handleDoubleClick,
		},
		clicked,
		coordinates,
		handleCloseModal,
		handleOpenModal,
		handleLike,
		messageHovered,
		modalAvatar,
		setSnackBarAppearance,
		snackBarAppearance,
		userId,
	}
}
