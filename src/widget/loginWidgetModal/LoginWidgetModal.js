import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './style.module.scss';
import { auth } from '../../dataBase/firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from 'firebase/auth';
const LoginWidgetModal = ({ isOpen, onClose, onLoginSuccess, }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    if (!isOpen)
        return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!agree) {
            setError('Пожалуйста, согласитесь с условиями сервиса');
            return;
        }
        if (!email) {
            setError('Введите email');
            return;
        }
        if (!password) {
            setError('Введите пароль');
            return;
        }
        try {
            setIsLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            onLoginSuccess?.(userCredential.user.email || '');
            onClose();
        }
        catch (error) {
            setError('Ошибка входа: ' + (error.message || 'Проверьте данные'));
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleGoogleLogin = async () => {
        setError('');
        try {
            setIsLoading(true);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            onLoginSuccess?.(result.user.email || '');
            onClose();
        }
        catch (error) {
            setError('Ошибка входа через Google: ' + (error.message || 'Попробуйте позже'));
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: styles.fullScreenContainer, children: [_jsx("button", { onClick: onClose, className: styles.closeButton, children: "\u00D7" }), _jsxs("div", { className: styles.loginContent, children: [_jsx("img", { className: styles.logo, src: 'https://gen.kg/images/logo.svg', alt: 'logo' }), _jsxs("div", { className: styles.welcomeSection, children: [_jsx("h1", { children: "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C!" }), _jsx("p", { children: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 email \u0438 \u043F\u0430\u0440\u043E\u043B\u044C \u0438\u043B\u0438 \u0447\u0435\u0440\u0435\u0437 Google" })] }), _jsxs("form", { onSubmit: handleSubmit, className: styles.phoneForm, children: [_jsx("input", { type: 'email', value: email, onChange: e => setEmail(e.target.value), placeholder: 'Email', className: styles.phoneInput, required: true }), _jsx("input", { type: 'password', value: password, onChange: e => setPassword(e.target.value), placeholder: '\u041F\u0430\u0440\u043E\u043B\u044C', className: styles.phoneInput, required: true }), _jsxs("label", { className: styles.agreeCheckbox, children: [_jsx("input", { type: 'checkbox', checked: agree, onChange: e => setAgree(e.target.checked) }), "\u042F \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u044E\u0441\u044C c \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u044B\u043C \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u043C"] }), error && _jsx("div", { className: styles.errorMessage, children: error }), _jsx("button", { type: 'submit', className: styles.submitButton, disabled: isLoading, children: isLoading ? 'Вход...' : 'Войти' }), _jsx("button", { className: styles.googleButton, onClick: handleGoogleLogin, disabled: isLoading, type: 'button', children: "\u0412\u043E\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 Google" })] })] })] }));
};
export default LoginWidgetModal;
