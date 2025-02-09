export interface Message {
	_id: string
	chatId: string
	user: string
	text: string
	likedBy: Omit<LikeMessage,'messageId'>[]
	attachedFiles: string[]
	createdAt: string
	updatedAt: string
	editedByUser?: string
}

export interface CreateMessage {
	chatId: string
	user: string
	text: string
	attachedFiles: string[]
}

export interface EditMessage {
	messageId: string
	text: string
	attachedFiles: string[]
}

export interface LikeMessage {
	messageId: string
	userId: string
	avatarUrl: string
	username: string
}

export const enum MessageActions {
	send_message = 'message/send',
	receive_new = 'message/receive',

	edit = 'message/edit',
	receive_edit = 'message/receive_edit',

	like = 'message/like',
	receive_like = 'message/receive_like',

	delete = 'message/delete',
	receive_delete = 'message/receive_delete',
}
