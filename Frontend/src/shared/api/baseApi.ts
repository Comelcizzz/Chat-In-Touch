import { createApi } from '@reduxjs/toolkit/dist/query/react'
import {axiosBaseQuery} from './axiosBaseQuery'

export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: axiosBaseQuery({ baseUrl: 'api' }),
	tagTypes: ['User'],
	endpoints: () => ({}),
})
