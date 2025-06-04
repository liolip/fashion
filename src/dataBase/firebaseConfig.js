// import { initializeApp, FirebaseApp } from 'firebase/app'
// import {
// 	getAuth,
// 	Auth,
// 	RecaptchaVerifier,
// 	ConfirmationResult,
// 	User,
// 	signInWithPhoneNumber,
// } from 'firebase/auth'
// const firebaseConfig = {
// 	apiKey: 'AIzaSyA0RP5cD6qlpVlP2SU-J_f28yvGn6MOuZQ',
// 	authDomain: 'fashion-e9cb3.firebaseapp.com',
// 	projectId: 'fashion-e9cb3',
// 	storageBucket: 'fashion-e9cb3.appspot.com',
// 	messagingSenderId: '981975763225',
// 	appId: '1:981975763225:web:7d4484abd37cdc261a9d88',
// 	measurementId: 'G-QMSSB2LP1P',
// }
// const app: FirebaseApp = initializeApp(firebaseConfig)
// const auth: Auth = getAuth(app)
// declare global {
// 	interface Window {
// 		recaptchaVerifier?: RecaptchaVerifier
// 		confirmationResult?: ConfirmationResult
// 	}
// }
// export function setupRecaptcha(
// 	containerId = 'recaptcha-container'
// ): RecaptchaVerifier {
// 	if (!window.recaptchaVerifier) {
// 		if (!document.getElementById(containerId)) {
// 			const container = document.createElement('div')
// 			container.id = containerId
// 			// Контейнер можно скрыть через CSS
// 			container.style.display = 'none'
// 			document.body.appendChild(container)
// 		}
// 		window.recaptchaVerifier = new RecaptchaVerifier(
// 			containerId,
// 			{
// 				size: 'invisible',
// 				callback: (response: string) => {
// 					console.log('reCAPTCHA решена', response)
// 				},
// 				'expired-callback': () => {
// 					console.warn('reCAPTCHA истекла')
// 				},
// 			},
// 			auth
// 		)
// 	}
// 	return window.recaptchaVerifier
// }
// export async function sendVerificationCode(phoneNumber: string): Promise<void> {
// 	const appVerifier = setupRecaptcha()
// 	const confirmationResult = await signInWithPhoneNumber(
// 		auth,
// 		phoneNumber,
// 		appVerifier
// 	)
// 	window.confirmationResult = confirmationResult
// 	console.log('Код отправлен на номер:', phoneNumber)
// }
// export async function verifyCode(code: string): Promise<User> {
// 	if (!window.confirmationResult) {
// 		throw new Error('Нет результата подтверждения. Отправьте код сначала.')
// 	}
// 	const result = await window.confirmationResult.confirm(code)
// 	console.log('Вход выполнен:', result.user.phoneNumber)
// 	return result.user
// }
// export { auth }
// import { initializeApp, FirebaseApp } from 'firebase/app'
// import {
// 	getAuth,
// 	Auth,
// 	RecaptchaVerifier,
// 	ConfirmationResult,
// 	User,
// 	signInWithPhoneNumber,
// } from 'firebase/auth'
// // ✅ Конфигурация Firebase
// const firebaseConfig = {
// 	apiKey: 'AIzaSyA0RP5cD6qlpVlP2SU-J_f28yvGn6MOuZQ',
// 	authDomain: 'fashion-e9cb3.firebaseapp.com',
// 	projectId: 'fashion-e9cb3',
// 	storageBucket: 'fashion-e9cb3.appspot.com',
// 	messagingSenderId: '981975763225',
// 	appId: '1:981975763225:web:7d4484abd37cdc261a9d88',
// 	measurementId: 'G-QMSSB2LP1P',
// }
// // ✅ Инициализация Firebase
// const app: FirebaseApp = initializeApp(firebaseConfig)
// const auth: Auth = getAuth(app)
// // ✅ Расширяем глобальное окно
// declare global {
// 	interface Window {
// 		recaptchaVerifier?: RecaptchaVerifier
// 		confirmationResult?: ConfirmationResult
// 	}
// }
// // ✅ Настройка reCAPTCHA в указанном формате
// export function setupRecaptcha(
// 	containerId: string = 'recaptcha-container'
// ): RecaptchaVerifier {
// 	if (!window.recaptchaVerifier) {
// 		if (!document.getElementById(containerId)) {
// 			const container = document.createElement('div')
// 			container.id = containerId
// 			document.body.appendChild(container)
// 		}
// 		window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
// 			size: 'normal', // или 'invisible' если хочешь скрытую капчу
// 			callback: (response: string) => {
// 				console.log('reCAPTCHA решена:', response)
// 			},
// 			'expired-callback': () => {
// 				console.warn('reCAPTCHA истекла')
// 			},
// 		})
// 	}
// 	return window.recaptchaVerifier
// }
// // ✅ Отправка SMS-кода
// export async function sendVerificationCode(phoneNumber: string): Promise<void> {
// 	const appVerifier = setupRecaptcha()
// 	try {
// 		const confirmationResult = await signInWithPhoneNumber(
// 			auth,
// 			phoneNumber,
// 			appVerifier
// 		)
// 		window.confirmationResult = confirmationResult
// 		console.log('Код отправлен на номер:', phoneNumber)
// 	} catch (error) {
// 		console.error('Ошибка при отправке кода:', error)
// 		throw error
// 	}
// }
// // ✅ Подтверждение кода
// export async function verifyCode(code: string): Promise<User> {
// 	if (!window.confirmationResult) {
// 		throw new Error('Сначала отправьте код на телефон.')
// 	}
// 	try {
// 		const result = await window.confirmationResult.confirm(code)
// 		console.log('Вход выполнен:', result.user.phoneNumber)
// 		return result.user
// 	} catch (error) {
// 		console.error('Неверный код:', error)
// 		throw error
// 	}
// }
// export { auth }
// import { initializeApp, FirebaseApp } from 'firebase/app'
// import {
// 	getAuth,
// 	Auth,
// 	RecaptchaVerifier,
// 	ConfirmationResult,
// 	User,
// 	signInWithPhoneNumber,
// 	signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
// 	createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
// } from 'firebase/auth'
// const firebaseConfig = {
// 	apiKey: 'AIzaSyA0RP5cD6qlpVlP2SU-J_f28yvGn6MOuZQ',
// 	authDomain: 'fashion-e9cb3.firebaseapp.com',
// 	projectId: 'fashion-e9cb3',
// 	storageBucket: 'fashion-e9cb3.appspot.com',
// 	messagingSenderId: '981975763225',
// 	appId: '1:981975763225:web:7d4484abd37cdc261a9d88',
// 	measurementId: 'G-QMSSB2LP1P',
// }
// const app: FirebaseApp = initializeApp(firebaseConfig)
// const auth: Auth = getAuth(app)
// declare global {
// 	interface Window {
// 		recaptchaVerifier?: RecaptchaVerifier
// 		confirmationResult?: ConfirmationResult
// 	}
// }
// export function setupRecaptcha(
// 	containerId: string = 'recaptcha-container'
// ): RecaptchaVerifier {
// 	if (!window.recaptchaVerifier) {
// 		if (!document.getElementById(containerId)) {
// 			const container = document.createElement('div')
// 			container.id = containerId
// 			document.body.appendChild(container)
// 		}
// 		window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
// 			size: 'normal',
// 			callback: (response: string) => {
// 				console.log('reCAPTCHA решена:', response)
// 			},
// 			'expired-callback': () => {
// 				console.warn('reCAPTCHA истекла')
// 			},
// 		})
// 	}
// 	return window.recaptchaVerifier
// }
// export async function sendVerificationCode(phoneNumber: string): Promise<void> {
// 	const appVerifier = setupRecaptcha()
// 	try {
// 		const confirmationResult = await signInWithPhoneNumber(
// 			auth,
// 			phoneNumber,
// 			appVerifier
// 		)
// 		window.confirmationResult = confirmationResult
// 		console.log('Код отправлен на номер:', phoneNumber)
// 	} catch (error) {
// 		console.error('Ошибка при отправке кода:', error)
// 		throw error
// 	}
// }
// export async function verifyCode(code: string): Promise<User> {
// 	if (!window.confirmationResult) {
// 		throw new Error('Сначала отправьте код на телефон.')
// 	}
// 	try {
// 		const result = await window.confirmationResult.confirm(code)
// 		console.log('Вход выполнен:', result.user.phoneNumber)
// 		return result.user
// 	} catch (error) {
// 		console.error('Неверный код:', error)
// 		throw error
// 	}
// }
// export const signInWithEmailAndPassword = (email: string, password: string) =>
// 	firebaseSignInWithEmailAndPassword(auth, email, password)
// export const createUserWithEmailAndPassword = (
// 	email: string,
// 	password: string
// ) => firebaseCreateUserWithEmailAndPassword(auth, email, password)
// export { auth }
// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// const firebaseConfig = {
// 	apiKey: 'AIzaSyA0RP5cD6qlpVlP2SU-J_f28yvGn6MOuZQ',
// 	authDomain: 'fashion-e9cb3.firebaseapp.com',
// 	projectId: 'fashion-e9cb3',
// 	storageBucket: 'fashion-e9cb3.appspot.com',
// 	messagingSenderId: '981975763225',
// 	appId: '1:981975763225:web:7d4484abd37cdc261a9d88',
// 	measurementId: 'G-QMSSB2LP1P',
// }
// const app = initializeApp(firebaseConfig)
// const auth = getAuth(app)
// export { auth }
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: 'AIzaSyA0RP5cD6qlpVlP2SU-J_f28yvGn6MOuZQ',
    authDomain: 'fashion-e9cb3.firebaseapp.com',
    projectId: 'fashion-e9cb3',
    storageBucket: 'fashion-e9cb3.appspot.com',
    messagingSenderId: '981975763225',
    appId: '1:981975763225:web:7d4484abd37cdc261a9d88',
    measurementId: 'G-QMSSB2LP1P',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
