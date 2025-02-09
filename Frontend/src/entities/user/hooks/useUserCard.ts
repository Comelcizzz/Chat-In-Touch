import { chooseChat, startNewChat } from '@/entities/chat'
import { useAppSelector, useAppDispatch } from '@/shared/lib/hooks/redux'
import { Chat } from '@/shared/types/chat.interface'
import { useParams } from 'react-router-dom'
import { selectUser } from '..'
import { getLastMessageContent } from '../utils/getLastMessageContent'
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'
import { mobileXS } from '@/shared/lib/constants/media'
import { Message } from '@/shared/types/message.interface'
import { useDelayedNavigate } from '@/shared/lib/hooks/useDelayedNavigate'
import { useEffect } from 'react'

interface UseCardProps {
	chat: Chat | null
	toUserId: string
}

interface UseCardPropsReturn {
	handleClickCard: () => void
	lastMessageContent: null | string
	lastMessage: Message | null
	selectedChat: boolean
	selectedChatMobile: boolean
}

export const useUserCard = ({
	chat,
	toUserId,
}: UseCardProps): UseCardPropsReturn => {
	const { id } = useParams()
	const { _id: fromUserId } = useAppSelector(selectUser)
	const { closed, delayedNavigateHandler, setClosed } = useDelayedNavigate()
	const mobile = useMediaQuery(mobileXS)
	const dispatch = useAppDispatch()
	const selectedChat = chat?._id === id && id !== undefined
	const lastMessage = chat?.messages[chat.messages.length - 1] || null
	const lastMessageContent = getLastMessageContent(lastMessage)

	const handleClickCard = () => {
		if (chat) {
			dispatch(chooseChat(chat))
			if (mobile) {
				return delayedNavigateHandler(`/chat/${chat._id}`, 450)
			}
			return delayedNavigateHandler(`/chat/${chat._id}`, 0, 'mobile')
		}
		if (mobile) {
			setClosed(true)
			setTimeout(
				() => dispatch(startNewChat({ fromUserId, toUserId })),
				100
			)
			return
		}

		dispatch(startNewChat({ fromUserId, toUserId }))
	}

	useEffect(() => {
		if (id) {
			setClosed(false)
		}
	}, [id])

	return {
		handleClickCard,
		selectedChat,
		lastMessageContent,
		lastMessage,
		selectedChatMobile: closed,
	}
}
