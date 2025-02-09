import { selectUser } from '@/entities/user'
import { useAppSelector, useAppDispatch } from '@/shared/lib/hooks/redux'
import { useRef, FormEvent, RefObject, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'
import { sendNewMessage } from '../../chat'
import { useFile } from '@/shared/lib/hooks/useFile'

interface UseChatFormSendReturn {
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
	fileInputRef: RefObject<HTMLInputElement>
	textInputRef: RefObject<HTMLInputElement>
	formRef: RefObject<HTMLFormElement>
	chatId: string | undefined
	onChangeInputFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	deleteFile: (url: string) => Promise<void>
	fileList: string[]
}

export const useChatFormSend = (): UseChatFormSendReturn => {
	const { fileList, onChangeInputFile, setFileList, onDeleteInputFile } =
		useFile('message', 'chat')
	const user = useAppSelector(selectUser)._id
	const { id: chatId } = useParams()
	const dispatch = useAppDispatch()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const textInputRef = useRef<HTMLInputElement>(null)
	const formRef = useRef<HTMLFormElement>(null)

	const sendMessage = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!chatId || (!textInputRef.current?.value && !fileList.length)) {
			return
		}

		dispatch(
			sendNewMessage({
				text: textInputRef?.current?.value ?? '',
				user,
				chatId,
				attachedFiles: fileList,
			})
		)

		setFileList([])
		formRef.current?.reset()
	}

	return {
		onSubmit: sendMessage,
		fileInputRef,
		textInputRef,
		formRef,
		fileList,
		onChangeInputFile,
		deleteFile: onDeleteInputFile,
		chatId,
	}
}
