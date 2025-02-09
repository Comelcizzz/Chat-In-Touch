import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Res,
	HttpCode,
	Req,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, RegistrationDto } from './dto'
import { Response, Request } from 'express'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post('registration')
	async registration(@Body() dto: RegistrationDto, @Res() res: Response) {
		try {
			const data = await this.authService.registration(dto)
			res.cookie('refreshToken', data.tokens.refreshToken, {
				httpOnly: true,
				sameSite: 'none',
				secure: true,
			})
			delete data.tokens.refreshToken
			return res.send(data)
		} catch (error) {
			res.status(400).send({ message: error.message })
		}
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: LoginDto, @Res() res: Response) {
		const data = await this.authService.login(dto)
		res.cookie('refreshToken', data.tokens.refreshToken, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		})
		delete data.tokens.refreshToken
		return res.send(data)
	}

	@HttpCode(200)
	@Post('refresh')
	async refresh(@Req() req: Request) {
		return this.authService.refresh(req?.cookies['refreshToken'])
	}

	@HttpCode(200)
	@Get('drop-db')
	async dropDB() {
		await this.authService.dropDb()
	}
}
