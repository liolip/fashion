import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.js'
import { AuthProvider } from '../widget/AuthContext'

const rootElement = document.getElementById('root')

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<AuthProvider>
					{' '}
					<App />
				</AuthProvider>
			</BrowserRouter>
		</React.StrictMode>
	)
}
