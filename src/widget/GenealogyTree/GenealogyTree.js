import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import React, { useState, useRef, useEffect } from 'react'
// import styles from './style.module.scss'
// import { motion } from 'framer-motion'
// import { useAuth } from '../../widget/AuthContext'
// import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal'
// import AuthNoticeWidget from '../AuthNoticeWidget/AuthNoticeWidget'
// import CartWidget from '../cartWidget/CartWidget'
// import HumanWidget from '../HumanWidget/HumanWidget'
// import ButtonWidget from '../buttonWidget/ButtonWidget'
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
// import { useTreeStore } from '../../store/useTreeStore'
// import { listenToAuth } from '../../dataBase/firebaseUser'
// interface Node {
// 	id: string
// 	parentId: string | null
// 	level: number
// 	visible: boolean
// 	name: string
// 	description?: string
// 	createdBy?: string // ✅ добавлено
// }
// interface Person {
// 	id: string
// 	name: string
// 	description: string
// 	count?: number
// 	imageUrl?: string
// }
// const GenealogyTree: React.FC = () => {
// 	const { currentUser } = useAuth()
// 	const [nodes, setNodes] = useState<Node[]>([])
// 	const [isLoading, setIsLoading] = useState(true)
// 	const [error, setError] = useState<string | null>(null)
// 	const [scale, setScale] = useState(1)
// 	const [activeNode, setActiveNode] = useState<string | null>(null)
// 	const [showAddButtonFor, setShowAddButtonFor] = useState<string | null>(null)
// 	const [loginTargetNode, setLoginTargetNode] = useState<string | null>(null)
// 	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
// 	const [authNoticeOpen, setAuthNoticeOpen] = useState(false)
// 	const [authNoticeTargetNode, setAuthNoticeTargetNode] = useState<Node | null>(
// 		null
// 	)
// 	const scrollToNodeById = (id: string) => {
// 		const el = document.getElementById(`node-${id}`)
// 		if (el) {
// 			el.scrollIntoView({
// 				behavior: 'smooth',
// 				block: 'center',
// 				inline: 'center',
// 			})
// 			// Плавная подсветка
// 			el.classList.add(styles.highlight)
// 			setTimeout(() => el.classList.remove(styles.highlight), 1500)
// 		}
// 	}
// 	const [cartPerson, setCartPerson] = useState<Person | null>(null)
// 	const [isCartOpen, setIsCartOpen] = useState(false)
// 	const [sidebarParentNode, setSidebarParentNode] = useState<Node | null>(null)
// 	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
// 	const [lines, setLines] = useState<
// 		{ x1: number; y1: number; x2: number; y2: number }[]
// 	>([])
// 	const containerRef = useRef<HTMLDivElement>(null)
// 	const {
// 		activeNodeId,
// 		buttonWidgetVisible,
// 		buttonWidgetPosition,
// 		setActiveNode: setStoreActiveNode,
// 		setButtonWidgetPosition,
// 		setButtonWidgetVisible,
// 	} = useTreeStore()
// 	const [email, setEmail] = useState<string | null>(null)
// 	// Функция для нахождения эмейла
// 	useEffect(() => {
// 		listenToAuth(email => setEmail(email))
// 	}, [])
// 	useEffect(() => {
// 		const fetchPersons = async () => {
// 			try {
// 				const response = await fetch(
// 					'https://fashion-mwc8.onrender.com/api/person'
// 				)
// 				if (!response.ok) throw new Error('Ошибка при загрузке данных')
// 				const data = await response.json()
// 				const persons = data.map((person: any) => ({
// 					id: person._id,
// 					parentId: person.parentId,
// 					level: person.level,
// 					visible: true,
// 					name: person.name,
// 					description: person.description,
// 					createdBy: person.createdBy,
// 				}))
// 				setNodes(persons) // 👈 Удалили проверку на email
// 				setIsLoading(false)
// 			} catch (err) {
// 				setError('Не удалось загрузить данные')
// 				setIsLoading(false)
// 			}
// 		}
// 		fetchPersons()
// 	}, [])
// 	const toggleVisibility = (nodeId: string) => {
// 		setActiveNode(prev => (prev === nodeId ? null : nodeId))
// 		setShowAddButtonFor(prev => (prev === nodeId ? null : nodeId))
// 		setNodes(prevNodes => {
// 			const shouldShow = !prevNodes.some(
// 				n => n.parentId === nodeId && n.visible
// 			)
// 			const updateVisibility = (
// 				nodes: Node[],
// 				parentId: string,
// 				visible: boolean
// 			): Node[] => {
// 				let updated = [...nodes]
// 				const children = updated.filter(n => n.parentId === parentId)
// 				for (const child of children) {
// 					updated = updated.map(n =>
// 						n.id === child.id ? { ...n, visible } : n
// 					)
// 					updated = updateVisibility(updated, child.id, visible)
// 				}
// 				return updated
// 			}
// 			return updateVisibility(prevNodes, nodeId, shouldShow)
// 		})
// 		const el = containerRef.current?.querySelector(`[data-node-id="${nodeId}"]`)
// 		if (el) {
// 			const rect = el.getBoundingClientRect()
// 			setButtonWidgetPosition({ x: rect.right + 10, y: rect.top })
// 			setStoreActiveNode(nodeId)
// 			setButtonWidgetVisible(true)
// 		}
// 	}
// 	useEffect(() => {
// 		const container = containerRef.current
// 		if (!container) return
// 		const nodeElements = container.querySelectorAll('[data-node-id]')
// 		const nodePositions: { [id: string]: DOMRect } = {}
// 		nodeElements.forEach(el => {
// 			const id = el.getAttribute('data-node-id')
// 			if (id) {
// 				const rect = el.getBoundingClientRect()
// 				if (rect.width > 0 && rect.height > 0) nodePositions[id] = rect
// 			}
// 		})
// 		const containerRect = container.getBoundingClientRect()
// 		const newLines = nodes.reduce((acc, node) => {
// 			if (!node.visible || node.parentId === null) return acc
// 			const parent = nodePositions[node.parentId]
// 			const child = nodePositions[node.id]
// 			if (parent && child) {
// 				acc.push({
// 					x1: (parent.right - containerRect.left) / scale,
// 					y1: (parent.top + parent.height / 2 - containerRect.top) / scale,
// 					x2: (child.left - containerRect.left) / scale,
// 					y2: (child.top + child.height / 2 - containerRect.top) / scale,
// 				})
// 			}
// 			return acc
// 		}, [] as typeof lines)
// 		setLines(newLines)
// 	}, [nodes, scale])
// 	const groupedNodes = () => {
// 		const grouped: { [level: number]: Node[] } = {}
// 		nodes.forEach(node => {
// 			if (!node.visible) return
// 			if (!grouped[node.level]) grouped[node.level] = []
// 			grouped[node.level].push(node)
// 		})
// 		return grouped
// 	}
// 	const handleLoginSuccess = () => {
// 		setIsLoginModalOpen(false)
// 		if (loginTargetNode !== null) {
// 			const target = nodes.find(n => n.id === loginTargetNode)
// 			if (target) {
// 				setSidebarParentNode(target)
// 				setIsSidebarOpen(true)
// 			}
// 			setLoginTargetNode(null)
// 		}
// 	}
// 	const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
// 		if (e.target === e.currentTarget) {
// 			setIsCartOpen(false)
// 			setIsSidebarOpen(false)
// 			setButtonWidgetVisible(false)
// 			setActiveNode(null)
// 			setShowAddButtonFor(null)
// 		}
// 	}
// 	const countDescendants = (id: string) =>
// 		nodes.filter(n => n.parentId === id && n.visible).length
// 	return (
// 		<>
// 			<TransformWrapper
// 				initialScale={1}
// 				minScale={0.5}
// 				maxScale={2}
// 				wheel={{ step: 0.1 }}
// 				doubleClick={{ disabled: true }}
// 				panning={{ disabled: false }}
// 				limitToBounds={false}
// 				onZoom={({ state }) => setScale(state.scale)}
// 			>
// 				<TransformComponent wrapperStyle={{ width: '100%' }}>
// 					<div
// 						className={styles.treeContainer}
// 						ref={containerRef}
// 						onClick={onBackgroundClick}
// 					>
// 						<svg className={styles.linesSvg}>
// 							{lines.map((line, idx) => (
// 								<motion.path
// 									key={idx}
// 									d={`M ${line.x1} ${line.y1} C ${(line.x1 + line.x2) / 2} ${
// 										line.y1
// 									}, ${(line.x1 + line.x2) / 2} ${line.y2}, ${line.x2} ${
// 										line.y2
// 									}`}
// 									fill='transparent'
// 									stroke='#333'
// 									strokeWidth='7'
// 									strokeLinecap='round'
// 									initial={{ pathLength: 0 }}
// 									animate={{ pathLength: 1 }}
// 									transition={{ duration: 0.4 }}
// 								/>
// 							))}
// 						</svg>
// 						{email === 'weelppak@gmail.com' && nodes.length === 0 ? (
// 							<div className={styles.emptyTree}>
// 								<button
// 									className={styles.addRootButton}
// 									onClick={() => {
// 										if (currentUser) {
// 											setSidebarParentNode(null)
// 											setIsSidebarOpen(true)
// 										} else {
// 											setAuthNoticeOpen(true)
// 										}
// 									}}
// 								>
// 									+
// 								</button>
// 							</div>
// 						) : (
// 							Object.entries(groupedNodes()).map(([level, levelNodes]) => (
// 								<div key={level} className={styles.level}>
// 									{levelNodes.map(node => (
// 										<div key={node.id} className={styles.nodeWrapper}>
// 											<div
// 												id={`node-${node.id}`} // ⬅️ вот это добавляем
// 												className={`${styles.node} ${
// 													activeNode === node.id ? styles.active : ''
// 												}`}
// 												data-node-id={node.id}
// 												onClick={e => {
// 													e.stopPropagation()
// 													toggleVisibility(node.id)
// 												}}
// 											>
// 												<div className={styles.imageWrapper}>
// 													<img
// 														src='https://gen.kg/media/requests/solnce.svg'
// 														alt='avatar'
// 													/>
// 												</div>
// 												<div className={styles.content}>{node.name}</div>
// 												<div className={styles.childrenCount}>
// 													{countDescendants(node.id)}
// 												</div>
// 											</div>
// 											{email === 'ulukbeknurubaev@gmail.com' ||
// 												(email === 'weelppak@gmail.com' && (
// 													<button
// 														className={`${styles.addChildButton} ${
// 															showAddButtonFor === node.id ? styles.visible : ''
// 														}`}
// 														onClick={e => {
// 															e.stopPropagation()
// 															if (currentUser) {
// 																setSidebarParentNode(node)
// 																setIsSidebarOpen(true)
// 																setIsCartOpen(false)
// 															} else {
// 																setAuthNoticeTargetNode(node)
// 																setAuthNoticeOpen(true)
// 															}
// 														}}
// 													>
// 														+
// 													</button>
// 												))}
// 										</div>
// 									))}
// 								</div>
// 							))
// 						)}
// 					</div>
// 				</TransformComponent>
// 			</TransformWrapper>
// 			<LoginWidgetModal
// 				isOpen={isLoginModalOpen}
// 				onClose={() => {
// 					setIsLoginModalOpen(false)
// 					setLoginTargetNode(null)
// 				}}
// 				onLoginSuccess={handleLoginSuccess}
// 			/>
// 			<AuthNoticeWidget
// 				isOpen={authNoticeOpen}
// 				onClose={() => setAuthNoticeOpen(false)}
// 				onLoginClick={() => {
// 					setAuthNoticeOpen(false)
// 					setIsLoginModalOpen(true)
// 				}}
// 				personName={authNoticeTargetNode?.name || ''}
// 			/>
// 			<HumanWidget
// 				isOpen={isSidebarOpen}
// 				onClose={() => {
// 					setIsSidebarOpen(false)
// 					setSidebarParentNode(null)
// 				}}
// 				onSubmit={async (name, description) => {
// 					try {
// 						const body = {
// 							name,
// 							description,
// 							parentId: sidebarParentNode?.id || null,
// 							level: (sidebarParentNode?.level || 0) + 1,
// 							createdBy: currentUser?.uid,
// 						}
// 						console.log('Отправка узла:', body)
// 						// const res = await fetch('http://localhost:5000/api/person', {
// 						// 	method: 'POST',
// 						// 	headers: {
// 						// 		'Content-Type': 'application/json',
// 						// 	},
// 						// 	body: JSON.stringify(body),
// 						// })
// 						const res = await fetch(
// 							'https://fashion-mwc8.onrender.com/api/person',
// 							{
// 								method: 'POST',
// 								headers: {
// 									'Content-Type': 'application/json',
// 								},
// 								body: JSON.stringify(body),
// 							}
// 						)
// 						if (!res.ok) {
// 							const errText = await res.text()
// 							console.error('Ошибка при сохранении:', errText)
// 							alert('Ошибка при сохранении нового узла:\n' + errText)
// 							return
// 						}
// 						const data = await res.json()
// 						const newNode: Node = {
// 							id: data._id,
// 							parentId: data.parentId,
// 							level: data.level,
// 							visible: true,
// 							name: data.name,
// 							description: data.description,
// 							createdBy: currentUser?.uid,
// 						}
// 						setNodes(prev => [...prev, newNode])
// 						setCartPerson({
// 							id: data._id,
// 							name: data.name,
// 							description: data.description || '',
// 						})
// 						setIsCartOpen(true)
// 						setIsSidebarOpen(false)
// 						setSidebarParentNode(null)
// 					} catch (err) {
// 						console.error('Ошибка:', err)
// 						alert('Ошибка при сохранении нового узла')
// 					}
// 				}}
// 			/>
// 			<CartWidget
// 				isOpen={isCartOpen}
// 				onClose={() => setIsCartOpen(false)}
// 				person={cartPerson}
// 			/>
// 			{buttonWidgetVisible && buttonWidgetPosition && (
// 				<div
// 					style={{
// 						position: 'fixed',
// 						left: buttonWidgetPosition.x,
// 						top: buttonWidgetPosition.y,
// 						zIndex: 1000,
// 					}}
// 				>
// 					<ButtonWidget
// 						onInfoClick={() => {
// 							const node = nodes.find(n => n.id === activeNodeId)
// 							if (node)
// 								setCartPerson({
// 									id: node.id,
// 									name: node.name,
// 									description: node.description || '',
// 								})
// 							setIsCartOpen(true)
// 						}}
// 						onDeleteClick={() => {
// 							if (!activeNodeId) return
// 							// fetch(`http://localhost:5000/api/person/${activeNodeId}`, {
// 							// 	method: 'DELETE',
// 							// }).then(() => {
// 							// 	setNodes(prev =>
// 							// 		prev.filter(
// 							// 			n => n.id !== activeNodeId && n.parentId !== activeNodeId
// 							// 		)
// 							// 	)
// 							// 	setIsCartOpen(false)
// 							// 	setButtonWidgetVisible(false)
// 							// })
// 							fetch(
// 								`https://fashion-mwc8.onrender.com/api/person/${activeNodeId}`,
// 								{
// 									method: 'DELETE',
// 								}
// 							).then(() => {
// 								setNodes(prev =>
// 									prev.filter(
// 										n => n.id !== activeNodeId && n.parentId !== activeNodeId
// 									)
// 								)
// 								setIsCartOpen(false)
// 								setButtonWidgetVisible(false)
// 							})
// 						}}
// 					/>
// 				</div>
// 			)}
// 		</>
// 	)
// }
// export default GenealogyTree
import { useState, useRef, useEffect } from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { useAuth } from '../../widget/AuthContext';
import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal';
import AuthNoticeWidget from '../AuthNoticeWidget/AuthNoticeWidget';
import CartWidget from '../cartWidget/CartWidget';
import HumanWidget from '../HumanWidget/HumanWidget';
import ButtonWidget from '../buttonWidget/ButtonWidget';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useTreeStore } from '../../store/useTreeStore';
import { listenToAuth } from '../../dataBase/firebaseUser';
const GenealogyTree = () => {
    const { currentUser } = useAuth();
    const [nodes, setNodes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [scale, setScale] = useState(1);
    const [activeNode, setActiveNode] = useState(null);
    const [showAddButtonFor, setShowAddButtonFor] = useState(null);
    const [loginTargetNode, setLoginTargetNode] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [authNoticeOpen, setAuthNoticeOpen] = useState(false);
    const [authNoticeTargetNode, setAuthNoticeTargetNode] = useState(null);
    const scrollToNodeById = (id) => {
        const container = containerRef.current;
        const element = document.getElementById(`node-${id}`);
        if (container && element) {
            const containerRect = container.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            const scrollLeft = container.scrollLeft;
            const scrollTop = container.scrollTop;
            const offsetX = elementRect.left - containerRect.left;
            const offsetY = elementRect.top - containerRect.top;
            const centerX = offsetX + elementRect.width / 2;
            const centerY = offsetY + elementRect.height / 2;
            let newScrollLeft = scrollLeft + centerX - container.clientWidth / 2;
            let newScrollTop = scrollTop + centerY - container.clientHeight / 2;
            // Ограничиваем newScrollLeft
            if (newScrollLeft < 0)
                newScrollLeft = 0;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            if (newScrollLeft > maxScrollLeft)
                newScrollLeft = maxScrollLeft;
            // Ограничиваем newScrollTop
            if (newScrollTop < 0)
                newScrollTop = 0;
            const maxScrollTop = container.scrollHeight - container.clientHeight;
            if (newScrollTop > maxScrollTop)
                newScrollTop = maxScrollTop;
            container.scrollTo({
                left: newScrollLeft,
                top: newScrollTop,
                behavior: 'smooth',
            });
            element.classList.add(styles.highlight);
            setTimeout(() => element.classList.remove(styles.highlight), 1500);
        }
    };
    const [cartPerson, setCartPerson] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [sidebarParentNode, setSidebarParentNode] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [lines, setLines] = useState([]);
    const containerRef = useRef(null);
    const { activeNodeId, buttonWidgetVisible, buttonWidgetPosition, setActiveNode: setStoreActiveNode, setButtonWidgetPosition, setButtonWidgetVisible, } = useTreeStore();
    const [email, setEmail] = useState(null);
    // Функция для нахождения эмейла
    useEffect(() => {
        listenToAuth(email => setEmail(email));
    }, []);
    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const response = await fetch('https://fashion-mwc8.onrender.com/api/person');
                if (!response.ok)
                    throw new Error('Ошибка при загрузке данных');
                const data = await response.json();
                const persons = data.map((person) => ({
                    id: person._id,
                    parentId: person.parentId,
                    level: person.level,
                    visible: true,
                    name: person.name,
                    description: person.description,
                    createdBy: person.createdBy,
                }));
                setNodes(persons);
                setIsLoading(false);
            }
            catch (err) {
                setError('Не удалось загрузить данные');
                setIsLoading(false);
            }
        };
        fetchPersons();
    }, []);
    const toggleVisibility = (nodeId) => {
        setActiveNode(prev => (prev === nodeId ? null : nodeId));
        setShowAddButtonFor(prev => (prev === nodeId ? null : nodeId));
        setNodes(prevNodes => {
            const shouldShow = !prevNodes.some(n => n.parentId === nodeId && n.visible);
            const updateVisibility = (nodes, parentId, visible) => {
                let updated = [...nodes];
                const children = updated.filter(n => n.parentId === parentId);
                for (const child of children) {
                    updated = updated.map(n => n.id === child.id ? { ...n, visible } : n);
                    updated = updateVisibility(updated, child.id, visible);
                }
                return updated;
            };
            return updateVisibility(prevNodes, nodeId, shouldShow);
        });
        const el = containerRef.current?.querySelector(`[data-node-id="${nodeId}"]`);
        if (el) {
            const rect = el.getBoundingClientRect();
            setButtonWidgetPosition({ x: rect.right + 10, y: rect.top });
            setStoreActiveNode(nodeId);
            setButtonWidgetVisible(true);
        }
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
            if (!node.visible || node.parentId === null)
                return acc;
            const parent = nodePositions[node.parentId];
            const child = nodePositions[node.id];
            if (parent && child) {
                acc.push({
                    x1: (parent.right - containerRect.left) / scale,
                    y1: (parent.top + parent.height / 2 - containerRect.top) / scale,
                    x2: (child.left - containerRect.left) / scale,
                    y2: (child.top + child.height / 2 - containerRect.top) / scale,
                });
            }
            return acc;
        }, []);
        setLines(newLines);
    }, [nodes, scale]);
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
    const onBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsCartOpen(false);
            setIsSidebarOpen(false);
            setButtonWidgetVisible(false);
            setActiveNode(null);
            setShowAddButtonFor(null);
        }
    };
    const countDescendants = (id) => nodes.filter(n => n.parentId === id && n.visible).length;
    return (_jsxs(_Fragment, { children: [_jsx(TransformWrapper, { initialScale: 1, minScale: 0.5, maxScale: 2, wheel: { step: 0.1 }, doubleClick: { disabled: true }, panning: { disabled: false }, limitToBounds: false, onZoom: ({ state }) => setScale(state.scale), children: _jsx(TransformComponent, { wrapperStyle: { width: '100%' }, children: _jsxs("div", { className: styles.treeContainer, ref: containerRef, onClick: onBackgroundClick, children: [_jsx("svg", { className: styles.linesSvg, children: lines.map((line, idx) => (_jsx(motion.path, { d: `M ${line.x1} ${line.y1} C ${(line.x1 + line.x2) / 2} ${line.y1}, ${(line.x1 + line.x2) / 2} ${line.y2}, ${line.x2} ${line.y2}`, fill: 'transparent', stroke: '#333', strokeWidth: '7', strokeLinecap: 'round', initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.4 } }, idx))) }), (email === 'weelppak@gmail.com' ||
                                email === 'ulukbeknurubaev@gmail.com') &&
                                nodes.length === 0 ? (_jsx("div", { className: styles.emptyTree, children: _jsx("button", { className: styles.addRootButton, onClick: () => {
                                        if (currentUser) {
                                            setSidebarParentNode(null);
                                            setIsSidebarOpen(true);
                                        }
                                        else {
                                            setAuthNoticeOpen(true);
                                        }
                                    }, children: "+" }) })) : (Object.entries(groupedNodes()).map(([level, levelNodes]) => (_jsx("div", { className: styles.level, children: levelNodes.map(node => (_jsxs("div", { className: styles.nodeWrapper, children: [_jsxs("div", { id: `node-${node.id}`, className: `${styles.node} ${activeNode === node.id ? styles.active : ''}`, "data-node-id": node.id, onClick: e => {
                                                e.stopPropagation();
                                                toggleVisibility(node.id);
                                            }, children: [_jsx("div", { className: styles.imageWrapper, children: _jsx("img", { src: 'https://gen.kg/media/requests/solnce.svg', alt: 'avatar' }) }), _jsx("div", { className: styles.content, children: node.name }), _jsx("div", { className: styles.childrenCount, children: countDescendants(node.id) })] }), (email === 'weelppak@gmail.com' ||
                                            email === 'ulukbeknurubaev@gmail.com') && (_jsx("button", { className: `${styles.addChildButton} ${showAddButtonFor === node.id ? styles.visible : ''}`, onClick: e => {
                                                e.stopPropagation();
                                                if (currentUser) {
                                                    setSidebarParentNode(node);
                                                    setIsSidebarOpen(true);
                                                    setIsCartOpen(false);
                                                }
                                                else {
                                                    setAuthNoticeTargetNode(node);
                                                    setAuthNoticeOpen(true);
                                                }
                                            }, children: "+" }))] }, node.id))) }, level))))] }) }) }), _jsx(LoginWidgetModal, { isOpen: isLoginModalOpen, onClose: () => {
                    setIsLoginModalOpen(false);
                    setLoginTargetNode(null);
                }, onLoginSuccess: handleLoginSuccess }), _jsx(AuthNoticeWidget, { isOpen: authNoticeOpen, onClose: () => setAuthNoticeOpen(false), onLoginClick: () => {
                    setAuthNoticeOpen(false);
                    setIsLoginModalOpen(true);
                }, personName: authNoticeTargetNode?.name || '' }), _jsx(HumanWidget, { isOpen: isSidebarOpen, onClose: () => {
                    setIsSidebarOpen(false);
                    setSidebarParentNode(null);
                }, onSubmit: async (name, description) => {
                    try {
                        const body = {
                            name,
                            description,
                            parentId: sidebarParentNode?.id || null,
                            level: (sidebarParentNode?.level || 0) + 1,
                            createdBy: currentUser?.uid,
                        };
                        console.log('Отправка узла:', body);
                        const res = await fetch('https://fashion-mwc8.onrender.com/api/person', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                        });
                        if (!res.ok) {
                            const errText = await res.text();
                            console.error('Ошибка при сохранении:', errText);
                            alert('Ошибка при сохранении нового узла:\n' + errText);
                            return;
                        }
                        const data = await res.json();
                        const newNode = {
                            id: data._id,
                            parentId: data.parentId,
                            level: data.level,
                            visible: true,
                            name: data.name,
                            description: data.description,
                            createdBy: currentUser?.uid,
                        };
                        setNodes(prev => [...prev, newNode]);
                        setCartPerson({
                            id: data._id,
                            name: data.name,
                            description: data.description || '',
                        });
                        setIsCartOpen(true);
                        setIsSidebarOpen(false);
                        setSidebarParentNode(null);
                    }
                    catch (err) {
                        console.error('Ошибка:', err);
                        alert('Ошибка при сохранении нового узла');
                    }
                } }), _jsx(CartWidget, { isOpen: isCartOpen, onClose: () => setIsCartOpen(false), person: cartPerson }), buttonWidgetVisible && buttonWidgetPosition && (_jsx("div", { style: {
                    position: 'fixed',
                    left: buttonWidgetPosition.x,
                    top: buttonWidgetPosition.y,
                    zIndex: 1000,
                }, children: _jsx(ButtonWidget, { onInfoClick: () => {
                        const node = nodes.find(n => n.id === activeNodeId);
                        if (node)
                            setCartPerson({
                                id: node.id,
                                name: node.name,
                                description: node.description || '',
                            });
                        setIsCartOpen(true);
                    }, onDeleteClick: () => {
                        if (!activeNodeId)
                            return;
                        // Проверка прав удаления
                        if (email !== 'ulukbeknurubaev@gmail.com' &&
                            email !== 'weelppak@gmail.com') {
                            alert('Удалять узлы могут только администраторы');
                            return;
                        }
                        fetch(`https://fashion-mwc8.onrender.com/api/person/${activeNodeId}`, {
                            method: 'DELETE',
                        }).then(() => {
                            setNodes(prev => prev.filter(n => n.id !== activeNodeId && n.parentId !== activeNodeId));
                            setIsCartOpen(false);
                            setButtonWidgetVisible(false);
                        });
                    } }) }))] }));
};
export default GenealogyTree;
