import { useDelayedNavigate } from '@/shared/lib/hooks/useDelayedNavigate'
import { LoginForm } from '@/features/auth'

export const Login = () => {
	const { closed, delayedNavigateHandler } = useDelayedNavigate()

	return (
		<LoginForm
			onClickCloseButton={() => delayedNavigateHandler('/', 300)}
			hidden={closed}
		/>
	)
}
