import { UserDataPublic, UserWithId } from 'src/user/types/user-data.type'
import { Chat } from '../../schemas/chat.schema'
import { MessageWithId } from '../message/message.type'
import { TimeStampsWithId } from 'src/types/db.types'

export interface PopulatedChat
	extends Omit<Chat, 'users' | 'messages'>,
		TimeStampsWithId {
	users: UserWithId[]
	messages: MessageWithId[]
}

export interface PopulatedChatWithPublicUsers
	extends Omit<PopulatedChat, 'users'> {
	users: UserDataPublic[]
}
