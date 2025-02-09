import { IsString } from 'class-validator'
import { Types } from 'mongoose'

export class StartChatDto {
	@IsString()
	fromUserId: Types.ObjectId

	@IsString()
	toUserId: Types.ObjectId
}
