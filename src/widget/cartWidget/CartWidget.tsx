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
	person: PersonType | null
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
