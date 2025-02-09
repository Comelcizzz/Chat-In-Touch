import { Types } from 'mongoose'
import { User } from '../schemas/user.schema'
import { _id } from 'src/types'

export interface UserDataPublic {
	_id: Types.ObjectId
	email: string
	username: string
	avatar: string
}

export type UserWithId = Omit<User & _id, never>
