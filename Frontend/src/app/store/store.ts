import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { baseApi } from '@/shared/api/baseApi';
import { authApi } from '@/entities/auth';
import { authSlice } from '@/entities/auth';
import { userSlice } from '@/entities/user';
import { fileApi } from '@/shared/api/fileApi';
import { userApi } from '@/entities/user';
import { chatSlice } from '@/entities/chat';
import { chatMiddleWare } from '@/entities/chat/model/chatMiddleware';
import { chatFormSlice } from '@/entities/chatForm';

export const store = configureStore({
    reducer: {
        baseApi: baseApi.reducer,
        authApi: authApi.reducer,
        fileApi: fileApi.reducer,
        userApi: userApi.reducer,
        authState: authSlice.reducer,
        userState: userSlice.reducer,
        chatState: chatSlice.reducer,
        chatFormState: chatFormSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseApi.middleware,
            authApi.middleware,
            fileApi.middleware,
            userApi.middleware,
            chatMiddleWare 
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;