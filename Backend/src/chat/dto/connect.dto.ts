import { IsString } from 'class-validator'
import { Types } from 'mongoose'

export class ConnectDto {
	@IsString()
	userId: Types.ObjectId
}
