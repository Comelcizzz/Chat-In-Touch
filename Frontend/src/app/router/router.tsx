import { AuthLayout } from '@/widgets/auth/ui'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Home } from '@/pages/Home'
import { createBrowserRouter } from 'react-router-dom'
import { ChatLayout } from '@/widgets/chat/Layout'
import { Chat } from '@/pages/Chat'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import { ChatRoom } from '@/pages/ChatRoom'

export const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
		],
	},
	{
		element: (
			<ProtectedRoute>
				<ChatLayout />
			</ProtectedRoute>
		),
		children: [
			{ path: '/chat', element: <Chat /> },
			{ path: '/chat/:id', element: <ChatRoom /> },
		],
	},
])


