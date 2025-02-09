import { NavBlock } from '@/entities/auth/ui/NavBlock'
import { TitleCardsList } from '@/widgets/auth/ui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
	const [hidden, setHidden] = useState(false)
	const nav = useNavigate()

	const handleClickNav = (to: string) => {
		setHidden(true)
		setTimeout(() => {
			nav(to)
		}, 200)
	}

	return (
		<>
			<NavBlock
				onClickLogin={() => handleClickNav('login')}
				onClickRegister={() => handleClickNav('register')}
			/>
			<TitleCardsList hidden={hidden} />
		</>
	)
}
