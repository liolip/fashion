import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../dataBase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
const AuthContext = createContext({
    currentUser: null,
});
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children, }) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);
    return (_jsx(AuthContext.Provider, { value: { currentUser }, children: children }));
};
