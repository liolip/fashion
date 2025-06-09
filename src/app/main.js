import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from '../app/App.jsx';
import { AuthProvider } from '../widget/AuthContext';
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsxs(AuthProvider, { children: [' ', _jsx(App, {})] }) }) }));
}
