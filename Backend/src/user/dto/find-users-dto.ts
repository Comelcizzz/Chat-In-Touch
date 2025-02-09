import { IsString } from 'class-validator'
import { Types } from 'mongoose'

export class FindUsersDto {
	@IsString()
	value: string

	@IsString()
	userId: Types.ObjectId
}
