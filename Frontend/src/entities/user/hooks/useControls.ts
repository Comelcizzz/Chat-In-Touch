import { RefObject, useRef } from 'react'
import { getScrollValues } from '../utils/getScrollValues'
import type {
	TouchEvent as ReactTouchEvent,
	MouseEvent as ReactMouseEvent,
} from 'react'

export interface HookHandlers {
	onMouseDown: () => void
	onMouseUp: () => void
	onMouseMove: () => void
	onTouchStart: () => void
	onTouchEnd: () => void
	onContextMenu: (
		e: ReactMouseEvent<HTMLButtonElement> | ReactTouchEvent<HTMLButtonElement>
	) => void
}

interface UseControlsReturn {
	listRef: RefObject<HTMLDivElement>
	upHandlers: HookHandlers
	downHandlers: HookHandlers
}

export const useControls = (speed?: number): UseControlsReturn => {
	const listRef = useRef<HTMLDivElement>(null)
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
	const isScrolled = useRef<boolean>(false)

	const setIsMoved = (state: boolean) => (isScrolled.current = state)

	const holdScrollUp = () => {
		if (!listRef.current) return

		if (isScrolled.current) {
			listRef.current.scrollTop = listRef.current.scrollTop - (speed ?? 10)
			requestAnimationFrame(holdScrollUp)
		}
	}

	const holdScrollDown = () => {
		if (!listRef.current) return

		if (isScrolled.current) {
			listRef.current.scrollTop = listRef.current.scrollTop + (speed ?? 10)
			requestAnimationFrame(holdScrollDown)
		}
	}

	const onActionStartUp = () => {
		handleClickUp()
		setIsMoved(true)
		timeoutRef.current = setTimeout(holdScrollUp, 100)
	}

	const onActionStartDown = () => {
		handleClickDown()
		setIsMoved(true)
		timeoutRef.current = setTimeout(holdScrollDown, 100)
	}

	const onActionEnd = () => {
		setIsMoved(false)
		clearTimeout(timeoutRef.current)
	}

	const handleClickDown = () => {
		if (!listRef.current) return
		const { amount, currentScroll, gap } = getScrollValues(
			listRef.current,
			'gap'
		)
		const quantity = currentScroll + (amount + gap)

		listRef.current.scrollTo({ behavior: 'smooth', top: quantity })
	}

	const handleClickUp = () => {
		if (!listRef.current) return
		const { amount, currentScroll, gap } = getScrollValues(
			listRef.current,
			'gap'
		)
		const quantity = currentScroll - (amount + gap)

		listRef.current.scrollTo({ behavior: 'smooth', top: quantity })
	}

	const handleContextMenu = (
		e: ReactMouseEvent<HTMLButtonElement> | ReactTouchEvent<HTMLButtonElement>
	) => {
		e.preventDefault()
		e.stopPropagation()
	}

	return {
		listRef,
		upHandlers: {
			onMouseDown: onActionStartUp,
			onMouseUp: onActionEnd,
			onMouseMove: onActionEnd,
			onTouchStart: onActionStartUp,
			onTouchEnd: onActionEnd,
			onContextMenu: handleContextMenu,
		},
		downHandlers: {
			onMouseDown: onActionStartDown,
			onMouseUp: onActionEnd,
			onMouseMove: onActionEnd,
			onTouchStart: onActionStartDown,
			onTouchEnd: onActionEnd,
			onContextMenu: handleContextMenu,
		},
	}
}
