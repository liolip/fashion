import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './style.module.scss';
import { NavLink } from 'react-router-dom';
import CartWidget from '../cartWidget/CartWidget';
import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal';
const translations = {
    RU: {
        // project: 'О проекте',
        searchPlaceholder: 'Введите имя',
        login: 'Войти',
        // logoText: '',
    },
    EN: {
        // project: 'About',
        searchPlaceholder: 'Enter name',
        login: 'Login',
        // logoText: 'Sanjyra',
    },
    KG: {
        // project: 'Жобонун тууралуу',
        searchPlaceholder: 'Атыңызды жазыңыз',
        login: 'Кирүү',
        // logoText: 'Санжыра',
    },
};
const HeaderWidget = () => {
    const [searchValue, setSearchValue] = useState('');
    const [language, setLanguage] = useState('RU');
    const [showFilters, setShowFilters] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [foundPerson, setFoundPerson] = useState(null);
    const scrollToPersonById = (id) => {
        const element = document.getElementById(`node-${id}`);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
        }
    };
    const currentTexts = translations[language];
    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'RU' ? 'EN' : prev === 'EN' ? 'KG' : 'RU'));
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleLoginClick = () => {
        setIsLoginOpen(true);
    };
    const handleSearch = async () => {
        if (!searchValue.trim())
            return;
        try {
            const response = await fetch(`https://fashion-mwc8.onrender.com/api/person/search?name=${encodeURIComponent(searchValue)}`);
            if (!response.ok)
                throw new Error('Ошибка сети');
            const data = await response.json();
            if (data.length > 0) {
                const person = data[0];
                setFoundPerson({
                    id: person._id,
                    name: person.name,
                    description: person.description,
                    imageUrl: person.imageUrl || '',
                });
                setIsSidebarOpen(true);
                // ⬇ Центрируем узел после рендера
                setTimeout(() => {
                    scrollToPersonById(person._id);
                }, 300);
            }
            else {
                alert('Человек не найден');
                setFoundPerson(null);
                setIsSidebarOpen(false);
            }
        }
        catch (error) {
            console.error('Ошибка при поиске:', error);
            alert('Ошибка при поиске, попробуйте позже');
        }
    };
    // const handleSearch = async () => {
    // 	if (!searchValue.trim()) return
    // 	try {
    // 		const response = await fetch(
    // 			`https://your-backend-url/api/people/search?name=${encodeURIComponent(
    // 				searchValue
    // 			)}`
    // 		)
    // 		if (!response.ok) {
    // 			throw new Error('Ошибка сети')
    // 		}
    // 		const data = await response.json()
    // 		if (data.length > 0) {
    // 			const person = data[0]
    // 			setFoundPerson({
    // 				id: person._id,
    // 				name: person.name,
    // 				description: person.description,
    // 				imageUrl: person.imageUrl || '',
    // 			})
    // 			setIsSidebarOpen(true)
    // 		} else {
    // 			alert('Человек не найден')
    // 			setFoundPerson(null)
    // 			setIsSidebarOpen(false)
    // 		}
    // 	} catch (error) {
    // 		console.error('Ошибка при поиске:', error)
    // 		alert('Ошибка при поиске, попробуйте позже')
    // 	}
    // }
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: styles.header, children: _jsxs("div", { className: styles.container, children: [_jsx(NavLink, { to: '/', children: _jsx("img", { className: styles.logo, src: '/logo.kg.svg', alt: 'logo' }) }), _jsxs("nav", { className: styles.nav, children: [_jsx(NavLink, { to: '/', className: ({ isActive }) => (isActive ? styles.active : '') }), _jsx(NavLink, { to: '/about', className: ({ isActive }) => (isActive ? styles.active : '') })] }), _jsxs("div", { className: styles.searchWrapper, children: [_jsxs("label", { className: styles.searchLabel, htmlFor: 'search-input', children: [_jsx("svg", { width: '20', height: '20', viewBox: '0 0 20 20', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', className: styles.searchIcon, children: _jsx("path", { d: 'M19 19L14.65 14.65M16.2071 9.60355C16.2071 12.9017 13.4046 15.7042 10.1064 15.7042C6.80823 15.7042 4.00574 12.9017 4.00574 9.60355C4.00574 6.30534 6.80823 3.50285 10.1064 3.50285C13.4046 3.50285 16.2071 6.30534 16.2071 9.60355Z', stroke: '#666', strokeWidth: '1.5', strokeLinecap: 'round' }) }), _jsx("input", { id: 'search-input', type: 'search', placeholder: currentTexts.searchPlaceholder, value: searchValue, onChange: e => setSearchValue(e.target.value), className: styles.searchInput, autoComplete: 'off' })] }), _jsx("div", { className: styles.searchButtonWrapper, style: {
                                        maxHeight: searchValue.trim() ? '40px' : '0',
                                        opacity: searchValue.trim() ? 1 : 0,
                                        pointerEvents: searchValue.trim() ? 'auto' : 'none',
                                    }, children: _jsx("button", { type: 'button', className: styles.searchButton, onClick: handleSearch, children: "\u041D\u0430\u0439\u0442\u0438" }) })] }), _jsxs("div", { className: styles.buttons, children: [_jsx("button", { className: styles.langBtn, onClick: toggleLanguage, "aria-label": 'Toggle Language', children: language }), _jsx("button", { className: styles.loginBtn, onClick: handleLoginClick, "aria-label": 'Login', children: currentTexts.login })] })] }) }), _jsx(CartWidget, { isOpen: isSidebarOpen, onClose: toggleSidebar, person: foundPerson }), _jsx(LoginWidgetModal, { isOpen: isLoginOpen, onClose: () => setIsLoginOpen(false) })] }));
};
export default HeaderWidget;
