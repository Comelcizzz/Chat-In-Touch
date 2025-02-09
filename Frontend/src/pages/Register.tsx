import { useDelayedNavigate } from '@/shared/lib/hooks/useDelayedNavigate'
import { RegistrationForm } from '@/features/auth'

export const Register = () => {
	const { closed, delayedNavigateHandler } = useDelayedNavigate()
	return (
		<RegistrationForm
			onClickCloseButton={() => delayedNavigateHandler('/', 300)}
			hidden={closed}
		/>
	)
}
