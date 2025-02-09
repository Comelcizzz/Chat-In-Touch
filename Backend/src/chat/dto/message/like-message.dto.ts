import { IsString } from 'class-validator'
import { IsObjectId } from 'class-validator-mongo-object-id'
import { Types } from 'mongoose'

export class LikeMessageDto {
	@IsObjectId()
	messageId: Types.ObjectId

	@IsObjectId()
	userId: Types.ObjectId

	@IsString()
	avatarUrl: string

	@IsString()
	username: string
}
