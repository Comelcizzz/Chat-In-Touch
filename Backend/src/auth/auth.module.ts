import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from 'src/user/schemas/user.schema'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'
import { ConnectModule } from 'src/connect/connect.module'

@Module({
	imports: [
		ConfigModule,
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
		JwtModule.register({
			global: true,
			secret: new ConfigService().get<string>('JWT_ACCESS_SECRET'),
			signOptions: { expiresIn: '60s' },
		}),
		UserModule,
		ConnectModule,
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
