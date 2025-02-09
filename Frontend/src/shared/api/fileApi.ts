import { baseApi } from '.'
import { FileResponse, FileUpload } from '../types/file.interface'

export const fileApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		uploadFile: builder.mutation<FileResponse, FileUpload>({
			query: ({ file, folder }) => ({
				url: `/files/upload?folder=${folder}`,
				method: 'POST',
				headers: { ContentType: 'multipart/form-data' },
				data: file,
			}),
			invalidatesTags: ['User'],
		}),
		deleteFile: builder.mutation<void, string>({
			query: (path) => ({
				url: `/files/delete?path=${path}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['User'],
		}),
	}),
})


export const {useDeleteFileMutation,useUploadFileMutation} = fileApi