import { HeaderMenu } from './HeaderMenu'
import { IconLogo, IconAstronaut } from '@/shared/assets/icons'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { useDelayedNavigate } from '@/shared/lib/hooks/useDelayedNavigate'
import { Text } from '../../shared/ui/Typography/Text'
import { FC, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { logout, selectAuth } from '@/entities/auth/model'
import { selectUser } from '@/entities/user/model'
import {
	AstronautButton,
	NavButton,
	StyledHeader,
	UserActionWrapper,
	UserInfoContainer,
	UserInfoContainerMobile,
} from './headerStyle'
import { SettingsForm } from '../user/SettingsForm'
import { IconBack } from '@/shared/assets/icons/IconBack'
import { CustomAvatar } from '@/shared/ui'
import { selectFriend } from '@/entities/chat'
import { ClickAwayListener } from '@mui/material'

export const Header: FC = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const [showSettings, setShowSettings] = useState(false)
	const { closed, delayedNavigateHandler, setClosed } = useDelayedNavigate()
	const isAuth = useAppSelector(selectAuth)
	const { avatar, username, _id } = useAppSelector(selectUser)

	const { avatar: friendAvatar, username: friendUserName } = useAppSelector(
		(state) => selectFriend(state, _id)
	)

	const toggleMenu = () => {
		if (showSettings) {
			return setShowSettings(false)
		}
		setClosed((prev) => !prev)
	}

	const handleRegisterClick = () => {
		delayedNavigateHandler('register')
	}

	const handleLoginClick = () => {
		delayedNavigateHandler('login')
	}

	const handleToggleSettings = () => {
		setClosed(false)
		setShowSettings((prev) => !prev)
	}

	const handleLogout = () => {
		setClosed(false)
		dispatch(logout())
	}

	const renderLogo = () =>
		isAuth ? (
			<IconLogo />
		) : (
			<Link to="/">
				<IconLogo />
			</Link>
		)

	const renderUser = () =>
		isAuth && (
			<>
				<UserInfoContainer>
					<CustomAvatar src={avatar} />
					<Text Size={18} text={username} />
				</UserInfoContainer>
				{id ? (
					<UserInfoContainerMobile
						onClick={() =>
							delayedNavigateHandler('/chat', 0, 'mobile')
						}
					>
						<CustomAvatar src={friendAvatar} />
						<Text Size={18} text={friendUserName} />
					</UserInfoContainerMobile>
				) : (
					<UserInfoContainerMobile Active="true" onClick={toggleMenu}>
						<CustomAvatar src={avatar} />
						<Text Size={18} text={username} />
					</UserInfoContainerMobile>
				)}
			</>
		)

	return (
		<StyledHeader isAuth={isAuth}>
			{renderLogo()}
			<NavButton
				onClick={() => delayedNavigateHandler('/chat', 0, 'mobile')}
				route={id !== undefined}
			>
				<IconBack />
			</NavButton>
			<UserActionWrapper>
				{renderUser()}
				<AstronautButton isAuth={isAuth} onClick={toggleMenu}>
					<IconAstronaut />
				</AstronautButton>
			</UserActionWrapper>
			{closed && (
				<ClickAwayListener onClickAway={() => setClosed(false)}>
					<HeaderMenu
						handleLoginClick={handleLoginClick}
						handleRegisterClick={handleRegisterClick}
						handleToggleSettings={handleToggleSettings}
						handleLogout={handleLogout}
						isAuth={isAuth}
					/>
				</ClickAwayListener>
			)}
			{showSettings && (
				<ClickAwayListener onClickAway={() => setShowSettings(false)}>
					<SettingsForm handleToggleSettings={handleToggleSettings} />
				</ClickAwayListener>
			)}
		</StyledHeader>
	)
}
