import { Types } from 'mongoose'

export type TypeUserSearchMongooseParams = {
	_id: { $ne: Types.ObjectId }
	$or: ({ email: RegExp } | { username: RegExp })[]
}
