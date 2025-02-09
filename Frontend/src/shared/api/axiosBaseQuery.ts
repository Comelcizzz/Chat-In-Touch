import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axios } from './axiosInstance'
import Axios, { isAxiosError } from 'axios'
import { AuthResponse } from '../types/auth.interface'
import { toast } from 'react-toastify'

export const axiosBaseQuery = <
	Args extends AxiosRequestConfig,
	Result = unknown
>(
	{ baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<Args, Result> => {
	return async (args, api, extraOptions) => {
		const { url, ...rest } = args
		try {
			const result = await axios({
				url: baseUrl + url,
				...rest,
				signal: api.signal,
				...extraOptions,
			})

			return {
				data: result.data,
			}
		} catch (err) {
			if (!Axios.isAxiosError(err)) {
				return {
					error: err,
				}
			}

			if (
				err.response?.data.message ===
					'Access token validation failed' &&
				err.response?.status === 401
			) {
				try {
					const response: AxiosResponse<AuthResponse> =
						await Axios.post('/api/auth/refresh', {
							withCredentials: true,
						})
					api.dispatch({ type: 'authSlice/setAuth' })
					api.dispatch({
						type: 'userSlice/setUser',
						payload: response.data.user,
					})

					if (err.config) return Axios.request(err.config)
				} catch (e) {
					console.log(e)
				}
			}

			if (isAxiosError(err)) {
				toast.error(err.response?.data.message)
			}

			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			}
		}
	}
}
