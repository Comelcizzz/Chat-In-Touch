import { createSelector } from '@reduxjs/toolkit'

const auth = (state: RootState) => state.authState.isAuth

export const selectAuth = createSelector([auth], (auth) => auth)
