import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema({ timestamps: true })
export class UserConnection {
	@Prop({ unique: true })
	userId: Types.ObjectId

	@Prop({ default: [] })
	socketIds: string[]
}

export const UserConnectionSchema = SchemaFactory.createForClass(UserConnection)
