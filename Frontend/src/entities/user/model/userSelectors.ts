import { createSelector } from '@reduxjs/toolkit'

const user = (state: RootState) => state.userState.user

export const selectUser = createSelector([user], (user) => user)
