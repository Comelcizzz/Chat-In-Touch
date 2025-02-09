import { PopulatedChatWithPublicUsers } from 'src/chat/types'
import { TimeStampsWithId } from 'src/types'

export const PickChatData = (
	chat: PopulatedChatWithPublicUsers & TimeStampsWithId
) => {
	return {
		_id: chat._id,
		createdAt: chat.createdAt,
		updatedAt: chat.updatedAt,
		messages: chat.messages,
		users: chat.users,
	}
}
