import { Chat } from '@/shared/types/chat.interface'
import { User } from '@/shared/types/user.interface'

export const getUser = (): User | null => {
	const user = localStorage.getItem('user')
	return user ? JSON.parse(user) : null
}

export const setUser = (user: User) => {
	localStorage.setItem('user', JSON.stringify(user))
}

export const removeUser = () => {
	localStorage.removeItem('user')
}

export const changeAvatar = (avatar: string) => {
	const user = getUser()
	if (user) {
		user.avatar = avatar
		localStorage.setItem('user', JSON.stringify(user))
	}
}

export const changeUsername = (username: string) => {
	const user = getUser()
	if (user) {
		user.username = username
		localStorage.setItem('user', JSON.stringify(user))
	}
}

export const getCurrentChat = (): Chat | null => {
	const currentChat = localStorage.getItem('currentChat')
	return currentChat ? JSON.parse(currentChat) : null
}

export const setCurrentChat = (chat: Chat) => {
	localStorage.setItem('currentChat', JSON.stringify(chat))
}

export const removeCurrentChat = () => {
	localStorage.removeItem('currentChat')
}
