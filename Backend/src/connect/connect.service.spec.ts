import { Test, TestingModule } from '@nestjs/testing'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Connection, Model, Types, connect } from 'mongoose'
import { getModelToken } from '@nestjs/mongoose'
import { ConnectService } from './connect.service'
import {
	UserConnection,
	UserConnectionSchema,
} from './schemas/user-connection.schema'

describe('connect.service.spec.ts', () => {
	let connectService: ConnectService
	let mongod: MongoMemoryServer
	let mongoConnection: Connection
	let userConnectionModel: Model<UserConnection>

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create()
		const uri = mongod.getUri()
		mongoConnection = (await connect(uri)).connection
		userConnectionModel = mongoConnection.model(
			'UserConnection',
			UserConnectionSchema
		)
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ConnectService,
				{
					provide: getModelToken('UserConnection'),
					useValue: userConnectionModel,
				},
			],
		}).compile()

		connectService = module.get<ConnectService>(ConnectService)
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

	const testUserId = `testUserId` as unknown as Types.ObjectId
	const testSocketId = 'testSocketId'
	const testSocketId2 = 'testSocketId2'

	describe('createEntity()', () => {
		it('should create user connection entity', async () => {
			await connectService.createEntity(testUserId)
			const userConnection = await connectService.findUserConnection(
				testUserId
			)
			expect(userConnection.userId).toStrictEqual(testUserId)
		})
	})

	describe('findUserConnection()', () => {
		it('should find user connection by userId', async () => {
			await connectService.createEntity(testUserId)
			const userConnection = await connectService.findUserConnection(
				testUserId
			)
			expect(userConnection.userId).toStrictEqual(testUserId)
		})
	})

	describe('addConnection()', () => {
		it('should add 1 socketId', async () => {
			await connectService.createEntity(testUserId)
			await connectService.addConnection(testUserId, testSocketId)
			const userConnection = await connectService.findUserConnection(
				testUserId
			)
			expect(userConnection.socketIds[0]).toStrictEqual(testSocketId)
			expect(userConnection.socketIds.length).toStrictEqual(1)
		})
		it('should add 2 socketIds', async () => {
			await connectService.createEntity(testUserId)
			await connectService.addConnection(testUserId, testSocketId)
			await connectService.addConnection(testUserId, testSocketId2)
			const userConnection = await connectService.findUserConnection(
				testUserId
			)
			expect(userConnection.socketIds[0]).toStrictEqual(testSocketId)
			expect(userConnection.socketIds[1]).toStrictEqual(testSocketId2)
			expect(userConnection.socketIds.length).toStrictEqual(2)
		})
	})

	describe('removeConnection()', () => {
		it('should remove 1 of 2 socketIds', async () => {
			await connectService.createEntity(testUserId)
			await connectService.addConnection(testUserId, testSocketId)
			await connectService.addConnection(testUserId, testSocketId2)
			await connectService.removeConnection(testSocketId)
			const userConnection = await connectService.findUserConnection(
				testUserId
			)
			expect(userConnection.socketIds[0]).toStrictEqual(testSocketId2)
			expect(userConnection.socketIds.length).toStrictEqual(1)
		})

		it('should remove 1 of 1 socketIds', async () => {
			await connectService.createEntity(testUserId)
			await connectService.addConnection(testUserId, testSocketId)
			await connectService.removeConnection(testSocketId)
			const userConnection = await connectService.findUserConnection(
				testUserId
			)
			expect(userConnection.socketIds.length).toStrictEqual(0)
		})
	})
})
