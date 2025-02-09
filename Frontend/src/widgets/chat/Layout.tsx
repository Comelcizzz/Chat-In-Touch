import { styled } from '@mui/material'
import { Outlet, useParams } from 'react-router-dom'
import backgroundImage from '@/shared/assets/images/auth/background.png'
import { Footer } from '@/features/chat/Footer'
import { SideBar } from '@/widgets/user/SideBar'
import { Header } from '@/features/header'
import {
	closeConnection,
	openConnection,
} from '@/entities/chat/model/chatSlice'
import { selectUser } from '@/entities/user'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { useEffect } from 'react'
import { Ellipse } from '@/shared/ui'
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

const Container = styled('div')`
	width: 100%;
	max-width: 1106px;
	height: 100%;
	margin: 0 auto;
	padding: 20px 10px 40px 10px;

	@media ${mobileXS} {
		max-width: 340px;
	}
`

const Layout = styled('div')<{ route: boolean }>`
	position: relative;
	min-height: 620px;
	display: grid;
	grid-template:
		'header header header' max-content
		'sidebar chat borderRight' 1fr
		'sidebar footer footer' max-content / 1fr 2fr 24px;

	color: #fff;
	&:before {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: rgba(61, 85, 255, 0.1);
		box-shadow: 0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset,
			0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset;
		backdrop-filter: blur(20px);
		border-radius: 20px;
		z-index: -1;
	}

	@media ${mobileXS} {
		grid-template: ${(props) =>
			props.route
				? `'header header header' max-content
			'borderLeft chat borderRight' 1fr
			'footer footer footer' max-content / 20px 1fr 20px`
				: `'header' max-content
			'sidebar' 1fr
			'sidebar' max-content / 1fr`};
	}
`

export const ChatLayout = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const userId = useAppSelector(selectUser)._id

	useEffect(() => {
		dispatch(openConnection({ userId }))

		return () => {
			dispatch(closeConnection())
		}
	}, [])

	return (
		<LayoutWrapper id="chat">
			<Ellipse right={75} top={6} size={84} />
			<Ellipse right={45} top={0} size={60} opacity={0.7} />
			<Ellipse right={20} top={-4} size={250} blur={150} />
			<Ellipse right={65} top={40} size={332} blur={150} />
			<Ellipse right={18} top={60} size={200} blur={100} />
			<Container>
				<Layout route={id !== undefined}>
					<Header />
					<SideBar />
					<Outlet />
					<Footer />
				</Layout>
			</Container>
		</LayoutWrapper>
	)
}
