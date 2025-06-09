import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../dataBase/firebaseConfig'
import { onAuthStateChanged, User } from 'firebase/auth'

const AuthContext = createContext<{ currentUser: User | null }>({
	currentUser: null,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setCurrentUser(user)
		})
		return () => unsubscribe()
	}, [])

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	)
}
