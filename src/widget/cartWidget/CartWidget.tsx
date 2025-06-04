import React from 'react'
import styles from './style.module.scss'

interface CartWidgetProps {
	isOpen: boolean
	onClose: () => void
}

const CartWidget: React.FC<CartWidgetProps> = ({ isOpen, onClose }) => {
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
				<h1 className={styles.infoTitle}>Информация о Оң Канат Ак уул</h1>
				<div className={styles.imageContainer}>
					<img
						className={styles.infoImage}
						src='https://gen.kg/images/default_cover.webp'
						alt='Оң Канат Ак уул'
						width='485'
						height='200'
					/>
					{/* <img
						className={styles.overlayImage}
						src='https://gen.kg/media/requests/%D0%94%D1%80%D1%83%D…%B5_%D0%B8%D0%BA%D0%BE%D0%BD%D0%BA%D0%B8_2-39.svg'
						alt='Логотип'
					/> */}
				</div>

				<h2 className={styles.sidebarTitle}>Он Канат Ак уул</h2>
				<div className={styles.sidebarInfo}>
					<p>
						Ак уул — элдик санжыралы он канат кыргыз уруулардын аталыш. Элдик
						санжырада кыргыз уруулары он канаттуу туулу, ага: Адигине, Тагай,
						Мунгуш жана монодор уруулары кирет. Санжыралык Ак-уул жонундо
						маалымат тарыхый булактарда анча Сайф ал-Дин Акченин "Максим
						ат-Таварих" (16-к.) аттуу эмгегинде берилет. Элдик санжырада Ак уул
						таза, эз богоно каралы журен кили болгондуктан Жанкорооз атканды
						аттылат. Он канат кыргыз урууларды урааны — "Жанкороо".
					</p>
				</div>
			</div>
		</div>
	)
}

export default CartWidget
