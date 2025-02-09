import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { Connection, Model, connect } from 'mongoose'
import { User, UserSchema } from '../user/schemas/user.schema'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { getModelToken } from '@nestjs/mongoose'
import { BadRequestException, UnauthorizedException } from '@nestjs/common'
import { ChatService } from '../chat/chat.service'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { ConnectService } from '../connect/connect.service'
import { ConfigService } from '@nestjs/config'
import { Chat, ChatSchema } from '../chat/schemas/chat.schema'
import { Message, MessageSchema } from '../chat/schemas/message.schema'
import {
	UserConnection,
	UserConnectionSchema,
} from '../connect/schemas/user-connection.schema'

describe('auth.service.spec.ts', () => {
	let authService: AuthService
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
				ConfigService,
				AuthService,
				ChatService,
				JwtService,
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
					provide: getModelToken('Message'),
					useValue: messageModel,
				},
				{
					provide: getModelToken('UserConnection'),
					useValue: userConnectionModel,
				},
			],
		}).compile()

		authService = module.get<AuthService>(AuthService)
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
	const wrongPassword = 'wrongpassword'
	const wrongRefreshToken =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDg4OTZiZTU5Yzg0MzI5NTQ1MmE3MzciLCJpYXQiOjE2ODY2NzMwODYsImV4cCI6MTY4Nzk2OTA4Nn0.ifr_ZogtB0dioEJxdp0qs6uUzkQfqFQj1QEyPQBgB0o'

	const invalidRefreshToken = 'invalidrefreshtoken'

	const registerDto = {
		email,
		password,
		username,
	}
	const loginDto = {
		email,
		password,
	}

	describe('registration()', () => {
		it('should add new user', async () => {
			const userData = await authService.registration(registerDto)
			expect(userData.user.email).toStrictEqual(email)
			expect(userData.user.username).toStrictEqual(username)
		})

		it('should throw 400 (This email is already taken)', async () => {
			await authService.registration(registerDto)
			await expect(authService.registration(registerDto)).rejects.toThrow(
				new BadRequestException('This email is already taken')
			)
		})
	})

	describe('login()', () => {
		it('should login', async () => {
			await authService.registration(registerDto)
			const userData = await authService.login(loginDto)
			expect(userData.user.email).toStrictEqual(email)
			expect(userData.user.username).toStrictEqual(username)
		})

		it('should throw 400 (No user by following email)', async () => {
			await expect(authService.login(loginDto)).rejects.toThrow(
				new BadRequestException('No user by following email')
			)
		})

		it('should throw 400 (Wrong credentials)', async () => {
			await authService.registration(registerDto)
			await expect(
				authService.login({ ...loginDto, password: wrongPassword })
			).rejects.toThrow(new BadRequestException('Wrong credentials'))
		})
	})

	describe('refresh()', () => {
		it('should return user data', async () => {
			const userData = await authService.registration(registerDto)
			const refreshData = await authService.refresh(
				userData.tokens.refreshToken
			)
			expect(refreshData.user.email).toStrictEqual(registerDto.email)
			expect(refreshData.user.username).toStrictEqual(
				registerDto.username
			)
		})

		it('should throw 400 (No refresh token was provided)', async () => {
			await authService.registration(registerDto)
			await expect(authService.refresh(null as string)).rejects.toThrow(
				new BadRequestException('No refresh token was provided')
			)
		})

		it('should throw 400 (Wrong refresh token)', async () => {
			await expect(
				authService.refresh(invalidRefreshToken)
			).rejects.toThrow(new UnauthorizedException('Wrong refresh token'))
		})

		it('should throw 400 (No user by following email)', async () => {
			await authService.registration(registerDto)
			await expect(
				authService.refresh(wrongRefreshToken)
			).rejects.toThrow(
				new UnauthorizedException('No user by following email')
			)
		})
	})
})
