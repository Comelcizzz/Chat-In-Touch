import { Controller, Post } from '@nestjs/common'
import {
	Delete,
	HttpCode,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common/decorators'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post('upload')
	@HttpCode(200)
	@Auth()
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder: string
	) {
		return this.fileService.saveFile(file, folder)
	}

	@Delete('delete')
	@HttpCode(200)
	@Auth()
	async deleteFile(@Query('path') path: string) {
		return this.fileService.deleteFile(path)
	}
}
