import { UserData } from '@/shared/types/user.interface'
import { styled } from '@mui/material'
import { Text } from '@/shared/ui/Typography/Text'
import { FC } from 'react'
import { getRelativeCalendarTime } from '@/shared/lib/utils/getRelativeCalendarTime'
import { mobileXS } from '@/shared/lib/constants/media'
import { CustomAvatar } from '@/shared/ui'

import { useUserCard } from '../hooks/useUserCard'

const CardWrapper = styled('div')<{ selected: boolean }>`
	transition: background-size 0.3s ease-in-out;
	background-image: var(--bg-selectedMessage);
	background-repeat: no-repeat;
	background-size: ${(props) => (props.selected ? 100 : 0)}%;
	display: grid;
	grid-template-columns: 58px max-content auto;
	grid-template-rows: 30px 26px;
	align-items: center;
	gap: 0 12px;
	cursor: pointer;
	padding-right: 4px;
	width: 100%;

	.MuiAvatar-root {
		width: 56px;
		height: 56px;
		grid-row: span 2;
	}

	@media ${mobileXS} {
		grid-template-columns: 50px minmax(max-content, 1fr) auto;
		gap: 0 10px;
		.MuiAvatar-root {
			height: 50px;
			width: 50px;
		}
		p {
			font-size: 16px;
		}
	}
`

const StyledDate = styled('span')`
	line-height: 220%;
	align-self: start;
	justify-self: end;
	font-size: 13px;

	@media ${mobileXS} {
		font-size: 11px;
	}
`

const StyledLastMessage = styled('span')`
	grid-column: 2/4;
	text-overflow: ellipsis;
	line-height: 150%;
	letter-spacing: 0.3px;
	font-size: 15px;
	overflow: hidden;
	white-space: nowrap;
	width: calc(100%);
	max-width: 175px;
	margin: 0;

	@media ${mobileXS} {
		font-size: 13px;
		width: calc(80%);
	}
`

interface UserCardProps {
	userData: UserData
}

export const UserCard: FC<UserCardProps> = ({ userData }) => {
	const { _id: toUserId, avatar, username, chat } = userData
	const {
		handleClickCard,
		lastMessageContent,
		selectedChat,
		lastMessage,
		selectedChatMobile,
	} = useUserCard({ chat, toUserId })

	return (
		<CardWrapper 
			selected={selectedChat || selectedChatMobile}
			onClick={handleClickCard}
		>
			<CustomAvatar src={avatar} />
			<Text Size={18} text={username} />
			{lastMessage && (
				<StyledDate>
					{getRelativeCalendarTime(lastMessage.createdAt)}
				</StyledDate>
			)}
			<StyledLastMessage>{lastMessageContent}</StyledLastMessage>
		</CardWrapper>
	)
}
