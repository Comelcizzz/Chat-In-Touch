import {
	AttachmentFilePreview,
	AttachmentFilesWrapper,
	FormWrapper,
	StyledForm,
	Wrapper,
	useChatFormSend,
} from '@/entities/chatForm'
import {
	IconRocket,
	IconRobot,
	IconAttach,
	IconUndo,
} from '@/shared/assets/icons'
import { ChatInput } from '@/shared/ui'
import { ButtonBase } from '@mui/material'

export const ChatFormSend = () => {
	const {
		fileInputRef,
		fileList,
		formRef,
		onChangeInputFile,
		deleteFile,
		onSubmit,
		textInputRef,
		chatId,
	} = useChatFormSend()

	return (
		<FormWrapper>
			<AttachmentFilesWrapper files={fileList.length > 0}>
				{fileList.map((file) => (
					<AttachmentFilePreview key={file}>
						<img src={file} />
						<IconUndo onClick={() => deleteFile(file)} />
					</AttachmentFilePreview>
				))}
			</AttachmentFilesWrapper>
			<StyledForm ref={formRef} onSubmit={onSubmit}>
				<Wrapper>
					<IconRobot />
					<ButtonBase
						type="button"
						disabled={chatId === undefined}
						onClick={() => fileInputRef?.current?.click()}
					>
						<IconAttach />
					</ButtonBase>
					<input
						type="file"
						ref={fileInputRef}
						hidden
						onChange={onChangeInputFile}
					/>
				</Wrapper>
				<Wrapper>
					<ChatInput ref={textInputRef} />
					<ButtonBase disabled={chatId === undefined} type="submit">
						<IconRocket />
					</ButtonBase>
				</Wrapper>
			</StyledForm>
		</FormWrapper>
	)
}
