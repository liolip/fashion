import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ← импортируем роутер
import './index.css';
import App from '../app/App.jsx';
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }));
}
