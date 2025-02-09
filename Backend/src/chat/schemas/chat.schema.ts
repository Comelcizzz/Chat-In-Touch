import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema({ timestamps: true })
export class Chat {
	@Prop({ ref: 'User' })
	users: Types.ObjectId[]

	@Prop({ default: [], ref: 'Message' })
	messages: Types.ObjectId[]
}

export const ChatSchema = SchemaFactory.createForClass(Chat)
