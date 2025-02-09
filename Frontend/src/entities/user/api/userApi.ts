import {
	FindUserDto,
	UpdateAvatar,
	UpdateUsername,
	UserData,
} from '@/shared/types/user.interface'
import { baseApi } from '../../../shared/api/baseApi'

export const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		findUsers: builder.query<UserData[], FindUserDto>({
			query: ({ value }) => ({
				url: `/user/find?value=${value}`,
				method: 'GET',
			}),
			providesTags: ['User'],
		}),
		updateAvatar: builder.mutation<UpdateAvatar, UpdateAvatar>({
			query: (dto) => ({
				url: '/user/update-avatar',
				method: 'POST',
				data: dto,
			}),
			invalidatesTags: ['User'],
		}),
		updateUsername: builder.mutation<UpdateUsername, UpdateUsername>({
			query: (dto) => ({
				url: '/user/update-username',
				method: 'POST',
				data: dto,
			}),
			invalidatesTags: ['User'],
		}),
	}),
})

export const {
	useLazyFindUsersQuery,
	useUpdateAvatarMutation,
	useUpdateUsernameMutation,
} = userApi
