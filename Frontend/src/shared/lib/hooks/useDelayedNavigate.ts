import { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface useCloseFormReturn {
	closed: boolean
	delayedNavigateHandler: (
		path: string,
		delay?: number,
		type?: 'mobile' | 'default'
	) => void
	setClosed: Dispatch<SetStateAction<boolean>>
}

export const useDelayedNavigate = (): useCloseFormReturn => {
	const [closed, setClosed] = useState(false)
	const nav = useNavigate()

	const delayedNavigateHandler = (
		path: string,
		delay?: number,
		type?: 'mobile' | 'default'
	) => {
		if (type === 'mobile') {
			setClosed(false)
		} else {
			setClosed((prev) => !prev)
		}
		setTimeout(() => {
			nav(path)
		}, delay || 0)
	}

	return { closed, delayedNavigateHandler, setClosed }
}
