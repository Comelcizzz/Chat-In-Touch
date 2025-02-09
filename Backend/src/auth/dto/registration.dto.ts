import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class RegistrationDto {
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Password cannot be less than 6 characters!',
	})
	@MaxLength(20, {
		message: 'Password cannot be more than 20 characters!',
	})
	@IsString()
	password: string

	@MinLength(3, {
		message: 'Username cannot be less than 3 characters!',
	})
	@MaxLength(20, {
		message: 'Username cannot be more than 20 characters!',
	})
	@IsString()
	username: string
}
