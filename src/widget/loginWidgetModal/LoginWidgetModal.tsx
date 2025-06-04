import React, { useState } from 'react'
import styles from './style.module.scss'
import { auth } from '../../dataBase/firebaseConfig'
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth'

interface Props {
	isOpen: boolean
	onClose: () => void
	onLoginSuccess?: (email: string) => void
}

const LoginWidgetModal: React.FC<Props> = ({
	isOpen,
	onClose,
	onLoginSuccess,
}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [agree, setAgree] = useState(false)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	if (!isOpen) return null

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (!agree) {
			setError('Пожалуйста, согласитесь с условиями сервиса')
			return
		}
		if (!email) {
			setError('Введите email')
			return
		}
		if (!password) {
			setError('Введите пароль')
			return
		}

		try {
			setIsLoading(true)
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)
			onLoginSuccess?.(userCredential.user.email || '')
			onClose()
		} catch (error: any) {
			setError('Ошибка входа: ' + (error.message || 'Проверьте данные'))
		} finally {
			setIsLoading(false)
		}
	}

	const handleGoogleLogin = async () => {
		setError('')
		try {
			setIsLoading(true)
			const provider = new GoogleAuthProvider()
			const result = await signInWithPopup(auth, provider)
			onLoginSuccess?.(result.user.email || '')
			onClose()
		} catch (error: any) {
			setError(
				'Ошибка входа через Google: ' + (error.message || 'Попробуйте позже')
			)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={styles.fullScreenContainer}>
			<button onClick={onClose} className={styles.closeButton}>
				×
			</button>

			<div className={styles.loginContent}>
				<img
					className={styles.logo}
					src='https://gen.kg/images/logo.svg'
					alt='logo'
				/>
				<div className={styles.welcomeSection}>
					<h1>Добро пожаловать!</h1>
					<p>Войдите через email и пароль или через Google</p>
				</div>

				<form onSubmit={handleSubmit} className={styles.phoneForm}>
					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='Email'
						className={styles.phoneInput}
						required
					/>

					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder='Пароль'
						className={styles.phoneInput}
						required
					/>

					<label className={styles.agreeCheckbox}>
						<input
							type='checkbox'
							checked={agree}
							onChange={e => setAgree(e.target.checked)}
						/>
						Я соглашаюсь c защищенным сервисом
					</label>

					{error && <div className={styles.errorMessage}>{error}</div>}

					<button
						type='submit'
						className={styles.submitButton}
						disabled={isLoading}
					>
						{isLoading ? 'Вход...' : 'Войти'}
					</button>

					<button
						className={styles.googleButton}
						onClick={handleGoogleLogin}
						disabled={isLoading}
						type='button'
					>
						Войти через Google
					</button>
				</form>
			</div>
		</div>
	)
}

export default LoginWidgetModal
