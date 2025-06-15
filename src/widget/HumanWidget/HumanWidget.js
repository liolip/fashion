import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './style.module.scss';
const HumanWidgetSidebar = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim())
            return;
        onSubmit(name.trim(), description.trim());
        setName('');
        setDescription('');
        onClose();
    };
    return (_jsx("div", { className: `${styles.sidebar} ${isOpen ? styles.open : ''}`, children: _jsxs("div", { className: styles.sidebarContent, children: [_jsx("button", { onClick: onClose, className: styles.closeButton, children: "\u00D7" }), _jsx("h2", { className: styles.sidebarTitle, children: "\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0438\u0442\u044C \u043F\u043E\u0442\u043E\u043C\u043A\u0430..." }), _jsx("div", { className: styles.sidebarInfoBox, children: _jsx("p", { children: "\u0414\u0430\u043D\u043D\u0430\u044F \u0444\u043E\u0440\u043C\u0430 \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0430 \u0434\u043B\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u043D\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0432 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0435 \u0434\u0440\u0435\u0432\u043E \u043F\u043E\u0442\u043E\u043C\u043A\u0430 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0432\u0430\u043C\u0438 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E. \u041F\u043E\u0441\u043B\u0435 \u0432\u0435\u0440\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u0432\u0430\u0448 \u0437\u0430\u043F\u0440\u043E\u0441 \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D \u0432 \u0441\u0445\u0435\u043C\u0435." }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("label", { className: styles.label, children: "\u0418\u043C\u044F" }), _jsx("input", { type: 'text', className: styles.input, value: name, onChange: e => setName(e.target.value), placeholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F', required: true }), _jsxs("div", { className: styles.textareaWrapper, children: [_jsx("label", { className: styles.label, children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }), _jsx("textarea", { className: styles.textarea, value: description, onChange: e => setDescription(e.target.value), placeholder: '\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)', rows: 8 })] }), _jsx("button", { type: 'submit', className: styles.submitButton, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C" })] })] }) }));
};
export default HumanWidgetSidebar;
