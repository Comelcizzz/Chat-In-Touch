import { IsArray, IsString } from 'class-validator'
import { IsObjectId } from 'class-validator-mongo-object-id'
import { Types } from 'mongoose'

export class CreateMessageDto {
	@IsObjectId()
	chatId: Types.ObjectId

	@IsString()
	user: Types.ObjectId

	@IsString()
	text: string

	@IsArray()
	attachedFiles: string[]
}
