import { CircularProgress, styled } from '@mui/material'

const LoaderWrapper = styled('span')`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
`

export const ProcessLoader = () => {
	return (
		<LoaderWrapper>
			<CircularProgress size={24} />
			Loading...
		</LoaderWrapper>
	)
}
