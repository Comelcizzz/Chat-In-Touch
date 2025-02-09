import { onlyNumberRegexp } from '@/shared/lib/constants/regexp'

interface GetScrollValuesReturn {
	currentScroll: number
	gap: number
	amount: number
}

export const getScrollValues = (
	refElement: HTMLDivElement,
	property: string
): GetScrollValuesReturn => {
	const amount = refElement.firstElementChild?.clientHeight ?? 0
	const gap = +window
		.getComputedStyle(refElement)
		.getPropertyValue(property)
		.replace(onlyNumberRegexp, '')

	const currentScroll = refElement.scrollTop


	return { amount, gap, currentScroll }
}
