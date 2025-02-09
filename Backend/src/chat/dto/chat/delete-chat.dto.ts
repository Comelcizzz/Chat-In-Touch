import { IsString } from 'class-validator'
import { Types } from 'mongoose'

export class DeleteChatDto {
	@IsString()
	chatId: Types.ObjectId
}
