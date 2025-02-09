import dayjs from 'dayjs'

export const getDate = (dateString: string, type: 'date' | 'time' = 'date') => {
	const date = dayjs(dateString)

	return type === 'date' ? date.format('D.M.YYYY') : date.format('H:mm')
}
