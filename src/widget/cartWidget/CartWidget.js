import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './style.module.scss';
const CartWidget = ({ isOpen, onClose, person }) => {
    if (!person)
        return null;
    return (_jsx("div", { className: `${styles.sidebar} ${isOpen ? styles.open : ''}`, children: _jsxs("div", { className: styles.sidebarContent, children: [_jsx("button", { className: styles.closeButton, onClick: onClose, children: _jsxs("svg", { width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', children: [_jsx("path", { d: 'M18 6L6 18', stroke: '#333', strokeWidth: '2', strokeLinecap: 'round' }), _jsx("path", { d: 'M6 6L18 18', stroke: '#333', strokeWidth: '2', strokeLinecap: 'round' })] }) }), _jsxs("h1", { className: styles.infoTitle, children: ["\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E ", person.name] }), _jsx("div", { className: styles.imageContainer, children: _jsx("img", { className: styles.infoImage, src: person.imageUrl || 'https://gen.kg/images/default_cover.webp', alt: person.name, width: '485', height: '200' }) }), _jsx("h2", { className: styles.sidebarTitle, children: person.name }), _jsx("div", { className: styles.sidebarInfo, children: _jsx("p", { children: person.description }) })] }) }));
};
export default CartWidget;
