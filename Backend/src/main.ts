import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

const port = process.env.PORT || 3000

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.use(cookieParser())
	app.useGlobalPipes(new ValidationPipe())
	app.enableCors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
	await app.listen(port, '0.0.0.0')
}
bootstrap()
