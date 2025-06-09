import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ParticlesBackground from '../widget/ParticlesBackground/ParticlesBackground';
import HeaderWidget from '../widget/headerWidget/HeaderWidget';
import GenealogyTree from '../widget/GenealogyTree/GenealogyTree';
function App() {
    return (_jsxs("div", { style: { display: 'flex', minHeight: '100vh', flexDirection: 'column' }, children: [_jsx(HeaderWidget, {}), _jsx(ParticlesBackground, {}), _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(GenealogyTree, {}) }), _jsx(Route, { path: '/tree', element: _jsx(GenealogyTree, {}) })] })] }));
}
export default App;
