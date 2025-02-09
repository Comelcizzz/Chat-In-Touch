import { SearchIcon } from '@/shared/assets/icons/IconSearch'
import { ChatInput } from '@/shared/ui'
import { styled } from '@mui/material'
import { ChangeEvent, FC } from 'react'

const SearchWrapper = styled('div')`
	display: flex;
	align-items: center;
	gap: 12px;
`

interface SearchBarProps {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SearchBar: FC<SearchBarProps> = ({ onChange }) => {
	return (
		<SearchWrapper>
			<ChatInput
				type="text"
				placeholder="Enter username or e-mail"
				onChange={onChange}
			/>
			<SearchIcon />
		</SearchWrapper>
	)
}
