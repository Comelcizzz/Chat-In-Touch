import { useAuthForm } from '@/entities/auth/lib/hooks'
import { StyledForm } from '@/entities/auth/ui/Form'
import { PrimaryButton, AuthInput, CloseButton } from '@/shared/ui'
import { ProcessLoader } from '@/shared/ui/Loaders/ProcessLoader'
import { Box } from '@mui/material'
import { FC } from 'react'

interface LoginFormProps {
	hidden: boolean
	onClickCloseButton : () => void
}

export const LoginForm: FC<LoginFormProps> = ({ hidden,onClickCloseButton }) => {
	const { fields, errors, onSubmit, loadings } = useAuthForm()
	const { email, password } = fields
	const { loginLoading } = loadings

	return (
		<>
			<StyledForm hidden={hidden} onSubmit={onSubmit}>
				<AuthInput
					{...email}
					label="E-mail address"
					error={errors.email?.message}
				/>
				<AuthInput
					{...password}
					label="Password"
					error={errors.password?.message}
				/>
				<PrimaryButton disabled={loginLoading} type="submit">
					{loginLoading ? <ProcessLoader /> : 'Sign in'}
				</PrimaryButton>
			</StyledForm>
			<Box
				component="div"
				sx={{ width: '100%', marginTop: '20px', textAlign: 'center' }}
			>
				<CloseButton
					disabled={loginLoading}
					sx={{ opacity: hidden ? 0 : 1 }}
					onClick={onClickCloseButton}
				/>
			</Box>
		</>
	)
}
