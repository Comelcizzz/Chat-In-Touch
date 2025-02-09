import { mobileXS } from '@/shared/lib/constants/media'
import { styled, keyframes, ButtonBase } from '@mui/material'
import {forwardRef } from 'react'

const appear = keyframes`
	from{
    opacity: 0;
    }
	to{
    opacity: 1
	}`

const MenuWrapper = styled('div')<{ isAuth: boolean }>`
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	right: ${(props) => (props.isAuth ? 30 : 0)}px;
	bottom: -145px;
	position: absolute;
	color: #fff;
	gap: 18px;
	background: rgba(61, 85, 255, 0.1);
	box-shadow: 0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset,
		0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset;
	backdrop-filter: blur(20px);
	border-radius: 20px;
	width: 100%;
	max-width: 200px;
	padding: 28px 0;
	animation: ${appear} 0.2s ease-in;
	> button {
		font-size: 22px;
		line-height: 150%;
	}
	z-index: 1;
	@media ${mobileXS} {
		bottom: ${(props) => (props.isAuth ? -115 : -125)}px;
		right: ${(props) => (props.isAuth ? 20 : 0)}px;
		gap: 8px;
		padding: 20 0;
		max-width: 154px;
		> button {
			font-size: 18px;
		}
	}
`

interface HeaderMenuProps {
	handleLoginClick: () => void
	handleRegisterClick: () => void
	handleLogout: () => void
	handleToggleSettings: () => void
	isAuth: boolean
}

export const HeaderMenu = forwardRef<HTMLDivElement, HeaderMenuProps>(
	(
		{
			isAuth,
			handleLoginClick,
			handleRegisterClick,
			handleLogout,
			handleToggleSettings,
		},
		ref
	) => {
		const renderButtons = () =>
			isAuth ? (
				<>
					<ButtonBase onClick={handleToggleSettings}>
						Settings
					</ButtonBase>
					<ButtonBase onClick={handleLogout}>Log out</ButtonBase>
				</>
			) : (
				<>
					<ButtonBase onClick={handleLoginClick}>Sign in</ButtonBase>
					<ButtonBase onClick={handleRegisterClick}>
						Sign up
					</ButtonBase>
				</>
			)

		return (
			<MenuWrapper ref={ref} isAuth={isAuth}>
				{renderButtons()}
			</MenuWrapper>
		)
	}
)
HeaderMenu.displayName = 'HeaderMenu'
