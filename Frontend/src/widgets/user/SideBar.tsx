import { selectChats } from '@/entities/chat'
import { useControls } from '@/entities/user'
import { useLazyFindUsersQuery } from '@/entities/user/api/userApi'
import { SearchBar } from '@/features/user/SearchBar'
import { SearchControls } from '@/features/user/SearchControls'
import { UserCardList } from '@/features/user/UserCardList'
import { mobileXS } from '@/shared/lib/constants/media'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { Box, CircularProgress, styled } from '@mui/material'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StyledSideBar = styled('aside')<{ route: boolean }>`
	display: grid;
	grid-area: sidebar;
	padding: 0 28px 28px;
	grid-template: max-content 1fr max-content / 1fr;
	gap: 28px;

	@media ${mobileXS} {
		display: ${(props) => (props.route ? 'none' : 'grid')};
		gap: 20px;
	}
`

export const SideBar: FC = () => {
	const { id } = useParams()
	const chats = useAppSelector(selectChats)
	const [value, setValue] = useState('')
	const debouncedValue = useDebounce(value)
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const { downHandlers, upHandlers, listRef } = useControls()

	const [fetchUsers, { isLoading, data }] = useLazyFindUsersQuery()

	useEffect(() => {
		fetchUsers({ value: debouncedValue })
	}, [chats, debouncedValue, fetchUsers])

	return (
		<StyledSideBar route={id !== undefined}>
			<SearchBar onChange={handleChange} />
			{isLoading && (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress sx={{ color: '#00F0FF' }} />
				</Box>
			)}
			{data && <UserCardList ref={listRef} users={data} />}
			<SearchControls
				downHandlers={downHandlers}
				upHandlers={upHandlers}
			/>
		</StyledSideBar>
	)
}
