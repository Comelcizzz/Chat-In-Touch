import { IsObjectId } from 'class-validator-mongo-object-id'
import { Types } from 'mongoose'

export class DeleteMessageDto {
	@IsObjectId()
	messageId: Types.ObjectId
}
