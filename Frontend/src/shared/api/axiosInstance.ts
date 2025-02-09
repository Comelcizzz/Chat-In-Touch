import axiosInstance, {
	AxiosError,
	InternalAxiosRequestConfig,
	AxiosResponse,
} from 'axios'

import { AuthResponse } from '@/shared/types/auth.interface'
import { getAccessToken, setAccessToken } from '../lib/utils/cookieService'

const axios = axiosInstance.create({
	baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
	responseType: 'json',
	withCredentials: true,
})

axios.interceptors.request.use(
	async (
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> => {
		const accessToken = getAccessToken()
		if (config.headers && accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	}
)

const onRejectedResponse = async (
	error: AxiosError<{ message: string }>
): Promise<AxiosError> => {
	if (
		error.response?.data.message === 'Access token validation failed' &&
		error.response?.status === 401
	) {
		try {
			const response: AxiosResponse<AuthResponse> = await axios.post(
				'/api/auth/refresh',
				{
					withCredentials: true,
				}
			)
			updateCookie(response)
			if (error.config) return axios.request(error.config)
		} catch (e) {
			console.log(e)
		}
	}

	throw error
}

const onFulfilledResponse = async (
	response: AxiosResponse<AuthResponse>
): Promise<AxiosResponse> => {
	updateCookie(response)
	return response
}

const updateCookie = (response: AxiosResponse<AuthResponse>) => {
	const data = response?.data
	if (data.tokens) {
		setAccessToken(data.tokens.accessToken)
	}
}

axios.interceptors.response.use(onFulfilledResponse, onRejectedResponse)

export { axios }
