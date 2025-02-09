import { selectChatForm } from '@/entities/chatForm'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { useState, useEffect } from 'react'

interface UseChatRoomReturn {
	mode: 'edit' | 'send'
	domReady: boolean
}

export const useChatRoom = (): UseChatRoomReturn => {
	const [domReady, setDomReady] = useState(false)

	useEffect(() => {
		setDomReady(true)
	}, [])

	const mode = useAppSelector(selectChatForm).mode

	return { mode, domReady }
}
