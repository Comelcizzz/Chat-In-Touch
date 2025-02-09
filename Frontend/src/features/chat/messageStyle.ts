import { styled, keyframes } from '@mui/material'
import { mobileXS } from '@/shared/lib/constants/media'

const appear = keyframes`
0%{
	
transform: scale(0);
}
50%{
	
transform: scale(0);
}
100%{
	transform: scale(1);
	
}
`

export const MessageWrapper = styled('div')<{ Position: boolean }>`
	display: flex;
	gap: 12px;
	max-width: 611px;
	justify-self: ${(props) => (props.Position ? 'start' : 'end')};

	> button {
		align-self: start;
	}

	user-select: none;

	@media ${mobileXS} {
		gap: 10px;
		max-width: 250px;
	}
`

export const StyledMessage = styled('div')<{ Position: boolean }>`
	position: relative;
	display: flex;
	flex-wrap: wrap;
	gap: 5px 20px;
	padding: 7px 12px;
	background: rgba(255, 255, 255, 0.7);
	border-radius: ${(props) =>
		props.Position ? '0px 10px 10px 10px' : '10px 0px 10px 10px'};

	@media ${mobileXS} {
		padding: 6px 10px;
	}
`

export const MessageContent = styled('p')`
	max-width: 492px;
	word-break: break-word;
	color: var(--text-black);
	font-size: 16px;
	line-height: 150%;
	letter-spacing: 0.02em;

	@media ${mobileXS} {
		max-width: fit-content;
		font-size: 14px;
	}
`

export const DateWrapper = styled('div')`
	display: flex;
	gap: 5px;
	width: fit-content;
	margin-left: auto;
	align-self: end;
	svg {
		flex-shrink: 0;
	}
`

export const LikeWrapper = styled('div')`
	cursor: pointer;
	display: flex;
	gap: 5px;
	padding: 5px;
	align-items: center;
	background-color: rgba(110, 110, 110, 0.4);
	backdrop-filter: blur(10px);
	border-radius: 15px;

	> svg {
		width: 15px;
		height: 15px;
		@media ${mobileXS} {
			width: 13px;
			height: 13px;
		}
	}

	.MuiAvatarGroup-root {
		.MuiAvatar-root {
			border: none;
			width: 15px;
			height: 15px;

			@media ${mobileXS} {
				width: 13px;
				height: 13px;
			}
		}
	}

	@media ${mobileXS} {
		gap: 3px;
		padding: 3px;
	}
`

export const StyledDate = styled('span')`
	font-size: 13px;
	line-height: 150%;
	color: rgba(0, 0, 0, 0.5);
	align-self: end;

	@media ${mobileXS} {
		font-size: 12px;
	}
`

export const FilesContainer = styled('div')`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
	gap: 10px;
`

export const StyledFile = styled('img')`
	width: 100%;
	height: 100%;
	border-radius: 8px;
	object-fit: cover;
`

export const LikeHandler = styled('div')`
	position: absolute;
	top: -5px;
	right: -10px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	animation: ${appear} 0.5s ease-in;
	border-radius: 50%;
	background-color: var(--bg-white);
	box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
	padding: 4px;
	transition: transform 0.1s ease-in;

	&:hover {
		transform: scale(1.5);
	}

	@media ${mobileXS} {
		right: -5px;
		padding: 3px;

		> svg {
			width: 13px;
			height: 13px;
		}

		&:hover {
			transform: scale(1.3);
		}
	}
`
