import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { useAuth } from '../../widget/AuthContext';
import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import HumanWidget from '../HumanWidget/HumanWidget';
import AuthNoticeWidget from '../AuthNoticeWidget/AuthNoticeWidget';
import CartWidget from '../cartWidget/CartWidget';
import ButtonWidget from '../buttonWidget/ButtonWidget';
import { useTreeStore } from '../../store/useTreeStore';
const GenealogyTree = () => {
    const { currentUser } = useAuth();
    const [nodes, setNodes] = useState([
        {
            id: 0,
            parentId: null,
            level: 0,
            visible: true,
            name: 'Долон бий',
            description: 'У кыргызов роды делятся на два крыла: правое и левое. Вот мы, оказывается, происходим от Долон-бия. До Долон-бия было 11 отцов. Самый последний из них – Кыргызбаем звался. Когда переходили перевал Долон, родился у Кыргызбая Долон-бий. Его жена родила в свое время близнецов, одного она назвала Оң (правый – ред.), сказав, что родила его с помощью правой почки, а другого – Сол (левый – ред.), сказав, что родила мальчика с помощью левой почки. От Оң произошли Адигине, Тагай и Наали – девочка и два мальчика. От Адигине – Солто, Сарыбагыш, Саяк, Бугу. В Таласе от старшего сына Долон-бия Каратала произошли Кушчу и Саруу. От Кушчу – Каратал и Каранай. Нашим призывом до сих пор является “Каратал” и “Каранай”. От Каратала – Жакып. От Жакыпа – Жантай, Эльтай и Кудайменде. От Жантая Каймазар, от которого мы вот произошли. От Эльтая – народ Кыргый произошел, который у истока Каракола расположился. От Кудайменде – племя Сабатар. Вот мы от этих троих сыновей и произошли, остальные дальше идут ветками. У Караная было два сына- Жансейит и Байсейит. От Жансейита пошли Каракушчу, Саркушчу, Кёккушчу, Тазкушчу. От второго – мелкие народы Сакалды, Чейне, Чилжуут и Бочу.',
        },
    ]);
    const [nextId, setNextId] = useState(1);
    const [scale, setScale] = useState(1);
    const [activeNode, setActiveNode] = useState(null);
    const [showAddButtonFor, setShowAddButtonFor] = useState(null);
    const [loginTargetNode, setLoginTargetNode] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [authNoticeOpen, setAuthNoticeOpen] = useState(false);
    const [authNoticeTargetNode, setAuthNoticeTargetNode] = useState(null);
    const [cartPerson, setCartPerson] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [sidebarParentNode, setSidebarParentNode] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [lines, setLines] = useState([]);
    const containerRef = useRef(null);
    const { activeNodeId, buttonWidgetVisible, buttonWidgetPosition, setActiveNode: setStoreActiveNode, setButtonWidgetPosition, setButtonWidgetVisible, } = useTreeStore();
    const addNode = (parentId, name, description = '') => {
        const parentNode = nodes.find(node => node.id === parentId);
        if (!parentNode)
            return;
        const newId = nextId;
        const newNode = {
            id: newId,
            parentId,
            level: parentNode.level + 1,
            visible: true,
            name,
            description,
        };
        setNodes(prev => [...prev, newNode]);
        setNextId(prev => prev + 1);
        setActiveNode(newId);
        setCartPerson({ id: newId.toString(), name, description });
        setIsCartOpen(true);
        setIsSidebarOpen(false);
    };
    const deleteNode = (id) => {
        setNodes(prev => prev.filter(node => node.id !== id && node.parentId !== id));
        if (activeNode === id) {
            setActiveNode(null);
            setCartPerson(null);
            setIsCartOpen(false);
        }
    };
    const showCartForNode = (node) => {
        setCartPerson({
            id: node.id.toString(),
            name: node.name,
            description: node.description || '',
        });
        setIsCartOpen(true);
        setIsSidebarOpen(false);
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
            return updateVisibility(prevNodes, nodeId, shouldShow);
        });
        const element = containerRef.current?.querySelector(`[data-node-id="${nodeId}"]`);
        if (element) {
            const rect = element.getBoundingClientRect();
            setButtonWidgetPosition({ x: rect.right + 10, y: rect.top });
            setStoreActiveNode(nodeId.toString());
            setButtonWidgetVisible(true);
        }
    };
    const groupedNodes = () => {
        const grouped = {};
        nodes.forEach(node => {
            if (!node.visible)
                return;
            if (!grouped[node.level])
                grouped[node.level] = [];
            grouped[node.level].push(node);
        });
        return grouped;
    };
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
                if (rect.width > 0 && rect.height > 0)
                    nodePositions[id] = rect;
            }
        });
        const containerRect = container.getBoundingClientRect();
        const newLines = nodes.reduce((acc, node) => {
            if (node.parentId === null || !node.visible)
                return acc;
            const parentRect = nodePositions[node.parentId.toString()];
            const childRect = nodePositions[node.id.toString()];
            if (parentRect && childRect) {
                const x1 = (parentRect.right - containerRect.left) / scale;
                const y1 = (parentRect.top + parentRect.height / 2 - containerRect.top) / scale;
                const x2 = (childRect.left - containerRect.left) / scale;
                const y2 = (childRect.top + childRect.height / 2 - containerRect.top) / scale;
                acc.push({ x1, y1, x2, y2 });
            }
            return acc;
        }, []);
        setLines(newLines);
    }, [nodes, scale]);
    const countDescendants = (nodeId) => nodes.filter(n => n.parentId === nodeId && n.visible).length;
    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false);
        if (loginTargetNode !== null) {
            const target = nodes.find(n => n.id === loginTargetNode);
            if (target) {
                setSidebarParentNode(target);
                setIsSidebarOpen(true);
            }
            setLoginTargetNode(null);
        }
    };
    // Закрытие всех модалок
    const closeAllModals = () => {
        setIsCartOpen(false);
        setIsSidebarOpen(false);
        setButtonWidgetVisible(false);
        setActiveNode(null);
        setShowAddButtonFor(null);
    };
    // Обработчик клика по фону (контейнеру дерева)
    const onBackgroundClick = (e) => {
        // Чтобы не закрывать модалки при клике по узлам, проверяем, что клик именно по контейнеру
        if (e.target === e.currentTarget) {
            closeAllModals();
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(TransformWrapper, { initialScale: 1, minScale: 0.5, maxScale: 2, wheel: { step: 0.1 }, doubleClick: { disabled: true }, panning: { disabled: false, velocityDisabled: true }, limitToBounds: false, onZoom: ({ state }) => setScale(state.scale), children: ({ zoomIn, zoomOut, resetTransform }) => (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.controls, children: [_jsx("button", { onClick: () => zoomIn(), children: "+" }), _jsx("button", { onClick: () => zoomOut(), children: "-" }), _jsx("button", { onClick: () => resetTransform(), children: "\u0421\u0431\u0440\u043E\u0441" })] }), _jsx(TransformComponent, { children: _jsxs("div", { className: styles.treeContainer, ref: containerRef, onClick: onBackgroundClick, children: [_jsx("svg", { className: styles.linesSvg, children: lines.map((line, idx) => {
                                            const { x1, y1, x2, y2 } = line;
                                            const pathD = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;
                                            return (_jsx(motion.path, { d: pathD, fill: 'transparent', stroke: '#333', strokeWidth: '7', strokeLinecap: 'round', initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.4 } }, idx));
                                        }) }), Object.entries(groupedNodes()).map(([level, levelNodes]) => (_jsx("div", { className: styles.level, children: levelNodes.map(node => (_jsxs("div", { className: styles.nodeWrapper, children: [_jsxs("div", { className: `${styles.node} ${!node.visible ? styles.nodeHidden : ''} ${activeNode === node.id ? styles.active : ''}`, "data-node-id": node.id, onClick: e => {
                                                        e.stopPropagation();
                                                        toggleVisibility(node.id);
                                                    }, children: [_jsx("div", { className: styles.imageWrapper, children: _jsx("img", { src: 'https://gen.kg/media/requests/solnce.svg', alt: 'avatar' }) }), _jsx("div", { className: styles.content, children: node.name }), _jsx("div", { className: styles.childrenCount, children: countDescendants(node.id) })] }), _jsx("button", { className: `${styles.addChildButton} ${showAddButtonFor === node.id ? styles.visible : ''}`, onClick: e => {
                                                        e.stopPropagation();
                                                        if (currentUser) {
                                                            setSidebarParentNode(node);
                                                            setIsSidebarOpen(true);
                                                            setIsCartOpen(false); // Закрываем CartWidget при открытии HumanWidget
                                                        }
                                                        else {
                                                            setAuthNoticeTargetNode(node);
                                                            setAuthNoticeOpen(true);
                                                        }
                                                    }, children: "+" })] }, node.id))) }, level)))] }) })] })) }), buttonWidgetVisible && buttonWidgetPosition && (_jsx("div", { style: {
                    position: 'fixed',
                    left: buttonWidgetPosition.x,
                    top: buttonWidgetPosition.y,
                    zIndex: 1000,
                }, children: _jsx(ButtonWidget, { onInfoClick: () => {
                        const node = nodes.find(n => n.id.toString() === activeNodeId);
                        if (node) {
                            showCartForNode(node);
                        }
                    }, onDeleteClick: () => {
                        if (activeNodeId)
                            deleteNode(Number(activeNodeId));
                        setButtonWidgetVisible(false);
                    } }) })), _jsx(LoginWidgetModal, { isOpen: isLoginModalOpen, onClose: () => {
                    setIsLoginModalOpen(false);
                    setLoginTargetNode(null);
                }, onLoginSuccess: handleLoginSuccess }), _jsx(AuthNoticeWidget, { isOpen: authNoticeOpen, onClose: () => setAuthNoticeOpen(false), onLoginClick: () => {
                    setAuthNoticeOpen(false);
                    setIsLoginModalOpen(true);
                }, personName: authNoticeTargetNode?.name || '' }), _jsx(HumanWidget, { isOpen: isSidebarOpen, onClose: () => {
                    setIsSidebarOpen(false);
                    setSidebarParentNode(null);
                }, onSubmit: async (name, description) => {
                    if (sidebarParentNode) {
                        try {
                            const res = await fetch('http://localhost:5000/api/person', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ name, description }),
                            });
                            if (!res.ok)
                                throw new Error('Не удалось сохранить в базу данных');
                            const data = await res.json();
                            addNode(sidebarParentNode.id, data.name, data.description);
                            setIsSidebarOpen(false);
                            setSidebarParentNode(null);
                        }
                        catch (err) {
                            console.error(err);
                            alert('Ошибка при сохранении. Попробуйте ещё раз.');
                        }
                    }
                } }), _jsx(CartWidget, { isOpen: isCartOpen, onClose: () => setIsCartOpen(false), person: cartPerson })] }));
};
export default GenealogyTree;
