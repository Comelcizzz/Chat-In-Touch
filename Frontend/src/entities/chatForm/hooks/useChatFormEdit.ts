import { selectChatForm, resetState } from '@/entities/chatForm'
import { useAppSelector, useAppDispatch } from '@/shared/lib/hooks/redux'
import { useFile } from '@/shared/lib/hooks/useFile'
import {
	ChangeEvent,
	FormEventHandler,
	InputHTMLAttributes,
	RefObject,
	useEffect,
	useRef,
} from 'react'
import { useForm } from 'react-hook-form'
import { deleteMessage, editMessage } from '../../chat'

interface ChatFormValues {
	text: string
}

interface UseChatFormEditReturn {
	onChangeInputFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	deleteFile:(url:string)=>Promise<void>
	fileList: string[]
	textFieldProps: InputHTMLAttributes<HTMLInputElement>
	onSubmit: FormEventHandler<HTMLFormElement>
	fileInputRef: RefObject<HTMLInputElement>
	handleUndo: () => void
}

export const useChatFormEdit = (): UseChatFormEditReturn => {
	const { defaultValue } = useAppSelector(selectChatForm)
	const dispatch = useAppDispatch()
	const { register, handleSubmit, setFocus } = useForm<ChatFormValues>()
	const fileInputRef = useRef<HTMLInputElement>(null)
	const { fileList, onChangeInputFile,onDeleteInputFile } = useFile(
		'message',
		'chat',
		defaultValue.attachedFiles
	)

	useEffect(() => {
		setFocus('text')
	}, [setFocus])

	const handleUndo = () => {
		dispatch(resetState())
	}

	const handleEdit = handleSubmit((data) => {
		if (!data.text && !fileList.length) {
			dispatch(deleteMessage({ messageId: defaultValue._id }))
		}

		dispatch(
			editMessage({
				...data,
				messageId: defaultValue._id,
				attachedFiles: fileList,
			})
		)

		handleUndo()
	})

	const textFieldProps = {
		defaultValue: defaultValue.text,
		...register('text'),
	}

	return {
		fileInputRef,
		fileList,
		onChangeInputFile,
		handleUndo,
		textFieldProps,
		onSubmit: handleEdit,
		deleteFile: onDeleteInputFile,
	}
}
