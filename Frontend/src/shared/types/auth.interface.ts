import { Chat } from './chat.interface'
import { User } from './user.interface'

type Tokens = {
	accessToken: string
}

export interface AuthResponse {
	tokens: Tokens
	user: User
	chats: Chat[]
}

export interface AuthData {
	email: string
	username?: string
	password: string
}
