import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { useAuth } from '../../widget/AuthContext';
import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
const GenealogyTree = () => {
    const { currentUser } = useAuth();
    const [nodes, setNodes] = useState([
        { id: 0, parentId: null, level: 0, visible: true },
    ]);
    const [nextId, setNextId] = useState(1);
    const [activeNode, setActiveNode] = useState(null);
    const [showAddButtonFor, setShowAddButtonFor] = useState(null);
    const [loginTargetNode, setLoginTargetNode] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const containerRef = useRef(null);
    const [lines, setLines] = useState([]);
    const animatingNodes = useRef(0);
    const addNode = (parentId) => {
        const parentNode = nodes.find(node => node.id === parentId);
        if (!parentNode)
            return;
        const newId = nextId;
        const newNode = {
            id: newId,
            parentId,
            level: parentNode.level + 1,
            visible: true,
        };
        setNodes(prev => [...prev, newNode]);
        setNextId(prev => prev + 1);
        setActiveNode(newId);
    };
    const nodeHasVisibleChildren = (id, nodeArray) => nodeArray.some(n => n.parentId === id && n.visible);
    const toggleVisibility = (nodeId) => {
        setActiveNode(prev => (prev === nodeId ? null : nodeId));
        setShowAddButtonFor(prev => (prev === nodeId ? null : nodeId));
        setNodes(prevNodes => {
            const shouldShow = !nodeHasVisibleChildren(nodeId, prevNodes);
            const updateVisibility = (nodes, parentId, visible) => {
                let updatedNodes = [...nodes];
                const directChildren = updatedNodes.filter(n => n.parentId === parentId);
                for (const child of directChildren) {
                    updatedNodes = updatedNodes.map(n => n.id === child.id ? { ...n, visible } : n);
                    updatedNodes = updateVisibility(updatedNodes, child.id, visible);
                }
                return updatedNodes;
            };
            animatingNodes.current = prevNodes.filter(n => n.parentId === nodeId).length;
            return updateVisibility(prevNodes, nodeId, shouldShow);
        });
    };
    const groupNodesByLevel = () => {
        const grouped = {};
        nodes.forEach(node => {
            if (!grouped[node.level])
                grouped[node.level] = [];
            grouped[node.level].push(node);
        });
        return grouped;
    };
    const countDescendants = (nodeId, arr) => arr.filter(n => n.parentId === nodeId && n.visible).length;
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        const nodeElements = container.querySelectorAll('[data-node-id]');
        const nodePositions = {};
        nodeElements.forEach(el => {
            const id = el.getAttribute('data-node-id');
            if (id) {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    nodePositions[id] = rect;
                }
            }
        });
        const containerRect = container.getBoundingClientRect();
        const newLines = [];
        nodes.forEach(node => {
            if (node.parentId === null || !node.visible)
                return;
            const parentRect = nodePositions[node.parentId.toString()];
            const childRect = nodePositions[node.id.toString()];
            if (parentRect && childRect) {
                const x1 = parentRect.right - containerRect.left;
                const y1 = parentRect.top + parentRect.height / 2 - containerRect.top;
                const x2 = childRect.left - containerRect.left;
                const y2 = childRect.top + childRect.height / 2 - containerRect.top;
                newLines.push({ x1, y1, x2, y2 });
            }
        });
        setLines(newLines);
    }, [nodes]);
    useEffect(() => {
        if (activeNode === null)
            return;
        const container = containerRef.current;
        if (!container)
            return;
        const nodeElement = container.querySelector(`[data-node-id="${activeNode}"]`);
        if (!nodeElement)
            return;
        const containerRect = container.getBoundingClientRect();
        const nodeRect = nodeElement.getBoundingClientRect();
        const offsetLeft = nodeRect.left - containerRect.left + container.scrollLeft;
        const offsetTop = nodeRect.top - containerRect.top + container.scrollTop;
        const scrollLeft = offsetLeft - container.clientWidth / 2 + nodeElement.clientWidth / 2;
        const scrollTop = offsetTop - container.clientHeight / 2 + nodeElement.clientHeight / 2;
        container.scrollTo({
            left: scrollLeft,
            top: scrollTop,
            behavior: 'smooth',
        });
    }, [activeNode]);
    const groupedNodes = groupNodesByLevel();
    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false);
        if (loginTargetNode !== null) {
            addNode(loginTargetNode);
            setLoginTargetNode(null);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(TransformWrapper, { initialScale: 1, minScale: 0.5, maxScale: 2, wheel: { step: 0.1 }, doubleClick: { disabled: true }, panning: { disabled: false, velocityDisabled: true }, limitToBounds: false, children: ({ zoomIn, zoomOut, resetTransform }) => (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.controls, children: [_jsx("button", { onClick: () => zoomIn(), children: "+" }), _jsx("button", { onClick: () => zoomOut(), children: "-" }), _jsx("button", { onClick: () => resetTransform(), children: "\u0421\u0431\u0440\u043E\u0441" })] }), _jsx(TransformComponent, { wrapperClass: styles.zoomWrapper, children: _jsxs("div", { className: styles.treeContainer, ref: containerRef, children: [_jsx("svg", { className: styles.linesSvg, children: lines.map((line, idx) => {
                                            const { x1, y1, x2, y2 } = line;
                                            const pathD = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
                                            return (_jsx(motion.path, { d: pathD, fill: 'transparent', stroke: '#333', strokeWidth: '6', strokeLinecap: 'round', initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.4, ease: 'easeInOut' } }, idx));
                                        }) }), Object.keys(groupedNodes)
                                        .sort((a, b) => parseInt(a) - parseInt(b))
                                        .map(level => (_jsx("div", { className: styles.level, children: groupedNodes[parseInt(level)].map(node => (_jsxs("div", { className: styles.nodeWrapper, children: [_jsxs("div", { className: `${styles.node} ${!node.visible ? styles.nodeHidden : ''} ${activeNode === node.id ? styles.active : ''}`, "data-node-id": node.id, onClick: () => toggleVisibility(node.id), children: [_jsx("div", { className: styles.imageWrapper, children: _jsx("img", { src: 'https://gen.kg/media/requests/solnce.svg', alt: 'avatar' }) }), _jsxs("div", { className: styles.content, children: ["\u0427\u0435\u043B\u043E\u0432\u0435\u043A ", node.id + 1] }), _jsx("div", { className: styles.childrenCount, children: countDescendants(node.id, nodes) })] }), _jsx("button", { className: `${styles.addChildButton} ${showAddButtonFor === node.id ? styles.visible : ''}`, onClick: e => {
                                                        e.stopPropagation();
                                                        if (currentUser) {
                                                            addNode(node.id);
                                                        }
                                                        else {
                                                            setLoginTargetNode(node.id);
                                                            setIsLoginModalOpen(true);
                                                        }
                                                    }, title: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0442\u043E\u043C\u043A\u0430', children: "+" })] }, node.id))) }, level)))] }) })] })) }), isLoginModalOpen && (_jsx(LoginWidgetModal, { isOpen: isLoginModalOpen, onClose: () => {
                    setIsLoginModalOpen(false);
                    setLoginTargetNode(null);
                }, onLoginSuccess: handleLoginSuccess }))] }));
};
export default GenealogyTree;
