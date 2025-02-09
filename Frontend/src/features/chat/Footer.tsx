import { selectChatForm } from '@/entities/chatForm'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { styled } from '@mui/material'
import { FC } from 'react'
import { ChatFormSend } from './ChatFormSend'
import { ChatFormEdit } from './ChatFormEdit'
import { mobileXS } from '@/shared/lib/constants/media'
import { useParams } from 'react-router-dom'

const StyledFooter = styled('footer')<{ route: boolean }>`
	grid-area: footer;
	width: 100%;
	padding: 28px;
	border-radius: 0 0 20px 0;

	@media ${mobileXS} {
		display: ${(props) => (props.route ? 'block' : 'none')};
		position: relative;
	}
`

export const Footer: FC = () => {
	const { id } = useParams()
	const mode = useAppSelector(selectChatForm).mode

	return (
		<StyledFooter id="footer" route={id !== undefined}>
			{mode === 'send' ? <ChatFormSend /> : <ChatFormEdit />}
		</StyledFooter>
	)
}
