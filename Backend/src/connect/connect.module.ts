import { Module } from '@nestjs/common'
import { ConnectService } from './connect.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserConnectionSchema } from './schemas/user-connection.schema'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'UserConnection', schema: UserConnectionSchema },
		]),
	],
	providers: [ConnectService],
	exports: [ConnectService],
})
export class ConnectModule {}
