import { baseApi } from '../../../shared/api/baseApi'
import {
	AuthData,
	AuthResponse,
} from '@/shared/types/auth.interface'

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<AuthResponse, AuthData>({
			query: (dto) => ({
				url: '/auth/registration',
				method: 'POST',
				data: dto,
			}),
			invalidatesTags: ['User'],
		}),
		login: builder.mutation<AuthResponse, AuthData>({
			query: (dto) => ({
				url: '/auth/login',
				method: 'POST',
				data: dto,
			}),
			invalidatesTags: ['User'],
		}),
		refresh: builder.mutation<AuthResponse, void>({
			query: () => ({
				url: '/auth/refresh',
				method: 'POST',
			}),
			invalidatesTags: ['User'],
		}),
	}),
})

export const { useLoginMutation, useRefreshMutation, useRegisterMutation } =
	authApi
