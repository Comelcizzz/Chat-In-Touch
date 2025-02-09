import { useEffect, useState } from 'react'

export const useContextMenu = () => {
	const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
	const [clicked, setClicked] = useState(false)

	useEffect(() => {
		const handleClicked = () => setClicked(false)

		window.addEventListener('click', handleClicked)

		return () => window.removeEventListener('click', handleClicked)
	}, [])

	return { coordinates, setCoordinates, clicked, setClicked }
}
