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
// 	onUpdate?: (updatedPerson: PersonType) => void // callback на обновление
// }

// const CartWidget: React.FC<CartWidgetProps> = ({
// 	isOpen,
// 	onClose,
// 	person,
// 	onUpdate,
// }) => {
// 	const [isEditing, setIsEditing] = useState(false)
// 	const [editedName, setEditedName] = useState(person?.name || '')
// 	const [editedDescription, setEditedDescription] = useState(
// 		person?.description || ''
// 	)

// 	if (!person) return null

// 	const handleSave = () => {
// 		const updatedPerson = {
// 			...person,
// 			name: editedName,
// 			description: editedDescription,
// 		}
// 		onUpdate?.(updatedPerson)
// 		setIsEditing(false)
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

// 				<div className={styles.imageContainer}>
// 					<img
// 						className={styles.infoImage}
// 						src={person.imageUrl || 'https://gen.kg/images/default_cover.webp'}
// 						alt={person.name}
// 						width='485'
// 						height='200'
// 					/>
// 				</div>

// 				<div className={styles.headerWithEdit}>
// 					{isEditing ? (
// 						<input
// 							className={styles.editInput}
// 							value={editedName}
// 							onChange={e => setEditedName(e.target.value)}
// 						/>
// 					) : (
// 						<h2 className={styles.sidebarTitle}>{person.name}</h2>
// 					)}

// 					<button
// 						className={styles.editButton}
// 						onClick={() => {
// 							if (isEditing) {
// 								handleSave()
// 							} else {
// 								setIsEditing(true)
// 								setEditedName(person.name)
// 								setEditedDescription(person.description)
// 							}
// 						}}
// 					>
// 						{isEditing ? 'Сохранить' : '✏️'}
// 					</button>
// 				</div>

// 				<div className={styles.sidebarInfo}>
// 					{isEditing ? (
// 						<textarea
// 							className={styles.editTextarea}
// 							value={editedDescription}
// 							onChange={e => setEditedDescription(e.target.value)}
// 						/>
// 					) : (
// 						<p>{person.description}</p>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default CartWidget
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
// import React from 'react'
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
// 	if (!person || !isOpen) return null

// 	return (
// 		// Это фон, по клику на который будем закрывать модалку
// 		<div className={styles.backdrop} onClick={onClose}>
// 			{/*
// 				Внутренний блок с содержимым — останавливаем всплытие клика,
// 				чтобы клик по нему не закрывал окно
// 			*/}
// 			<div
// 				className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
// 				onClick={e => e.stopPropagation()}
// 			>
// 				<div className={styles.sidebarContent}>
// 					<button className={styles.closeButton} onClick={onClose}>
// 						<svg
// 							width='24'
// 							height='24'
// 							viewBox='0 0 24 24'
// 							fill='none'
// 							xmlns='http://www.w3.org/2000/svg'
// 						>
// 							<path
// 								d='M18 6L6 18'
// 								stroke='#333'
// 								strokeWidth='2'
// 								strokeLinecap='round'
// 							/>
// 							<path
// 								d='M6 6L18 18'
// 								stroke='#333'
// 								strokeWidth='2'
// 								strokeLinecap='round'
// 							/>
// 						</svg>
// 					</button>

// 					<h1 className={styles.infoTitle}>Информация о {person.name}</h1>

// 					<div className={styles.imageContainer}>
// 						<img
// 							className={styles.infoImage}
// 							src={
// 								person.imageUrl || 'https://gen.kg/images/default_cover.webp'
// 							}
// 							alt={person.name}
// 							width='485'
// 							height='200'
// 						/>
// 					</div>

// 					<h2 className={styles.sidebarTitle}>{person.name}</h2>

// 					<div className={styles.sidebarInfo}>
// 						<p>{person.description}</p>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default CartWidget
