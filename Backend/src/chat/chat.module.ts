import { Module } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'
import { ConnectModule } from 'src/connect/connect.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ChatSchema } from './schemas/chat.schema'
import { MessageSchema } from './schemas/message.schema'
import { UserSchema } from 'src/user/schemas/user.schema'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		ConnectModule,
		ConfigModule,
		MongooseModule.forFeature([
			{ name: 'Chat', schema: ChatSchema },
			{ name: 'Message', schema: MessageSchema },
			{ name: 'User', schema: UserSchema },
		]),
	],
	providers: [ChatGateway, ChatService],
	exports: [ChatService],
})
export class ChatModule {}
