import { styled } from '@mui/material'
import backgroundImage from '@/shared/assets/images/auth/background.png'
import planet from '@/shared/assets/images/auth/planet.png'
import bgCosmic from '@/shared/assets/images/auth/bgСosmic.png'
import { Ellipse } from '@/shared/ui'
import { Outlet } from 'react-router-dom'
import { Header } from '@/features/header'
import { SpeechBlock } from '@/entities/auth/ui/SpeechBlock'
import { ToastContainer } from 'react-toastify'
import { mobileXS } from '@/shared/lib/constants/media'

const LayoutWrapper = styled('section')`
	overflow: hidden;
	position: relative;
	min-height: 100vh;
	height: 100%;
	width: 100%;
	background: url(${backgroundImage}) no-repeat;
	background-size: cover;
	background-position: center;
	z-index: 1;
`

const PlanetEllipse = styled('div')`
	position: absolute;
	width: 100%;
	height: 100%;
	inset: 0;
	border-radius: 1600px;
	background: rgba(255, 255, 255, 0.33);
	filter: blur(100px);
	z-index: -1;
`

const Planet = styled('div')`
	position: absolute;
	background-image: url(${planet});
	background-size: cover;
	background-position: 50% 0%;
	background-repeat: no-repeat;
	width: 100%;
	height: 55%;
	bottom: 0;
	max-width: none;
	margin: 0 auto;
	z-index: -1;
	user-select: none;
`

const BgCosmic = styled('img')`
	position: absolute;
	top: 10%;
	right: 20%;
	z-index: -1;
	user-select: none;

	@media ${mobileXS} {
		width: 160px;
		height: 109px;
		left: 0;
	}
`

const Container = styled('div')`
	width: 100%;
	max-width: 1106px;
	margin: 0 auto;
	padding: 20px 10px 40px 10px;
	@media ${mobileXS} {
		max-width: 330px;
	}
`

export const AuthLayout = () => {
	return (
		<LayoutWrapper>
			<ToastContainer />
			<Ellipse size={84} top={10} right={70} />
			<Ellipse size={60} top={1} right={40} />
			<Ellipse size={332} top={-1} right={22} blur={150} />
			<BgCosmic draggable={false} src={bgCosmic} />
			<Container>
				<Header />
				<SpeechBlock />
				<Outlet />
			</Container>
			<Planet>
				<PlanetEllipse />
			</Planet>
		</LayoutWrapper>
	)
}
