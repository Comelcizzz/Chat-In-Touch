import { selectUser } from '@/entities/user'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import {  styled } from '@mui/material'
import { CustomAvatar, Text } from '@/shared/ui'
import { selectCurrentChat, selectFriend } from '@/entities/chat'
import { MessageCard } from '@/features/chat'
import { forwardRef, useEffect, useRef } from 'react'
import { mobileXS } from '@/shared/lib/constants/media'

const ListWrapper = styled('div')`
	position: absolute;
	inset: 0;
	overflow-y: auto;
	overflow-x: hidden;
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: max-content;
	gap: 12px;
	padding: 0 20px 40px;

	@media ${mobileXS} {
		gap: 27px;
		padding: 0 10px 20px;
	}
`

const ListHeadingWrapper = styled('div')`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	padding: 40px 0;

	@media ${mobileXS} {
		padding: 40px 0 0 0;
		gap: 5px;
		> p {
			font-size: 16px;
		}
	}
`
const StyledSpeech = styled('span')`
	color: rgba(255, 255, 255, 0.6);
	font-size: 13px;
	line-height: 150%;
	letter-spacing: 0.02em;

	@media ${mobileXS} {
		font-size: 12px;
	}
`

export const MessagesList = forwardRef<HTMLDivElement>((_, ref) => {
	const { messages } = useAppSelector(selectCurrentChat)
	const currentUserId = useAppSelector(selectUser)._id
	const { avatar, username } = useAppSelector((state) =>
		selectFriend(state, currentUserId)
	)

	const lastMessageRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		lastMessageRef.current?.scrollIntoView()
	}, [messages.length])

	return (
		<ListWrapper ref={ref}>
			<ListHeadingWrapper>
				<CustomAvatar sx={{ width: 100, height: 100 }} src={avatar} />
				<Text Size={18} text={username} />
				<StyledSpeech>Write something</StyledSpeech>
			</ListHeadingWrapper>
			{messages.map((message) => (
				<MessageCard
					key={message._id}
					message={message}
					avatar={avatar}
				/>
			))}
			<div ref={lastMessageRef} />
		</ListWrapper>
	)
})
