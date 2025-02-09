import { Types } from 'mongoose'

export interface TimeStamps {
	createdAt: string
	updatedAt: string
}

export interface _id {
	_id: Types.ObjectId
}

export type TimeStampsWithId = _id & TimeStamps
