import { Message } from '@/shared/types/message.interface'

export const getLastMessageContent = (
	message: null | Message
): null | string => {
	if (!message) return null
	return message.text.trim().length > 0
		? message.text
		: message.attachedFiles.length > 0
		? 'Photo'
		: null
}
