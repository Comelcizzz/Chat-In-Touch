import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { baseApi } from '@/shared/api/baseApi'
import { authApi } from '@/entities/auth'
import { authSlice } from '@/entities/auth'
import { userSlice } from '@/entities/user'
import { fileApi } from '@/shared/api/fileApi'
import { userApi } from '@/entities/user'
import { chatSlice } from '@/entities/chat'
import { chatMiddleWare } from '@/entities/chat/model/chatMiddleware'
import { chatFormSlice } from '@/entities/chatForm'

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[fileApi.reducerPath]: fileApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		authState: authSlice.reducer,
		userState: userSlice.reducer,
		chatState: chatSlice.reducer,
		chatFormState: chatFormSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(baseApi.middleware)
			.concat(authApi.middleware)
			.concat(fileApi.middleware)
			.concat(userApi.middleware)
			.concat(chatMiddleWare)
	}
})

setupListeners(store.dispatch)
