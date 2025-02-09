import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string): boolean => {
	const getMatches = (query: string): boolean =>
		window.matchMedia(query).matches

	const [matches, setMatches] = useState<boolean>(getMatches(query))

	const handleChange = () => setMatches(getMatches(query))

	useEffect(() => {
		const matchMedia = window.matchMedia(query)

		handleChange()

		matchMedia.addEventListener('change', handleChange)

		return () => matchMedia.removeEventListener('change', handleChange)
	}, [query])

	return matches
}
