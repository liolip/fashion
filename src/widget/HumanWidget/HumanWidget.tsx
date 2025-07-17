import React, { useState } from 'react'
import styles from './style.module.scss'

interface Props {
	isOpen: boolean
	onClose: () => void
	onSubmit: (name: string, description: string) => void
}

const HumanWidgetSidebar: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!name.trim()) return
		onSubmit(name.trim(), description.trim())
		setName('')
		setDescription('')
		onClose()
	}

	return (
		<div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
			<div className={styles.sidebarContent}>
				<button onClick={onClose} className={styles.closeButton}>
					×
				</button>

				<h2 className={styles.sidebarTitle}>Предложить потомка...</h2>

				<div className={styles.sidebarInfoBox}>
					<p>
						Данная форма предназначена для отправки запроса на добавление в
						основное древо потомка выбранного вами человека. Пожалуйста,
						отправляйте только проверенную информацию. После верификации данных
						ваш запрос будет размещен в схеме.
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					<label className={styles.label}>Имя</label>
					<input
						type='text'
						className={styles.input}
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder='Введите имя'
						required
					/>

					<div className={styles.textareaWrapper}>
						<label className={styles.label}>Описание</label>
						<textarea
							className={styles.textarea}
							value={description}
							onChange={e => setDescription(e.target.value)}
							placeholder='Добавьте описание (необязательно)'
							rows={8}
						/>
					</div>

					<button type='submit' className={styles.submitButton}>
						Добавить
					</button>
				</form>
			</div>
		</div>
	)
}

export default HumanWidgetSidebar
