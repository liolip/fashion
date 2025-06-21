// authListener.ts
import { auth } from '../dataBase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

export const listenToAuth = (callback: (email: string | null) => void) => {
	onAuthStateChanged(auth, user => {
		if (user) {
			callback(user.email)
		} else {
			callback(null)
		}
	})
}
