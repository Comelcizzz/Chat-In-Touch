import { Socket, io } from 'socket.io-client'
import { Middleware } from '@reduxjs/toolkit'
import {
	openConnection,
	closeConnection,
	startNewChat,
	receiveNewChat,
	sendNewMessage,
	receiveNewMessage,
	receiveDeletedMessage,
	deleteMessage,
	likeMessage,
	receiveLike,
	receiveEditedMessage,
	editMessage,
} from './chatSlice'
import { Chat, ChatActions } from '@/shared/types/chat.interface'
import { Message, MessageActions } from '@/shared/types/message.interface'
import { router } from '@/app/router/router'

export const chatMiddleWare: Middleware = ({ dispatch }) => {
	let socket: Socket
	return (next) => (action) => {
		if (openConnection.match(action)) {
			socket = io(import.meta.env.VITE_PUBLIC_API_BASE_URL, {
				withCredentials: true,
			})

			socket.emit(ChatActions.connect, action.payload)

			socket.on(ChatActions.receive_new, (chat: Chat) => {
				dispatch(receiveNewChat(chat))
			})

			socket.on(MessageActions.receive_new, (message: Message) => {
				dispatch(receiveNewMessage(message))
			})

			socket.on(MessageActions.receive_delete, (response: Message) => {
				dispatch(receiveDeletedMessage(response))
			})

			socket.on(MessageActions.receive_like, (response: Message) => {
				dispatch(receiveLike(response))
			})

			socket.on(MessageActions.receive_edit, (response: Message) => {
				dispatch(receiveEditedMessage(response))
			})
		}

		if (startNewChat.match(action)) {
			socket.emit(ChatActions.start, action.payload, (chat: Chat) => {
				dispatch(receiveNewChat(chat))
				router.navigate(`/chat/${chat._id}`)
			})
		}

		if (sendNewMessage.match(action)) {
			socket.emit(
				MessageActions.send_message,
				action.payload,
				(message: Message) => {
					dispatch(receiveNewMessage(message))
				}
			)
		}

		if (deleteMessage.match(action)) {
			socket.emit(MessageActions.delete, action.payload)
		}

		if (likeMessage.match(action)) {
			socket.emit(MessageActions.like, action.payload)
		}

		if (editMessage.match(action)) {
			socket.emit(MessageActions.edit, action.payload)
		}

		if (closeConnection.match(action)) {
			socket.close()
		}

		next(action)
	}
}
