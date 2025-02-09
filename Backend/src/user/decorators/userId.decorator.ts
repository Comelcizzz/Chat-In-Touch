import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	const userId = request.userId._id

	return userId
})
