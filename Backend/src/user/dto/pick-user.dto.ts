import { User } from '../schemas/user.schema'
import { _id } from 'src/types'
import { UserDataPublic } from '../types'

export const pickUserPublicData = (
	user: Omit<User & _id, never>
): UserDataPublic => {
	return {
		_id: user._id,
		email: user.email,
		username: user.username,
		avatar: user.avatar,
	}
}

export const pickUserPublicDataArray = (
	users: Omit<User & _id, never>[]
): UserDataPublic[] => {
	const usersWithPublicData = []
	for (let l = 0; l < users.length; l++) {
		usersWithPublicData.push(pickUserPublicData(users[l]))
	}
	return usersWithPublicData
}
