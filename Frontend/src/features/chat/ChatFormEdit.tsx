import {
	AttachmentFilePreview,
	AttachmentFilesWrapper,
	EditInfoWrapper,
	FormWrapper,
	InfoWrapper,
	StyledForm,
	StyledText,
	Wrapper,
	useChatFormEdit,
} from '@/entities/chatForm'
import {
	IconAttach,
	IconChecked,
	IconRobot,
	IconUndo,
	IconEdit,
} from '@/shared/assets/icons'

import { ChatInput } from '@/shared/ui'
import { ButtonBase } from '@mui/material'

export const ChatFormEdit = () => {
	const {
		fileInputRef,
		fileList,
		handleUndo,
		onChangeInputFile,
		onSubmit,
		textFieldProps,
		deleteFile,
	} = useChatFormEdit()

	return (
		<FormWrapper>
			<AttachmentFilesWrapper files={fileList.length > 0}>
				{fileList.map((file) => (
					<AttachmentFilePreview key={file}>
						<IconUndo onClick={() => deleteFile(file)} />
						<img src={file} />
					</AttachmentFilePreview>
				))}
			</AttachmentFilesWrapper>
			<StyledForm mode="edit" onSubmit={onSubmit}>
				<Wrapper>
					<IconRobot />
					<ButtonBase
						type="button"
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
					<ChatInput {...textFieldProps}>
						<EditInfoWrapper>
							<InfoWrapper>
								<IconEdit />
								<StyledText>
									{textFieldProps.defaultValue}
								</StyledText>
							</InfoWrapper>
							<ButtonBase onClick={handleUndo}>
								<IconUndo />
							</ButtonBase>
						</EditInfoWrapper>
					</ChatInput>
					<ButtonBase type="submit">
						<IconChecked />
					</ButtonBase>
				</Wrapper>
			</StyledForm>
		</FormWrapper>
	)
}
