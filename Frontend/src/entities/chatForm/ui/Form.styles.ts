import { mobileXS } from '@/shared/lib/constants/media'
import { styled } from '@mui/material'

export const FormWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	justify-items: center;
`

export const StyledForm = styled('form')<{ mode?: 'edit' | 'read' }>`
	padding-top: ${(props) => (props.mode === 'edit' ? 20 : 0)}px;
	display: grid;
	grid-template-columns: 72px 1fr;
	gap: 20px 12px;

	@media ${mobileXS} {
		grid-template-columns: 1fr;
		padding-top: 0;
		svg {
			width: 28px;
			height: 28px;
		}
	}
`
export const Wrapper = styled('div')`
	display: flex;
	gap: 12px;

	@media ${mobileXS} {
		gap: 10px;
	}
`

export const EditInfoWrapper = styled('div')`
	left: 0;
	top: -35px;
	position: absolute;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media ${mobileXS} {
		top: -43px;
		left: 100px;
		max-width: 70%;
		svg {
			width: 18px;
			height: 18px;
		}
	}
`

export const InfoWrapper = styled('div')`
	width: 100%;
	display: flex;
	gap: 12px;
`

export const StyledText = styled('p')`
	color: var(--text-grey);
	font-size: 15px;
	font-style: normal;
	font-weight: 400;
	line-height: 150%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	width: calc(100%);
	max-width: 480px;
	@media ${mobileXS} {
		width: calc(75%);
		max-width: 132px;
		font-size: 12px;
	}
`

export const AttachmentFilesWrapper = styled('div')<{ files: boolean }>`
	padding-bottom: ${(props) => (props.files ? 20 : 0)}px;
	margin: 0 auto;
	display: grid;
	justify-items: center;
	gap: 5px;
	width: 100%;
	grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
	grid-auto-rows: 50px;
`

export const AttachmentFilePreview = styled('div')`
	width: 100%;
	height: 100%;
	position: relative;
	> img {
		width: 100%;
		height: 100%;
	}
	> svg {
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
		cursor: pointer;
		position: absolute;
		top: 0;
		right: 0;
		backdrop-filter: blur(5px);
	}

	&:hover {
		> svg {
			opacity: 1;
		}
	}
`
