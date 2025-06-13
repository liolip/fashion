import React from 'react'
import styles from './style.module.scss'

interface PersonType {
	id: string
	name: string
	description: string
	imageUrl?: string
}

interface CartWidgetProps {
	isOpen: boolean
	onClose: () => void
	person?: PersonType | null
}

const CartWidget: React.FC<CartWidgetProps> = ({ isOpen, onClose, person }) => {
	if (!person) return null

	return (
		<div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
			<div className={styles.sidebarContent}>
				<button className={styles.closeButton} onClick={onClose}>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M18 6L6 18'
							stroke='#333'
							strokeWidth='2'
							strokeLinecap='round'
						/>
						<path
							d='M6 6L18 18'
							stroke='#333'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</svg>
				</button>

				<h1 className={styles.infoTitle}>Информация о {person.name}</h1>

				<div className={styles.imageContainer}>
					<img
						className={styles.infoImage}
						src={person.imageUrl || 'https://gen.kg/images/default_cover.webp'}
						alt={person.name}
						width='485'
						height='200'
					/>
				</div>

				<h2 className={styles.sidebarTitle}>{person.name}</h2>

				<div className={styles.sidebarInfo}>
					<p>{person.description}</p>
				</div>
			</div>
		</div>
	)
}

export default CartWidget
// import React, { useState } from 'react'
// import styles from './style.module.scss'

// interface PersonType {
// 	id: string
// 	name: string
// 	description: string
// 	imageUrl?: string
// }

// interface CartWidgetProps {
// 	isOpen: boolean
// 	onClose: () => void
// 	person?: PersonType | null
// }

// const CartWidget: React.FC<CartWidgetProps> = ({ isOpen, onClose, person }) => {
// 	const [transform, setTransform] = useState({
// 		rotateX: 0,
// 		rotateY: 0,
// 		translateX: 0,
// 		translateY: 0,
// 	})

// 	if (!person) return null

// 	// Максимальное смещение и вращение (чтобы не слишком сильно двигалось)
// 	const maxTranslate = 15
// 	const maxRotate = 10

// 	const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
// 		const rect = e.currentTarget.getBoundingClientRect()
// 		const x = e.clientX - rect.left // позиция мыши внутри блока по X
// 		const y = e.clientY - rect.top // по Y
// 		const centerX = rect.width / 2
// 		const centerY = rect.height / 2

// 		// Рассчитываем смещение относительно центра в диапазоне [-1, 1]
// 		const deltaX = (x - centerX) / centerX
// 		const deltaY = (y - centerY) / centerY

// 		// Отталкиваем изображение от курсора — умножаем на -1
// 		setTransform({
// 			translateX: -deltaX * maxTranslate,
// 			translateY: -deltaY * maxTranslate,
// 			rotateX: deltaY * maxRotate,
// 			rotateY: -deltaX * maxRotate,
// 		})
// 	}

// 	const onMouseLeave = () => {
// 		// Возвращаем в исходное положение
// 		setTransform({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 })
// 	}

// 	return (
// 		<div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
// 			<div className={styles.sidebarContent}>
// 				<button className={styles.closeButton} onClick={onClose}>
// 					<svg
// 						width='24'
// 						height='24'
// 						viewBox='0 0 24 24'
// 						fill='none'
// 						xmlns='http://www.w3.org/2000/svg'
// 					>
// 						<path
// 							d='M18 6L6 18'
// 							stroke='#333'
// 							strokeWidth='2'
// 							strokeLinecap='round'
// 						/>
// 						<path
// 							d='M6 6L18 18'
// 							stroke='#333'
// 							strokeWidth='2'
// 							strokeLinecap='round'
// 						/>
// 					</svg>
// 				</button>

// 				<h1 className={styles.infoTitle}>Информация о {person.name}</h1>

// 				<div
// 					className={styles.imageContainer}
// 					style={{ perspective: 800 }}
// 					onMouseMove={onMouseMove}
// 					onMouseLeave={onMouseLeave}
// 				>
// 					<img
// 						className={styles.infoImage}
// 						src={person.imageUrl || 'https://gen.kg/images/default_cover.webp'}
// 						alt={person.name}
// 						width='485'
// 						height='200'
// 						style={{
// 							transform: `
// 								translateX(${transform.translateX}px)
// 								translateY(${transform.translateY}px)
// 								rotateX(${transform.rotateX}deg)
// 								rotateY(${transform.rotateY}deg)
// 							`,
// 							transformStyle: 'preserve-3d',
// 							transition: 'transform 0.2s ease-out',
// 							borderRadius: 10,
// 							cursor: 'default',
// 							userSelect: 'none',
// 						}}
// 						draggable={false}
// 					/>
// 				</div>

// 				<h2 className={styles.sidebarTitle}>{person.name}</h2>

// 				<div className={styles.sidebarInfo}>
// 					<p>{person.description}</p>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default CartWidget
