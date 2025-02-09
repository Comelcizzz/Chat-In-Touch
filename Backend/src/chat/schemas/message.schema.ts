import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { LikedBy } from '../types'

@Schema({ timestamps: true })
export class Message {
	@Prop()
	chatId: Types.ObjectId

	@Prop({ ref: 'User' })
	user: Types.ObjectId

	@Prop()
	text: string

	@Prop()
	likedBy: LikedBy[]

	@Prop()
	attachedFiles: string[]

	@Prop({ required: false })
	editedByUser?: Date
}

export const MessageSchema = SchemaFactory.createForClass(Message)
