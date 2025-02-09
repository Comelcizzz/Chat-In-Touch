import { UserCard } from '@/entities/user/ui/UserCard'
import { mobileXS } from '@/shared/lib/constants/media'
import { UserData } from '@/shared/types/user.interface'
import { styled } from '@mui/material'
import { forwardRef, useMemo } from 'react'

const CardList = styled('div')`
	max-height: 372px;
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: max-content;
	gap: 23px;
	overflow-y: auto;
	overflow-x: hidden;

	@media ${mobileXS} {
		gap: 16px;
	}
`

interface UserCardListProps {
	users: UserData[]
}

export const UserCardList = forwardRef<HTMLDivElement, UserCardListProps>(
	({ users }, ref) => {
		const sortedUsers = useMemo(
			() =>
				[...users].sort(
					(a, b) =>
						new Date(
							b?.chat?.messages?.[b?.chat?.messages?.length - 1]
								?.createdAt ?? 0
						).getTime() -
						new Date(
							a?.chat?.messages?.[a?.chat?.messages?.length - 1]
								?.createdAt ?? 0
						).getTime()
				),
			[users]
		)

		return (
			<CardList ref={ref}>
				{sortedUsers.map((userData) => (
					<UserCard key={userData._id} userData={userData} />
				))}
			</CardList>
		)
	}
)
