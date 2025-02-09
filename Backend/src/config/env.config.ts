export default () => ({
	jwt: {
		accessSecret: process.env.JWT_ACCESS_SECRET,
		refreshSecret: process.env.JWT_REFRESH_SECRET,
	},
	clientUrl: process.env.CLIENT_URL,
	mongoUri: process.env.MONGO_URI,
})
