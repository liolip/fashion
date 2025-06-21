import './App.css'
import { Route, Routes } from 'react-router-dom'
import ParticlesBackground from '../widget/ParticlesBackground/ParticlesBackground'
import HeaderWidget from '../widget/headerWidget/HeaderWidget'
import GenealogyTree from '../widget/GenealogyTree/GenealogyTree'
import BookIcon from '../widget/BookIcon/BookIcon'
import About from '../pages/about/About'
// import ButtonWidget from '../widget/buttonWidget/ButtonWidget'

function App() {
	return (
		<div
			style={{
				display: 'flex',
				minHeight: '100vh',
				flexDirection: 'column',
				height: '100vh',
			}}
		>
			<HeaderWidget />
			<ParticlesBackground />

			<Routes>
				<Route path='/about' element={<About />} />

				<Route path='/' element={<GenealogyTree />} />
				<Route path='/tree' element={<GenealogyTree />} />
			</Routes>

			<div
				style={{
					position: 'fixed',
					bottom: '20px',
					right: '20px',
					zIndex: 1000,
				}}
			></div>
		</div>
	)
}

export default App
