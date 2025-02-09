import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { User } from '../user/schemas/user.schema'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './types'
import { hash, genSalt, compare } from 'bcryptjs'
import { UserService } from '../user/user.service'
import { ConfigService } from '@nestjs/config'
import { LoginDto, RegistrationDto } from './dto'
import { ConnectService } from '../connect/connect.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
		private readonly connectService: ConnectService,
		private readonly configService: ConfigService,
		@InjectModel('User') private readonly userModel: Model<User>
	) {}

	async registration(dto: RegistrationDto) {
		const isUserExist = await this.userModel.findOne({ email: dto.email })
		if (isUserExist)
			throw new BadRequestException('This email is already taken')

		const salt = await genSalt(3)

		const userCredentials = {
			...dto,
			password: await hash(dto.password, salt),
		}

		const user = await this.userModel.create(userCredentials)
		await this.connectService.createEntity(user._id)
		const tokens = await this.generateTokens({ _id: user._id })
		const userData = await this.userService.getUserDataWithChats(user)
		return { tokens, ...userData }
	}

	async login(dto: LoginDto) {
		const user = await this.userModel.findOne({ email: dto.email })
		if (!user) throw new BadRequestException('No user by following email')
		const isValidPassword = await compare(dto.password, user.password)

		if (!isValidPassword) throw new BadRequestException('Wrong credentials')

		const tokens = await this.generateTokens({ _id: user._id })
		const userData = await this.userService.getUserDataWithChats(user)

		return { tokens, ...userData }
	}

	async refresh(refreshToken: string) {
		if (!refreshToken)
			throw new BadRequestException('No refresh token was provided')
		try {
			const refreshTokenData = await this.jwtService.verifyAsync(
				refreshToken,
				{
					secret:
						this.configService.get<string>('jwt.refreshSecret') ||
						'secret',
				}
			)

			const payload: JwtPayload = {
				_id: refreshTokenData._id,
			}

			const accessToken = await this.jwtService.signAsync(payload, {
				expiresIn: '20m',
				secret:
					this.configService.get<string>('jwt.accessSecret') ||
					'secret',
			})
			const user = await this.userModel.findById(payload._id)
			if (!user)
				throw new UnauthorizedException('No user by following email')
			const userData = await this.userService.getUserDataWithChats(user)
			return {
				tokens: { accessToken },
				...userData,
			}
		} catch (e) {
			if (
				e.response &&
				e.response.message === 'No user by following email'
			)
				throw new UnauthorizedException('No user by following email')

			throw new UnauthorizedException('Wrong refresh token')
		}
	}

	private async generateTokens(payload: JwtPayload) {
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: '20m',
			secret:
				this.configService.get<string>('jwt.accessSecret') || 'secret',
		})

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: '15d',
			secret:
				this.configService.get<string>('jwt.refreshSecret') || 'secret',
		})
		return { accessToken, refreshToken }
	}

	async dropDb() {
		const shlepa1 = {
			email: 'Shlepa1@mail.ru',
			password: '1234567*',
			username: 'Shlepa1',
		}
		const shlepa2 = {
			email: 'Shlepa2@mail.ru',
			password: '1234567*',
			username: 'Shlepa2',
		}
		await this.userModel.collection.drop()
		await this.registration(shlepa1)
		await this.registration(shlepa2)

		const users = await this.userService.findUsers({
			userId: '507f1f77bcf86cd799439011' as unknown as Types.ObjectId,
			value: 'Shlepa',
		})

		for (let i = 0; i < users.length; i++) {
			await this.userService.updateAvatar(users[i]._id, {
				avatar:
					i % 2 === 0
						? '/uploads/avatar/1685383936766-2nWnYtkZ9yk.jpg'
						: '/uploads/avatar/1685383919067-d3de72094d9702ec41a20305ec1091ab.png',
			})
		}
	}
}
