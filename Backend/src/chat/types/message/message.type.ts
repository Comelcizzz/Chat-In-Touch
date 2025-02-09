import { Types } from 'mongoose'
import { Message } from '../../schemas/message.schema'

export interface LikedBy {
	userId: Types.ObjectId
	username: string
	avatarUrl: string
}

export type MessageWithId = Omit<
	Message & {
		_id: Types.ObjectId
	},
	never
>
