import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { User, UserSchema } from './schemas/user.schema'
import { Connection, Model, Types, connect } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { getModelToken } from '@nestjs/mongoose'
import { ChatService } from '../chat/chat.service'
import { ConnectService } from '../connect/connect.service'
import { Chat, ChatSchema } from '../chat/schemas/chat.schema'
import { Message, MessageSchema } from '../chat/schemas/message.schema'
import {
	UserConnection,
	UserConnectionSchema,
} from '../connect/schemas/user-connection.schema'
import { NotFoundException } from '@nestjs/common'

describe('user.service.spec.ts', () => {
	let userService: UserService
	let mongod: MongoMemoryServer
	let mongoConnection: Connection
	let userModel: Model<User>
	let chatModel: Model<Chat>
	let messageModel: Model<Message>
	let userConnectionModel: Model<UserConnection>

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		mongoConnection = (await connect(uri)).connection
		userModel = mongoConnection.model('User', UserSchema)
		chatModel = mongoConnection.model('Chat', ChatSchema)
		messageModel = mongoConnection.model('Message', MessageSchema)
		userConnectionModel = mongoConnection.model(
			'UserConnection',
			UserConnectionSchema
		)
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ChatService,
				UserService,
				ConnectService,
				{
					provide: getModelToken('User'),
					useValue: userModel,
				},
				{
					provide: getModelToken('Chat'),
					useValue: chatModel,
				},
				{
					provide: getModelToken('UserConnection'),
					useValue: userConnectionModel,
				},
				{
					provide: getModelToken('Message'),
					useValue: messageModel,
				},
			],
		}).compile()

		userService = module.get<UserService>(UserService)
	})

	afterAll(async () => {
		await mongoConnection.dropDatabase()
		await mongoConnection.close()
		await mongod.stop()
	})

	afterEach(async () => {
		const collections = mongoConnection.collections
		for (const key in collections) {
			const collection = collections[key]
			await collection.deleteMany({})
		}
	})
	const email = 'test@mail.ru'
	const password = 'testpassword'
	const username = 'username'
	const avatar = 'avatar'
	const wrongUserId = '64808b1eb26ca878923dac61' as unknown as Types.ObjectId

	const userDto = {
		email,
		password,
		username,
	}

	describe('updateAvatar()', () => {
		it('should update avatar', async () => {
			const user = await userModel.create(userDto)
			expect(
				await userService.updateAvatar(user._id, { avatar })
			).toStrictEqual({ avatar })
		})

		it('should throw 404 (No user by following id)', async () => {
			await expect(
				userService.updateAvatar(wrongUserId, { avatar })
			).rejects.toThrow(new NotFoundException('No user by following id'))
		})
	})

	describe('findByIdPublic()', () => {
		it('should return user public fields', async () => {
			const user = await userModel.create(userDto)
			const userPublic = (await userService.findByIdPublic(
				user._id
			)) as any
			expect(userPublic._id).toStrictEqual(user._id)
			expect(userPublic.chats).toBeUndefined()
		})

		it('should throw 404 (No user by following id)', async () => {
			await expect(
				userService.findByIdPublic(wrongUserId)
			).rejects.toThrow(new NotFoundException('No user by following id'))
		})
	})

	describe('findUsers()', () => {
		it('should return users by username', async () => {
			const user = await userModel.create(userDto)
			const users = await userService.findUsers({
				searchField: 'username',
				value: user.username,
				userId: wrongUserId,
			})
			expect(users[0]._id).toStrictEqual(user._id)
			expect(users.length).toStrictEqual(1)
		})

		it('should return user by email', async () => {
			const user = await userModel.create(userDto)
			const users = await userService.findUsers({
				searchField: 'email',
				value: user.email,
				userId: wrongUserId,
			})
			expect(users[0]._id).toStrictEqual(user._id)
			expect(users.length).toStrictEqual(1)
		})

		it('should return empty array', async () => {
			const user = await userModel.create(userDto)
			const users = await userService.findUsers({
				searchField: 'email',
				value: user.email,
				userId: user._id,
			})
			expect(users.length).toStrictEqual(0)
		})
	})
})
