import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(calendar)

export const getRelativeCalendarTime = (date: string) => {
	return dayjs(date).calendar(undefined, {
		sameDay: 'H:mm ',
		lastDay: '[YD] H:mm ',
		lastWeek: 'ddd',
		sameElse: function () {
			return Math.floor(Date.now() / 1000) -
				Math.floor(new Date(date).getTime() / 1000) >
				1814400
				? dayjs(date).format('DD.MM.YYYY')
				: dayjs(date).format('D MMMM')
		},
	})
}
