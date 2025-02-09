import { useRefreshMutation } from '@/entities/auth'
import { selectAuth } from '@/entities/auth/model'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { FullScreenLoader } from '@/shared/ui/Loaders/FullScreenLoader'

import { FC, PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
	const [refresh, { isLoading, isUninitialized }] = useRefreshMutation()
	const nav = useNavigate()
	const isAuth = useAppSelector(selectAuth)

	useEffect(() => {
		refresh()
	}, [])

	useEffect(() => {
		if (
			isAuth === false &&
			isUninitialized === false &&
			isLoading === false
		) {
			nav('/', { replace: true })
		}
	}, [isAuth, isUninitialized, isLoading, nav])

	if (isLoading) {
		return <FullScreenLoader />
	}

	return children
}
