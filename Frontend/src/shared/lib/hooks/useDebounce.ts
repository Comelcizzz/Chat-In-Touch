import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay?: number): T => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timeoutId = setTimeout(() => setDebouncedValue(value), delay || 300)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [delay, value])

	return debouncedValue
}
