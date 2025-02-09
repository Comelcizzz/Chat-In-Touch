import { CircularProgress, styled } from '@mui/material'
import backgroundImage from '@/shared/assets/images/auth/background.png'

const WrapperCircular = styled('div')`
	min-height: 100vh;
	min-width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url(${backgroundImage}) no-repeat;
	background-size: cover;
	background-position: center;
`

export const FullScreenLoader = () => {
	return (
		<WrapperCircular>
			<CircularProgress size={200} sx={{ color: '#00f0ff' }} />
		</WrapperCircular>
	)
}
