import {
	MouseEvent as MouseEventReact,
	TouchEvent as TouchEventReact,
} from 'react'

export const getEventCoordinates = (
	e:
		| TouchEvent
		| MouseEvent
		| TouchEventReact<HTMLDivElement>
		| MouseEventReact<HTMLDivElement>
) => {
	if ('touches' in e) {
		return { x: e.touches[0].clientX, y: e.touches[0].clientY }
	} else {
		return { x: e.clientX, y: e.clientY }
	}
}
