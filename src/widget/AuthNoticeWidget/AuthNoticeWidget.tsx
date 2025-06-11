import React from 'react'
import styles from './style.module.scss'

interface AuthNoticeWidgetProps {
	isOpen: boolean
	onClose: () => void
	onLoginClick: () => void
	personName: string
}

const AuthNoticeWidget: React.FC<AuthNoticeWidgetProps> = ({
	isOpen,
	onClose,
	onLoginClick,
	personName,
}) => {
	return (
		<div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
			<div className={styles.sidebarContent}>
				<button className={styles.closeButton} onClick={onClose}>
					✕
				</button>
				<h2 className={styles.sidebarTitle}>
					Предложить потомка для {personName}
				</h2>
				<div className={styles.sidebarInfo}>
					<div className={styles.highlightBox}>
						<p>
							Данная форма предназначена для отправки запроса на добавление в
							основное древо потомка выбранного вами человека. Пожалуйста,
							отправляйте только проверенную информацию. После верификации
							данных ваш запрос будет размещен в схеме.
						</p>
					</div>
					<p>
						Только зарегистрированные пользователи могут подать заявку на
						внесение человека в основное древо. Это очень важная информация и
						обрабатывается модераторами и администраторами сайта.
					</p>
					<button className={styles.loginButton} onClick={onLoginClick}>
						Войти в систему
					</button>
				</div>
			</div>
		</div>
	)
}

export default AuthNoticeWidget
