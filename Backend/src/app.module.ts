import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ChatModule } from './chat/chat.module'
import { ConnectModule } from './connect/connect.module'
import config from './config/env.config'
import { FileModule } from './file/file.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [config] }),
		MongooseModule.forRoot(process.env.MONGO_URI),
		UserModule,
		AuthModule,
		ChatModule,
		ConnectModule,
		FileModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
