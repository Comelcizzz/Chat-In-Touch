import { Provider } from 'react-redux'
import { store } from './store/store'
import { RouterProvider } from 'react-router-dom'
import './styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import { router } from './router/router'

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	)
}

export default App
