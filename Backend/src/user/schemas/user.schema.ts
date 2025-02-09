import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema()
export class User {
	@Prop({ unique: true })
	email: string

	@Prop()
	password: string

	@Prop()
	username: string

	@Prop({ default: '' })
	avatar: string

	@Prop({ default: [] })
	chats: Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User)
