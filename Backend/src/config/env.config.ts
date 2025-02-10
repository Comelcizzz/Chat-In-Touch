export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	jwt: {
		accessSecret: process.env.JWT_ACCESS_SECRET,
		refreshSecret: process.env.JWT_REFRESH_SECRET,
	},
	database: {
		uri: process.env.MONGO_URI,
	},
	client: {
		url: process.env.CLIENT_URL,
	},
})
