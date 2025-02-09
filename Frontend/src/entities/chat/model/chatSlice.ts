import { authApi } from '@/entities/auth'
import {
	getCurrentChat,
	setCurrentChat,
} from '@/shared/lib/utils/LocalStorageService'
import {
	Chat,
	ChatStart,
	CreateConnection,
} from '@/shared/types/chat.interface'
import {
	CreateMessage,
	EditMessage,
	LikeMessage,
	Message,
} from '@/shared/types/message.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ChatState {
	isConnected: boolean
	chats: Chat[]
	currentChat: Chat
}

const initialState: ChatState = {
	isConnected: false,
	chats: [],
	currentChat: getCurrentChat() ?? {
		_id: '',
		createdAt: '',
		updatedAt: '',
		messages: [],
		users: [],
	},
}

export const chatSlice = createSlice({
	name: 'chatSlice',
	initialState,
	reducers: {
		openConnection: (state, _action: PayloadAction<CreateConnection>) => {
			state.isConnected = true
		},
		closeConnection: (state) => {
			state.isConnected = false
		},
		startNewChat: (state, _action: PayloadAction<ChatStart>) => {
			state.isConnected = true
		},
		receiveNewChat: (state, action: PayloadAction<Chat>) => {
			state.chats.push(action.payload)
			state.currentChat = action.payload
			setCurrentChat(action.payload)
		},
		chooseChat: (state, action: PayloadAction<Chat>) => {
			state.currentChat = action.payload
			setCurrentChat(action.payload)
		},
		sendNewMessage: (state, _action: PayloadAction<CreateMessage>) => {
			state.isConnected = true
		},
		receiveNewMessage: (state, action: PayloadAction<Message>) => {
			const chatIdx = state.chats.findIndex(
				(chat) => chat._id === action.payload.chatId
			)
			state.chats[chatIdx].messages.push(action.payload)
			if (state.currentChat._id === state.chats[chatIdx]._id) {
				state.currentChat.messages.push(action.payload)
			}
		},
		deleteMessage: (
			state,
			action: PayloadAction<{ messageId: string }>
		) => {
			state.currentChat.messages = state.currentChat.messages.filter(
				(message) => message._id !== action.payload.messageId
			)
			state.chats = state.chats.map((chat) =>
				chat._id === state.currentChat._id ? state.currentChat : chat
			)
		},
		receiveDeletedMessage: (state, { payload }: PayloadAction<Message>) => {
			state.currentChat.messages = state.currentChat.messages.filter(
				(message) => message._id !== payload._id
			)
			state.chats.forEach((chat) =>
				chat._id === payload.chatId
					? (chat.messages = chat.messages.filter(
							(message) => message._id !== payload._id ))
					: chat
			)
		},

		likeMessage: (state, { payload }: PayloadAction<LikeMessage>) => {
			const messageIdx = state.currentChat.messages.findIndex(
				(message) => message._id === payload.messageId
			)
			if (
				state.currentChat.messages[messageIdx].likedBy.find(
					(likedByObj) => likedByObj.userId === payload.userId
				)
			) {
				state.currentChat.messages[messageIdx].likedBy =
					state.currentChat.messages[messageIdx].likedBy.filter(
						(item) => item.userId !== payload.userId
					)
			} else {
				state.currentChat.messages[messageIdx].likedBy.push(payload)
			}
			state.chats = state.chats.map((chat) =>
				chat._id === state.currentChat._id ? state.currentChat : chat
			)
		},
		receiveLike: (state, { payload }: PayloadAction<Message>) => {
			state.chats
				.find((chat) => chat._id === payload.chatId)
				?.messages.forEach((message) =>
					message._id === payload._id ? (message = payload) : message
				)

			if (state.currentChat._id === payload.chatId) {
				state.currentChat.messages = state.currentChat.messages.map(
					(message) =>
						message._id === payload._id ? payload : message
				)
			}
		},
		editMessage: (state, { payload }: PayloadAction<EditMessage>) => {
			state.currentChat.messages = state.currentChat.messages.map(
				(message) =>
					message._id === payload.messageId
						? {
								...message,
								text: payload.text,
								attachedFiles: payload.attachedFiles,
								editedByUser: new Date()
									.toLocaleTimeString()
									.slice(0, 5), }
						: message
			)

			state.chats = state.chats.map((chat) =>
				chat._id === state.currentChat._id ? state.currentChat : chat
			)
		},
		receiveEditedMessage: (state, { payload }: PayloadAction<Message>) => {
			state.chats
				.find((chat) => chat._id === payload.chatId)
				?.messages.forEach((message) =>
					message._id === payload._id ? (message = payload) : message
				)
			if (state.currentChat._id === payload.chatId) {
				state.currentChat.messages = state.currentChat.messages.map(
					(message) =>
						message._id === payload._id ? payload : message
				)
			}
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				const currentChat = payload.chats.find(
					(chat) => chat._id === getCurrentChat()?._id
				)
				state.chats = payload.chats
				if (currentChat) {
					setCurrentChat(currentChat)
					state.currentChat = currentChat
				}
			}
		),
			builder.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, { payload }) => {
					const currentChat = payload.chats.find(
						(chat) => chat._id === getCurrentChat()?._id
					)
					state.chats = payload.chats
					if (currentChat) {
						setCurrentChat(currentChat)
						state.currentChat = currentChat
					}
				}
			),
			builder.addMatcher(
				authApi.endpoints.refresh.matchFulfilled,
				(state, { payload }) => {
					const currentChat = payload.chats.find(
						(chat) => chat._id === getCurrentChat()?._id
					)
					state.chats = payload.chats
					if (currentChat) {
						setCurrentChat(currentChat)
						state.currentChat = currentChat
					}
				}
			)
	},
})

export const {
	openConnection,
	closeConnection,
	startNewChat,
	receiveNewChat,
	chooseChat,
	sendNewMessage,
	receiveNewMessage,
	deleteMessage,
	receiveDeletedMessage,
	likeMessage,
	receiveLike,
	editMessage,
	receiveEditedMessage,
} = chatSlice.actions
