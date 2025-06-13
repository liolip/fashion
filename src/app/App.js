import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ParticlesBackground from '../widget/ParticlesBackground/ParticlesBackground';
import HeaderWidget from '../widget/headerWidget/HeaderWidget';
import GenealogyTree from '../widget/GenealogyTree/GenealogyTree';
import About from '../pages/about/About';
import ButtonWidget from '../widget/buttonWidget/ButtonWidget';
function App() {
    return (_jsxs("div", { style: { display: 'flex', minHeight: '100vh', flexDirection: 'column' }, children: [_jsx(HeaderWidget, {}), _jsx(ParticlesBackground, {}), _jsxs(Routes, { children: [_jsx(Route, { path: '/about', element: _jsx(About, {}) }), _jsx(Route, { path: '/', element: _jsx(GenealogyTree, {}) }), _jsx(Route, { path: '/tree', element: _jsx(GenealogyTree, {}) })] }), _jsx("div", { style: {
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000,
                }, children: _jsx(ButtonWidget, { onInfoClick: () => console.log('Инфо нажато'), onDeleteClick: () => console.log('Удалить нажато') }) })] }));
}
export default App;
