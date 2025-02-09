import { emailRegexp } from '@/shared/lib/constants/regexp'
import { AuthData } from '@/shared/types/auth.interface'
import { InputProps } from '@/shared/ui/Inputs'
import { FormEventHandler, useEffect } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { useLoginMutation, useRegisterMutation } from '../../api'
import { useNavigate } from 'react-router-dom'

interface AuthFieldValues {
	email: string
	password: string
	username: string
}

type Loadings = {
	loginLoading: boolean
	registerLoading: boolean
}

interface AuthFormReturn {
	fields: {
		email: InputProps
		password: InputProps
		username?: InputProps
	}
	errors: FieldErrors<AuthFieldValues>

	onSubmit: FormEventHandler<HTMLFormElement>
	loadings: Loadings
}

export const useAuthForm = (isRegisterForm?: boolean): AuthFormReturn => {
	const nav = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthData>({ reValidateMode: 'onChange', mode: 'onChange' })
	const [
		registerRequest,
		{ isSuccess: isRegisterSuccess, isLoading: registerLoading },
	] = useRegisterMutation()
	const [
		loginRequest,
		{ isSuccess: isLoginSuccess, isLoading: loginLoading },
	] = useLoginMutation()

	useEffect(() => {
		if (isRegisterSuccess || isLoginSuccess) {
			nav('/chat', { replace: true })
		}
	}, [isRegisterSuccess, isLoginSuccess, nav])

	const onSubmit = handleSubmit(async (data) => {
		if (isRegisterForm) {
			registerRequest(data)
		} else {
			loginRequest(data)
		}
	})

	const emailFieldProps = {
		type: 'email',
		...register('email', {
			required: 'Email is required',
			pattern: { value: emailRegexp, message: 'Incorrect email' },
			maxLength: {
				value: 30,
				message: 'Email must be less than 30',
			},
		}),
	}

	const passwordFieldProps = {
		type: isRegisterForm ? 'text' : 'password',
		...register('password', {
			required: 'Password is required',
			minLength: {
				value: 6,
				message: 'Password must be more than 6',
			},
			maxLength: {
				value: 30,
				message: 'Password must be less than 30',
			},
		}),
	}

	const props: AuthFormReturn = {
		fields: {
			email: emailFieldProps,
			password: passwordFieldProps,
		},
		errors,
		loadings: { registerLoading, loginLoading },
		onSubmit,
	}

	if (isRegisterForm) {
		const usernameFieldProps = {
			type: 'text',
			...register('username', {
				required: 'Name is required',
				minLength: { value: 2, message: 'Name must be more than 2' },
				maxLength: { value: 14, message: 'Name must be less than 14' },
			}),
		}

		props.fields.username = usernameFieldProps
	}

	return props
}
