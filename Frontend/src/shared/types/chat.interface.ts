import { Message } from './message.interface'
import { User } from './user.interface'

export const enum ChatActions {
	connect = 'chat/connect',
	start = 'chat/start',
	receive_new = 'chat/receive_new',
	delete = 'chat/delete',
	receive_delete = 'chat/receive_delete',
}


export interface Chat {
	_id: string
	createdAt: string
	updatedAt: string
	messages: Message[]
	users: User[]
}

export interface ChatStart {
	fromUserId: string
	toUserId: string
}


export interface CreateConnection {
	userId: string
}

export interface ChatDelete {
	chatId: string
}
