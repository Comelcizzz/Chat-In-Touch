import { useSettingsForm } from '@/entities/user/hooks/useSettingsForm'
import { selectUser } from '@/entities/user/model'
import { mobileXS } from '@/shared/lib/constants/media'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { useFile } from '@/shared/lib/hooks/useFile'
import {
	ChatInput,
	CustomAvatar,
	PrimaryButton,
	SecondaryButton,
} from '@/shared/ui'
import { Box, styled } from '@mui/material'
import { forwardRef } from 'react'

const StyledForm = styled('form')`
	display: flex;
	flex-direction: column;
	gap: 18px;
	padding: 18px;
	width: 100%;
	max-width: 266px;
	position: absolute;
	right: 30px;
	top: 90px;
	background: rgba(61, 85, 255, 0.1);
	box-shadow: 0px 0px 68px 0px rgba(255, 255, 255, 0.05) inset,
		0px 4px 4px 0px rgba(255, 255, 255, 0.15) inset;
	backdrop-filter: blur(20px);
	border-radius: 20px;
	z-index: 1;

	@media ${mobileXS} {
		right: 20px;
		top: 65px;
		gap: 15px;
		gap: 18px 16px;
	}
`

interface SettingsFormProps {
	handleToggleSettings: () => void
}

export const SettingsForm = forwardRef<HTMLFormElement, SettingsFormProps>(
	({ handleToggleSettings }, ref) => {
		const initialUrl = useAppSelector(selectUser).avatar
		const { fileUrl, onChangeInputFile } = useFile(
			'avatar',
			'settings',
			initialUrl
		)
		const {
			error,
			onChangeUserName,
			onSubmit,
			username,
			inputRef,
			setShowInput,
			showInput,
		} = useSettingsForm(fileUrl, handleToggleSettings)

		return (
			<StyledForm ref={ref} onSubmit={onSubmit}>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CustomAvatar
						src={fileUrl}
						sx={{ width: '218px', height: '218px' }}
					/>
				</Box>
				<SecondaryButton
					onClick={() => inputRef?.current?.click()}
					type="button"
					isAuth={true}
				>
					Change Avatar
				</SecondaryButton>
				<input
					ref={inputRef}
					type="file"
					onChange={onChangeInputFile}
					hidden
				/>
				{showInput ? (
					<ChatInput
						value={username}
						error={error}
						onChange={onChangeUserName}
					/>
				) : (
					<SecondaryButton
						onClick={() => setShowInput(true)}
						type="button"
						isAuth={true}
					>
						Change username
					</SecondaryButton>
				)}
				<PrimaryButton type="submit" isAuth={true}>
					Save Changes
				</PrimaryButton>
			</StyledForm>
		)
	}
)
SettingsForm.displayName = 'SettingsForm'