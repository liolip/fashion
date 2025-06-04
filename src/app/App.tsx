import './App.css'
import { Route, Routes } from 'react-router-dom'
import ParticlesBackground from '../widget/ParticlesBackground/ParticlesBackground'
import HeaderWidget from '../widget/headerWidget/HeaderWidget'
import GenealogyTree from '../widget/GenealogyTree/GenealogyTree'

function App() {
	return (
		<div
			style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
		>
			<HeaderWidget />
			<ParticlesBackground />
			<div style={{ flex: 1, padding: '20px' }}>
				<Routes>
					<Route path='/' element={<GenealogyTree />} />
					<Route path='/tree' element={<GenealogyTree />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
