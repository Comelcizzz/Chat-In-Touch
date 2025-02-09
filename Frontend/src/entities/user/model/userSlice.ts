import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { authApi } from '@/entities/auth/api'
import { User } from '@/shared/types/user.interface'
import {
	changeAvatar,
	changeUsername,
	getUser,
	setUser,
} from '@/shared/lib/utils/LocalStorageService'
import { userApi } from '../api/userApi'

interface UserState {
	user: User
}

const initialState: UserState = {
	user: {
		_id: '',
		email: '',
		username: '',
		avatar: '',
	},
}
 
export const userSlice = createSlice({
	name: 'userSlice',
	initialState: { user: getUser() ?? initialState.user } as UserState,
	reducers: {
		setUser:(state,{payload}:PayloadAction<User>)=>{
			state.user = payload
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.user = payload.user
				setUser(payload.user)
			}
		),
			builder.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, { payload }) => {
					state.user = payload.user
					setUser(payload.user)
				}
			),
			builder.addMatcher(
				authApi.endpoints.refresh.matchFulfilled,
				(state, { payload }) => {
					state.user = payload.user
					setUser(payload.user)
				}
			),
			builder.addMatcher(
				userApi.endpoints.updateAvatar.matchFulfilled,
				(state, { payload }) => {
					state.user.avatar = payload.avatar
					changeAvatar(payload.avatar)
				}
			),
			builder.addMatcher(
				userApi.endpoints.updateUsername.matchFulfilled,
				(state, { payload }) => {
					state.user.username = payload.username
					changeUsername(payload.username)
				}
			)
	},
})


