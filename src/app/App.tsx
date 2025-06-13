import './App.css'
import { Route, Routes } from 'react-router-dom'
import ParticlesBackground from '../widget/ParticlesBackground/ParticlesBackground'
import HeaderWidget from '../widget/headerWidget/HeaderWidget'
import GenealogyTree from '../widget/GenealogyTree/GenealogyTree'
import BookIcon from '../widget/BookIcon/BookIcon'
import ButtonWidget from '../widget/buttonWidget/ButtonWidget'

function App() {
	return (
		<div
			style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
		>
			<HeaderWidget />
			<ParticlesBackground />

			{/* Маршруты */}
			<Routes>
				<Route path='/' element={<GenealogyTree />} />
				<Route path='/tree' element={<GenealogyTree />} />
			</Routes>

			{/* Кнопки отображаются всегда */}
			<div
				style={{
					position: 'fixed',
					bottom: '20px',
					right: '20px',
					zIndex: 1000,
				}}
			>
				<ButtonWidget
					onInfoClick={() => console.log('Инфо нажато')}
					onDeleteClick={() => console.log('Удалить нажато')}
				/>
			</div>
		</div>
	)
}

export default App
