import { useAuthForm } from '@/entities/auth/lib/hooks'
import { StyledForm } from '@/entities/auth/ui/Form'
import { AuthInput, CloseButton, PrimaryButton } from '@/shared/ui'
import { ProcessLoader } from '@/shared/ui/Loaders/ProcessLoader'
import { Box } from '@mui/material'
import { FC } from 'react'

interface RegistrationFormProps {
	hidden: boolean
	onClickCloseButton: () => void
}

export const RegistrationForm: FC<RegistrationFormProps> = ({
	hidden,
	onClickCloseButton,
}) => {
	const { errors, fields, onSubmit, loadings } = useAuthForm(true)
	const { email, password, username } = fields
	const { registerLoading } = loadings

	return (
		<>
			<StyledForm hidden={hidden} onSubmit={onSubmit}>
				<AuthInput
					{...username}
					label="Username"
					error={errors.username?.message}
				/>
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
				<PrimaryButton disabled={registerLoading} type="submit">
					{registerLoading ? <ProcessLoader /> : 'Sign up'}
				</PrimaryButton>
			</StyledForm>
			<Box
				component="div"
				sx={{ width: '100%', marginTop: '20px', textAlign: 'center' }}
			>
				<CloseButton
					disabled={registerLoading}
					sx={{ opacity: hidden ? 0 : 1 }}
					onClick={onClickCloseButton}
				/>
			</Box>
		</>
	)
}
