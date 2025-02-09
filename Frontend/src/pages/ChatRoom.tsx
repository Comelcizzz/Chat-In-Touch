import { styled } from '@mui/material'
import backgroundImage from '@/shared/assets/images/auth/background.png'
import { MessagesList } from '@/widgets/chat/MessagesList'
import { Ellipse } from '@/shared/ui'
import { SearchControls } from '@/features/user/SearchControls'
import { useControls } from '@/entities/user'
import { createPortal } from 'react-dom'
import { useChatRoom } from '@/entities/chat/hooks/useChatRoom'
import { mobileXS } from '@/shared/lib/constants/media'

const ChatRoomWrapper = styled('div')`
	position: relative;
	background: url(${backgroundImage});
	border-radius: 20px;
	max-height: 440px;
	overflow-y: hidden;
	grid-area: chat;
	z-index: 0;
`

const ChatControls = styled(SearchControls)`
	position: absolute;
	z-index: 10;
	right: 20px;
	top: 20px;

	@media ${mobileXS} {
		display: none;
	}
`

const ChatControlsMobile = styled(SearchControls)<{ mode: 'edit' | 'send' }>`
	display: none;
	position: absolute;
	z-index: 10;
	right: 25px;
	top: 25px;
	svg {
		flex-shrink: none;
	}

	@media ${mobileXS} {
		display: ${(props) => (props.mode === 'send' ? 'flex' : 'none')};
	}
`

export const ChatRoom = () => {
	const { domReady, mode } = useChatRoom()

	const { downHandlers, listRef, upHandlers } = useControls()

	return (
		<ChatRoomWrapper id="room">
			<ChatControls
				filled={true}
				downHandlers={downHandlers}
				upHandlers={upHandlers}
			/>
			<Ellipse size={300} blur={150} top={10} right={0} />
			<MessagesList ref={listRef} />
			{domReady &&
				createPortal(
					<ChatControlsMobile
						filled={true}
						mode={mode}
						downHandlers={downHandlers}
						upHandlers={upHandlers}
						gradientId={5}
					/>,
					document.getElementById('footer') as HTMLElement
				)}
		</ChatRoomWrapper>
	)
}
