import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { config } from 'dotenv'

config()

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	server: {
		proxy: {
			'^/uploads/': {
				target: process.env.VITE_PUBLIC_API_BASE_URL || 'http://localhost:3000',
				changeOrigin: true,
			},
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
			}
		},
	},
})
