import { useAppSelector } from '@/shared/lib/hooks/redux'
import { ChangeEvent, Dispatch, FormEvent, RefObject, SetStateAction, useRef, useState } from 'react'
import { selectUser } from '../model'
import {
	useUpdateAvatarMutation,
	useUpdateUsernameMutation,
} from '../api/userApi'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

interface SettingsFormReturn {
	username: string
	onChangeUserName: (e: ChangeEvent<HTMLInputElement>) => void
	error: string
	onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
	inputRef: RefObject<HTMLInputElement>
	setShowInput: Dispatch<SetStateAction<boolean>>
	showInput: boolean
}

export const useSettingsForm = (
	avatar: string,
	closeSettings: () => void
): SettingsFormReturn => {
	const [updateAvatar] = useUpdateAvatarMutation()
	const [updateUsername] = useUpdateUsernameMutation()
	const initialName = useAppSelector(selectUser).username
	const [error, setError] = useState('')
	const [username, setUsername] = useState(initialName)

	const inputRef = useRef<HTMLInputElement>(null)
	const [showInput, setShowInput] = useState(false)

	const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value)
	}

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		if (username.length < 4) {
			return setError('username should be at least 4 characters')
		}

		try {
			await Promise.all([
				updateAvatar({ avatar }),
				updateUsername({ username }),
			])
			closeSettings()
		} catch (err) {
			if (isAxiosError(err)) {
				setError(err.response?.data.message)
				toast.error(err.response?.data.message)
			}
		}
	}

	return {
		username,
		error,
		onSubmit,
		onChangeUserName,
		inputRef,
		setShowInput,
		showInput
	}
}
