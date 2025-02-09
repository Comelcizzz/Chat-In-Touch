import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { ChatActions, MessageActions } from './types'
import {
	ConnectDto,
	CreateMessageDto,
	DeleteChatDto,
	DeleteMessageDto,
	EditMessageDto,
	StartChatDto,
} from './dto'
import { Socket } from 'socket.io'
import { ClientUrl } from 'src/config/constants'
import { LikeMessageDto } from './dto/message/like-message.dto'

@WebSocketGateway({
	cors: {
		credentials: true,
		origin: ClientUrl,
	},
})
export class ChatGateway {
	constructor(private readonly chatService: ChatService) {}

	@SubscribeMessage(ChatActions.connect)
	async connect(
		@MessageBody() connectDto: ConnectDto,
		@ConnectedSocket() client: Socket
	) {
		await this.chatService.connect(connectDto, client.id)
	}

	@SubscribeMessage(ChatActions.start)
	async startChat(
		@MessageBody() startChatDto: StartChatDto,
		@ConnectedSocket() client: Socket
	) {
		return this.chatService.startChat(startChatDto, client)
	}

	@SubscribeMessage(ChatActions.delete)
	async deleteChat(
		@MessageBody() deleteChatDto: DeleteChatDto,
		@ConnectedSocket() client: Socket
	) {
		await this.chatService.deleteChat(deleteChatDto, client)
	}

	@SubscribeMessage(MessageActions.send_message)
	async sendMessage(
		@MessageBody() createMessageDto: CreateMessageDto,
		@ConnectedSocket() client: Socket
	) {
		return this.chatService.createMessage(createMessageDto, client)
	}

	@SubscribeMessage(MessageActions.edit)
	async editMessage(
		@MessageBody() editMessageDto: EditMessageDto,
		@ConnectedSocket() client: Socket
	) {
		await this.chatService.editMessage(editMessageDto, client)
	}

	@SubscribeMessage(MessageActions.delete)
	async deleteMessage(
		@MessageBody() deleteMessageDto: DeleteMessageDto,
		@ConnectedSocket() client: Socket
	) {
		await this.chatService.deleteMessage(deleteMessageDto, client)
	}

	@SubscribeMessage(MessageActions.like)
	async likeMessage(
		@MessageBody() likeMessageDto: LikeMessageDto,
		@ConnectedSocket() client: Socket
	) {
		await this.chatService.likeMessage(likeMessageDto, client)
	}
}
