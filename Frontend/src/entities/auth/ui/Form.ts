import { mobileXS } from '@/shared/lib/constants/media'
import { styled, keyframes } from '@mui/material'

const appear = keyframes`
from{
opacity: 0;
transform: translateY(100%);
}

to{
opacity: 1;
transform: translateX(0);
}
`

export const StyledForm = styled('form')<{ hidden: boolean }>`
	width: 100%;
	max-width: 452px;
	background: var(--bg-white);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 20px;
	padding: 30px;
	display: flex;
	flex-direction: column;
	gap: 40px;
	margin: 0 auto;
	transition: all 0.2s ease-in-out;
	animation: ${appear} 0.3s ease-in-out;
	transform: translateY(${(props) => (props.hidden ? '100%' : 0)});
	opacity: ${(props) => (props.hidden ? 0 : 1)};

	@media ${mobileXS} {
		padding: 40px 20px;
		gap: 36px;
		border-radius: 12px;
	}
`
