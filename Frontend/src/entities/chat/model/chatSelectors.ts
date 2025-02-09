import { createSelector } from '@reduxjs/toolkit'

export const selectCurrentChat = (state: RootState) =>
	state.chatState.currentChat

export const selectChats = (state: RootState) => state.chatState.chats

export const selectFriend = createSelector(
	[(state: RootState) => state, (_, id) => id],
	(state, id) =>
		state.chatState.currentChat.users.filter(
			(user) => user._id !== id
		)[0] ?? []
)
