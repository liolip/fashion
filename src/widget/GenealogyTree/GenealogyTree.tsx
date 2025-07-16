// import React, { useState, useRef, useEffect } from 'react'
// import styles from './style.module.scss'
// import { motion } from 'framer-motion'
// import { useAuth } from '../../widget/AuthContext'
// import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal'
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
// import HumanWidget from '../HumanWidget/HumanWidget'
// import AuthNoticeWidget from '../AuthNoticeWidget/AuthNoticeWidget'
// import CartWidget from '../cartWidget/CartWidget'
// import ButtonWidget from '../buttonWidget/ButtonWidget'
// import { useTreeStore } from '../../store/useTreeStore'

// interface Node {
// 	id: number
// 	parentId: number | null
// 	level: number
// 	visible: boolean
// 	name: string
// 	description?: string
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
// 	const [nodes, setNodes] = useState<Node[]>([
// 		{
// 			id: 0,
// 			parentId: null,
// 			level: 0,
// 			visible: true,
// 			name: 'Долон бий',
// 			description:
// 				'У кыргызов роды делятся на два крыла: правое и левое. Вот мы, оказывается, происходим от Долон-бия. До Долон-бия было 11 отцов. Самый последний из них – Кыргызбаем звался. Когда переходили перевал Долон, родился у Кыргызбая Долон-бий. Его жена родила в свое время близнецов, одного она назвала Оң (правый – ред.), сказав, что родила его с помощью правой почки, а другого – Сол (левый – ред.), сказав, что родила мальчика с помощью левой почки. От Оң произошли Адигине, Тагай и Наали – девочка и два мальчика. От Адигине – Солто, Сарыбагыш, Саяк, Бугу. В Таласе от старшего сына Долон-бия Каратала произошли Кушчу и Саруу. От Кушчу – Каратал и Каранай. Нашим призывом до сих пор является “Каратал” и “Каранай”. От Каратала – Жакып. От Жакыпа – Жантай, Эльтай и Кудайменде. От Жантая Каймазар, от которого мы вот произошли. От Эльтая – народ Кыргый произошел, который у истока Каракола расположился. От Кудайменде – племя Сабатар. Вот мы от этих троих сыновей и произошли, остальные дальше идут ветками. У Караная было два сына- Жансейит и Байсейит. От Жансейита пошли Каракушчу, Саркушчу, Кёккушчу, Тазкушчу. От второго – мелкие народы Сакалды, Чейне, Чилжуут и Бочу.',
// 		},
// 	])
// 	const [nextId, setNextId] = useState(1)
// 	const [scale, setScale] = useState(1)
// 	const [activeNode, setActiveNode] = useState<number | null>(null)
// 	const [showAddButtonFor, setShowAddButtonFor] = useState<number | null>(null)
// 	const [loginTargetNode, setLoginTargetNode] = useState<number | null>(null)
// 	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
// 	const [authNoticeOpen, setAuthNoticeOpen] = useState(false)
// 	const [authNoticeTargetNode, setAuthNoticeTargetNode] = useState<Node | null>(
// 		null
// 	)
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

// 	const addNode = (parentId: number, name: string, description = '') => {
// 		const parentNode = nodes.find(node => node.id === parentId)
// 		if (!parentNode) return
// 		const newId = nextId
// 		const newNode: Node = {
// 			id: newId,
// 			parentId,
// 			level: parentNode.level + 1,
// 			visible: true,
// 			name,
// 			description,
// 		}
// 		setNodes(prev => [...prev, newNode])
// 		setNextId(prev => prev + 1)
// 		setActiveNode(newId)
// 		setCartPerson({ id: newId.toString(), name, description })
// 		setIsCartOpen(true)
// 		setIsSidebarOpen(false)
// 	}

// 	const deleteNode = (id: number) => {
// 		setNodes(prev =>
// 			prev.filter(node => node.id !== id && node.parentId !== id)
// 		)
// 		if (activeNode === id) {
// 			setActiveNode(null)
// 			setCartPerson(null)
// 			setIsCartOpen(false)
// 		}
// 	}

// 	const showCartForNode = (node: Node) => {
// 		setCartPerson({
// 			id: node.id.toString(),
// 			name: node.name,
// 			description: node.description || '',
// 		})
// 		setIsCartOpen(true)
// 		setIsSidebarOpen(false)
// 	}

// 	const nodeHasVisibleChildren = (id: number, nodeArray: Node[]) =>
// 		nodeArray.some(n => n.parentId === id && n.visible)

// 	const toggleVisibility = (nodeId: number) => {
// 		setActiveNode(prev => (prev === nodeId ? null : nodeId))
// 		setShowAddButtonFor(prev => (prev === nodeId ? null : nodeId))
// 		setNodes(prevNodes => {
// 			const shouldShow = !nodeHasVisibleChildren(nodeId, prevNodes)
// 			const updateVisibility = (
// 				nodes: Node[],
// 				parentId: number,
// 				visible: boolean
// 			): Node[] => {
// 				let updatedNodes = [...nodes]
// 				const directChildren = updatedNodes.filter(n => n.parentId === parentId)
// 				for (const child of directChildren) {
// 					updatedNodes = updatedNodes.map(n =>
// 						n.id === child.id ? { ...n, visible } : n
// 					)
// 					updatedNodes = updateVisibility(updatedNodes, child.id, visible)
// 				}
// 				return updatedNodes
// 			}
// 			return updateVisibility(prevNodes, nodeId, shouldShow)
// 		})
// 		const element = containerRef.current?.querySelector(
// 			`[data-node-id="${nodeId}"]`
// 		)
// 		if (element) {
// 			const rect = element.getBoundingClientRect()
// 			setButtonWidgetPosition({ x: rect.right + 10, y: rect.top })
// 			setStoreActiveNode(nodeId.toString())
// 			setButtonWidgetVisible(true)
// 		}
// 	}

// 	const groupedNodes = () => {
// 		const grouped: { [level: number]: Node[] } = {}
// 		nodes.forEach(node => {
// 			if (!node.visible) return
// 			if (!grouped[node.level]) grouped[node.level] = []
// 			grouped[node.level].push(node)
// 		})
// 		return grouped
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
// 			if (node.parentId === null || !node.visible) return acc
// 			const parentRect = nodePositions[node.parentId.toString()]
// 			const childRect = nodePositions[node.id.toString()]
// 			if (parentRect && childRect) {
// 				const x1 = (parentRect.right - containerRect.left) / scale
// 				const y1 =
// 					(parentRect.top + parentRect.height / 2 - containerRect.top) / scale
// 				const x2 = (childRect.left - containerRect.left) / scale
// 				const y2 =
// 					(childRect.top + childRect.height / 2 - containerRect.top) / scale
// 				acc.push({ x1, y1, x2, y2 })
// 			}
// 			return acc
// 		}, [] as typeof lines)
// 		setLines(newLines)
// 	}, [nodes, scale])

// 	const countDescendants = (nodeId: number) =>
// 		nodes.filter(n => n.parentId === nodeId && n.visible).length

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

// 	// Закрытие всех модалок
// 	const closeAllModals = () => {
// 		setIsCartOpen(false)
// 		setIsSidebarOpen(false)
// 		setButtonWidgetVisible(false)
// 		setActiveNode(null)
// 		setShowAddButtonFor(null)
// 	}

// 	// Обработчик клика по фону (контейнеру дерева)
// 	const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
// 		// Чтобы не закрывать модалки при клике по узлам, проверяем, что клик именно по контейнеру
// 		if (e.target === e.currentTarget) {
// 			closeAllModals()
// 		}
// 	}

// 	return (
// 		<>
// 			<TransformWrapper
// 				initialScale={1}
// 				minScale={0.5}
// 				maxScale={2}
// 				wheel={{ step: 0.1 }}
// 				doubleClick={{ disabled: true }}
// 				panning={{ disabled: false, velocityDisabled: true }}
// 				limitToBounds={false}
// 				onZoom={({ state }) => setScale(state.scale)}
// 			>
// 				{({ zoomIn, zoomOut, resetTransform }) => (
// 					<>
// 						<div className={styles.controls}>
// 							<button onClick={() => zoomIn()}>+</button>
// 							<button onClick={() => zoomOut()}>-</button>
// 							<button onClick={() => resetTransform()}>Сброс</button>
// 						</div>
// 						<TransformComponent>
// 							{/* Вешаем обработчик клика именно сюда */}
// 							<div
// 								className={styles.treeContainer}
// 								ref={containerRef}
// 								onClick={onBackgroundClick}
// 							>
// 								<svg className={styles.linesSvg}>
// 									{lines.map((line, idx) => {
// 										const { x1, y1, x2, y2 } = line
// 										const pathD = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${
// 											(x1 + x2) / 2
// 										} ${y2}, ${x2} ${y2}`
// 										return (
// 											<motion.path
// 												key={idx}
// 												d={pathD}
// 												fill='transparent'
// 												stroke='#333'
// 												strokeWidth='7'
// 												strokeLinecap='round'
// 												initial={{ pathLength: 0 }}
// 												animate={{ pathLength: 1 }}
// 												transition={{ duration: 0.4 }}
// 											/>
// 										)
// 									})}
// 								</svg>

// 								{Object.entries(groupedNodes()).map(([level, levelNodes]) => (
// 									<div key={level} className={styles.level}>
// 										{levelNodes.map(node => (
// 											<div key={node.id} className={styles.nodeWrapper}>
// 												<div
// 													className={`${styles.node} ${
// 														!node.visible ? styles.nodeHidden : ''
// 													} ${activeNode === node.id ? styles.active : ''}`}
// 													data-node-id={node.id}
// 													onClick={e => {
// 														e.stopPropagation()
// 														toggleVisibility(node.id)
// 													}}
// 												>
// 													<div className={styles.imageWrapper}>
// 														<img
// 															src='https://gen.kg/media/requests/solnce.svg'
// 															alt='avatar'
// 														/>
// 													</div>
// 													<div className={styles.content}>{node.name}</div>
// 													<div className={styles.childrenCount}>
// 														{countDescendants(node.id)}
// 													</div>
// 												</div>
// 												<button
// 													className={`${styles.addChildButton} ${
// 														showAddButtonFor === node.id ? styles.visible : ''
// 													}`}
// 													onClick={e => {
// 														e.stopPropagation()
// 														if (currentUser) {
// 															setSidebarParentNode(node)
// 															setIsSidebarOpen(true)
// 															setIsCartOpen(false) // Закрываем CartWidget при открытии HumanWidget
// 														} else {
// 															setAuthNoticeTargetNode(node)
// 															setAuthNoticeOpen(true)
// 														}
// 													}}
// 												>
// 													+
// 												</button>
// 											</div>
// 										))}
// 									</div>
// 								))}
// 							</div>
// 						</TransformComponent>
// 					</>
// 				)}
// 			</TransformWrapper>

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
// 							const node = nodes.find(n => n.id.toString() === activeNodeId)
// 							if (node) {
// 								showCartForNode(node)
// 							}
// 						}}
// 						onDeleteClick={() => {
// 							if (activeNodeId) deleteNode(Number(activeNodeId))
// 							setButtonWidgetVisible(false)
// 						}}
// 					/>
// 				</div>
// 			)}

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
// 					if (sidebarParentNode) {
// 						try {
// 							const res = await fetch('http://localhost:5000/api/person', {
// 								method: 'POST',
// 								headers: {
// 									'Content-Type': 'application/json',
// 								},
// 								body: JSON.stringify({ name, description }),
// 							})

// 							if (!res.ok) throw new Error('Не удалось сохранить в базу данных')

// 							const data = await res.json()

// 							addNode(sidebarParentNode.id, data.name, data.description)

// 							setIsSidebarOpen(false)
// 							setSidebarParentNode(null)
// 						} catch (err) {
// 							console.error(err)
// 							alert('Ошибка при сохранении. Попробуйте ещё раз.')
// 						}
// 					}
// 				}}
// 			/>
// 			<CartWidget
// 				isOpen={isCartOpen}
// 				onClose={() => setIsCartOpen(false)}
// 				person={cartPerson}
// 			/>
// 		</>
// 	)
// }

// export default GenealogyTree

// import React, { useState, useRef, useEffect } from 'react'
// import styles from './style.module.scss'
// import { motion } from 'framer-motion'
// import { useAuth } from '../../widget/AuthContext'
// import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal'
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
// import HumanWidget from '../HumanWidget/HumanWidget'
// import AuthNoticeWidget from '../AuthNoticeWidget/AuthNoticeWidget'
// import CartWidget from '../cartWidget/CartWidget'
// import ButtonWidget from '../buttonWidget/ButtonWidget'
// import { useTreeStore } from '../../store/useTreeStore'

// interface Node {
// 	id: string // Изменено с number на string
// 	parentId: string | null // Изменено с number на string
// 	level: number
// 	visible: boolean
// 	name: string
// 	description?: string
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
// 	// Начальное состояние пустое
// 	const [isLoading, setIsLoading] = useState(true)
// 	const [error, setError] = useState<string | null>(null)
// 	const [scale, setScale] = useState(1)
// 	const [activeNode, setActiveNode] = useState<string | null>(null) // Изменено на string
// 	const [showAddButtonFor, setShowAddButtonFor] = useState<string | null>(null) // Изменено на string
// 	const [loginTargetNode, setLoginTargetNode] = useState<string | null>(null) // Изменено на string
// 	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
// 	const [authNoticeOpen, setAuthNoticeOpen] = useState(false)
// 	const [authNoticeTargetNode, setAuthNoticeTargetNode] = useState<Node | null>(
// 		null
// 	)
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

// 	// Загрузка данных с бэкенда
// 	useEffect(() => {
// 		const fetchPersons = async () => {
// 			try {
// 				const response = await fetch('http://localhost:5000/api/person')
// 				if (!response.ok) {
// 					throw new Error('Ошибка при загрузке данных')
// 				}
// 				const data = await response.json()
// 				console.log(data)

// 				// Преобразуем данные в формат Node
// 				const persons = data.map((person: any) => ({
// 					id: person._id,
// 					parentId: person.parentId,
// 					level: person.level,
// 					visible: true,
// 					name: person.name,
// 					description: person.description,
// 				}))

// 				setNodes(persons)
// 				setIsLoading(false)
// 			} catch (err) {
// 				setError('Не удалось загрузить данные')
// 				setIsLoading(false)
// 				console.error(err)
// 			}
// 		}

// 		fetchPersons()
// 	}, [])

// 	const addNode = (nodeData: Node) => {
// 		setNodes(prev => [...prev, nodeData])
// 		setActiveNode(nodeData.id)
// 		setCartPerson({
// 			id: nodeData.id,
// 			name: nodeData.name,
// 			description: nodeData.description || '',
// 		})
// 		setIsCartOpen(true)
// 		setIsSidebarOpen(false)
// 	}

// 	const deleteNode = async (id: string) => {
// 		try {
// 			// Удаляем на сервере
// 			const res = await fetch(`http://localhost:5000/api/person/${id}`, {
// 				method: 'DELETE',
// 			})

// 			if (!res.ok) throw new Error('Ошибка при удалении')

// 			// Удаляем локально
// 			setNodes(prev =>
// 				prev.filter(node => node.id !== id && node.parentId !== id)
// 			)

// 			if (activeNode === id) {
// 				setActiveNode(null)
// 				setCartPerson(null)
// 				setIsCartOpen(false)
// 			}
// 		} catch (err) {
// 			console.error('Ошибка при удалении:', err)
// 			alert('Не удалось удалить элемент')
// 		}
// 	}

// 	const showCartForNode = (node: Node) => {
// 		setCartPerson({
// 			id: node.id,
// 			name: node.name,
// 			description: node.description || '',
// 		})
// 		setIsCartOpen(true)
// 		setIsSidebarOpen(false)
// 	}

// 	const nodeHasVisibleChildren = (id: string, nodeArray: Node[]) =>
// 		nodeArray.some(n => n.parentId === id && n.visible)

// 	const toggleVisibility = (nodeId: string) => {
// 		setActiveNode(prev => (prev === nodeId ? null : nodeId))
// 		setShowAddButtonFor(prev => (prev === nodeId ? null : nodeId))
// 		setNodes(prevNodes => {
// 			const shouldShow = !nodeHasVisibleChildren(nodeId, prevNodes)
// 			const updateVisibility = (
// 				nodes: Node[],
// 				parentId: string,
// 				visible: boolean
// 			): Node[] => {
// 				let updatedNodes = [...nodes]
// 				const directChildren = updatedNodes.filter(n => n.parentId === parentId)
// 				for (const child of directChildren) {
// 					updatedNodes = updatedNodes.map(n =>
// 						n.id === child.id ? { ...n, visible } : n
// 					)
// 					updatedNodes = updateVisibility(updatedNodes, child.id, visible)
// 				}
// 				return updatedNodes
// 			}
// 			return updateVisibility(prevNodes, nodeId, shouldShow)
// 		})
// 		const element = containerRef.current?.querySelector(
// 			`[data-node-id="${nodeId}"]`
// 		)
// 		if (element) {
// 			const rect = element.getBoundingClientRect()
// 			setButtonWidgetPosition({ x: rect.right + 10, y: rect.top })
// 			setStoreActiveNode(nodeId)
// 			setButtonWidgetVisible(true)
// 		}
// 	}

// 	const groupedNodes = () => {
// 		const grouped: { [level: number]: Node[] } = {}
// 		nodes.forEach(node => {
// 			if (!node.visible) return
// 			if (!grouped[node.level]) grouped[node.level] = []
// 			grouped[node.level].push(node)
// 		})
// 		return grouped
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
// 			if (node.parentId === null || !node.visible) return acc
// 			const parentRect = nodePositions[node.parentId]
// 			const childRect = nodePositions[node.id]
// 			if (parentRect && childRect) {
// 				const x1 = (parentRect.right - containerRect.left) / scale
// 				const y1 =
// 					(parentRect.top + parentRect.height / 2 - containerRect.top) / scale
// 				const x2 = (childRect.left - containerRect.left) / scale
// 				const y2 =
// 					(childRect.top + childRect.height / 2 - containerRect.top) / scale
// 				acc.push({ x1, y1, x2, y2 })
// 			}
// 			return acc
// 		}, [] as typeof lines)
// 		setLines(newLines)
// 	}, [nodes, scale])

// 	const countDescendants = (nodeId: string) =>
// 		nodes.filter(n => n.parentId === nodeId && n.visible).length

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

// 	const closeAllModals = () => {
// 		setIsCartOpen(false)
// 		setIsSidebarOpen(false)
// 		setButtonWidgetVisible(false)
// 		setActiveNode(null)
// 		setShowAddButtonFor(null)
// 	}

// 	const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
// 		if (e.target === e.currentTarget) {
// 			closeAllModals()
// 		}
// 	}

// 	if (isLoading) {
// 		return <div className={styles.loading}>Загрузка данных...</div>
// 	}

// 	if (error) {
// 		return <div className={styles.error}>{error}</div>
// 	}

// 	return (
// 		<>
// 			<TransformWrapper
// 				initialScale={1}
// 				minScale={0.5}
// 				maxScale={2}
// 				wheel={{ step: 0.1 }}
// 				doubleClick={{ disabled: true }}
// 				panning={{ disabled: false, velocityDisabled: true }}
// 				limitToBounds={false}
// 				onZoom={({ state }) => setScale(state.scale)}
// 			>
// 				{({ zoomIn, zoomOut, resetTransform }) => (
// 					<>
// 						<div className={styles.controls}>
// 							<button onClick={() => zoomIn()}>+</button>
// 							<button onClick={() => zoomOut()}>-</button>
// 							<button onClick={() => resetTransform()}>Сброс</button>
// 						</div>
// 						<TransformComponent>
// 							<div
// 								className={styles.treeContainer}
// 								ref={containerRef}
// 								onClick={onBackgroundClick}
// 							>
// 								<svg className={styles.linesSvg}>
// 									{lines.map((line, idx) => {
// 										const { x1, y1, x2, y2 } = line
// 										const pathD = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${
// 											(x1 + x2) / 2
// 										} ${y2}, ${x2} ${y2}`
// 										return (
// 											<motion.path
// 												key={idx}
// 												d={pathD}
// 												fill='transparent'
// 												stroke='#333'
// 												strokeWidth='7'
// 												strokeLinecap='round'
// 												initial={{ pathLength: 0 }}
// 												animate={{ pathLength: 1 }}
// 												transition={{ duration: 0.4 }}
// 											/>
// 										)
// 									})}
// 								</svg>

// 								{Object.entries(groupedNodes()).map(([level, levelNodes]) => (
// 									<div key={level} className={styles.level}>
// 										{levelNodes.map(node => (
// 											<div key={node.id} className={styles.nodeWrapper}>
// 												<div
// 													className={`${styles.node} ${
// 														!node.visible ? styles.nodeHidden : ''
// 													} ${activeNode === node.id ? styles.active : ''}`}
// 													data-node-id={node.id}
// 													onClick={e => {
// 														e.stopPropagation()
// 														toggleVisibility(node.id)
// 													}}
// 												>
// 													<div className={styles.imageWrapper}>
// 														<img
// 															src='https://gen.kg/media/requests/solnce.svg'
// 															alt='avatar'
// 														/>
// 													</div>
// 													<div className={styles.content}>{node.name}</div>
// 													<div className={styles.childrenCount}>
// 														{countDescendants(node.id)}
// 													</div>
// 												</div>
// 												<button
// 													className={`${styles.addChildButton} ${
// 														showAddButtonFor === node.id ? styles.visible : ''
// 													}`}
// 													onClick={e => {
// 														e.stopPropagation()
// 														if (currentUser) {
// 															setSidebarParentNode(node)
// 															setIsSidebarOpen(true)
// 															setIsCartOpen(false)
// 														} else {
// 															setAuthNoticeTargetNode(node)
// 															setAuthNoticeOpen(true)
// 														}
// 													}}
// 												>
// 													+
// 												</button>
// 											</div>
// 										))}
// 									</div>
// 								))}
// 							</div>
// 						</TransformComponent>
// 					</>
// 				)}
// 			</TransformWrapper>

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
// 							if (node) {
// 								showCartForNode(node)
// 							}
// 						}}
// 						onDeleteClick={() => {
// 							if (activeNodeId) deleteNode(activeNodeId)
// 							setButtonWidgetVisible(false)
// 						}}
// 					/>
// 				</div>
// 			)}

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
// 					if (sidebarParentNode) {
// 						try {
// 							const res = await fetch('http://localhost:5000/api/person', {
// 								method: 'POST',
// 								headers: {
// 									'Content-Type': 'application/json',
// 								},
// 								body: JSON.stringify({
// 									name,
// 									description,
// 									parentId: sidebarParentNode.id, // Обязательное поле!
// 									level: sidebarParentNode.level + 1, // Рассчитываем уровень на клиенте
// 								}),
// 							})

// 							if (!res.ok) throw new Error('Не удалось сохранить в базу данных')

// 							const data = await res.json()
// 							console.log('Created person data:', data) // Для отладки

// 							// Создаем новый узел
// 							const newNode: Node = {
// 								id: data._id,
// 								parentId: data.parentId,
// 								level: data.level,
// 								visible: true,
// 								name: data.name,
// 								description: data.description,
// 							}

// 							// Обновляем состояние
// 							setNodes(prev => [...prev, newNode])
// 							setIsSidebarOpen(false)
// 							setSidebarParentNode(null)

// 							// Показываем карточку нового человека
// 							setCartPerson({
// 								id: data._id,
// 								name: data.name,
// 								description: data.description || '',
// 							})
// 							setIsCartOpen(true)
// 						} catch (err) {
// 							console.error('Error creating person:', err)
// 							alert('Ошибка при сохранении. Попробуйте ещё раз.')
// 						}
// 					}
// 				}}
// 			/>

// 			<CartWidget
// 				isOpen={isCartOpen}
// 				onClose={() => setIsCartOpen(false)}
// 				person={cartPerson}
// 			/>
// 		</>
// 	)
// }

// export default GenealogyTree
// import React, { useState, useRef, useEffect } from 'react'
// import styles from './style.module.scss'
// import { motion } from 'framer-motion'
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
// import { useAuth } from '../../widget/AuthContext'
// import ButtonWidget from '../buttonWidget/ButtonWidget'
// import LoginWidgetModal from '../loginWidgetModal/LoginWidgetModal'
// import AuthNoticeWidget from '../AuthNoticeWidget/AuthNoticeWidget'
// import HumanWidget from '../HumanWidget/HumanWidget'
// import CartWidget from '../cartWidget/CartWidget'
// import { useTreeStore } from '../../store/useTreeStore'

// interface Node {
// 	id: string
// 	parentId: string | null
// 	level: number
// 	visible: boolean
// 	name: string
// 	description?: string
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

// 	useEffect(() => {
// 		const fetchPersons = async () => {
// 			try {
// 				const response = await fetch('http://localhost:5000/api/person')
// 				if (!response.ok) throw new Error('Ошибка при загрузке данных')
// 				const data = await response.json()
// 				const persons = data.map((person: any) => ({
// 					id: person._id,
// 					parentId: person.parentId,
// 					level: person.level,
// 					visible: true,
// 					name: person.name,
// 					description: person.description,
// 				}))
// 				setNodes(persons)
// 			} catch (err) {
// 				setError('Не удалось загрузить данные')
// 			} finally {
// 				setIsLoading(false)
// 			}
// 		}
// 		fetchPersons()
// 	}, [])

// 	const groupedNodes = () => {
// 		const grouped: { [level: number]: Node[] } = {}
// 		nodes.forEach(node => {
// 			if (!node.visible) return
// 			if (!grouped[node.level]) grouped[node.level] = []
// 			grouped[node.level].push(node)
// 		})
// 		return grouped
// 	}

// 	const countDescendants = (nodeId: string) =>
// 		nodes.filter(n => n.parentId === nodeId && n.visible).length

// 	const nodeHasVisibleChildren = (id: string) =>
// 		nodes.some(n => n.parentId === id && n.visible)

// 	const toggleVisibility = (nodeId: string) => {
// 		setActiveNode(prev => (prev === nodeId ? null : nodeId))
// 		setShowAddButtonFor(prev => (prev === nodeId ? null : nodeId))
// 		setNodes(prevNodes => {
// 			const shouldShow = !nodeHasVisibleChildren(nodeId)
// 			const updateVisibility = (
// 				nodes: Node[],
// 				parentId: string,
// 				visible: boolean
// 			): Node[] => {
// 				let updatedNodes = [...nodes]
// 				const children = updatedNodes.filter(n => n.parentId === parentId)
// 				for (const child of children) {
// 					updatedNodes = updatedNodes.map(n =>
// 						n.id === child.id ? { ...n, visible } : n
// 					)
// 					updatedNodes = updateVisibility(updatedNodes, child.id, visible)
// 				}
// 				return updatedNodes
// 			}
// 			return updateVisibility(prevNodes, nodeId, shouldShow)
// 		})

// 		const element = containerRef.current?.querySelector(
// 			`[data-node-id="${nodeId}"]`
// 		)
// 		if (element) {
// 			const rect = element.getBoundingClientRect()
// 			setButtonWidgetPosition({ x: rect.right + 10, y: rect.top })
// 			setStoreActiveNode(nodeId)
// 			setButtonWidgetVisible(true)
// 		}
// 	}

// 	const addFirstNode = () => {
// 		if (!currentUser) {
// 			setAuthNoticeTargetNode(null)
// 			setAuthNoticeOpen(true)
// 		} else {
// 			setSidebarParentNode(null)
// 			setIsSidebarOpen(true)
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
// 				nodePositions[id] = rect
// 			}
// 		})
// 		const containerRect = container.getBoundingClientRect()
// 		const newLines = nodes.reduce((acc, node) => {
// 			if (node.parentId === null || !node.visible) return acc
// 			const parentRect = nodePositions[node.parentId]
// 			const childRect = nodePositions[node.id]
// 			if (parentRect && childRect) {
// 				const x1 = (parentRect.right - containerRect.left) / scale
// 				const y1 =
// 					(parentRect.top + parentRect.height / 2 - containerRect.top) / scale
// 				const x2 = (childRect.left - containerRect.left) / scale
// 				const y2 =
// 					(childRect.top + childRect.height / 2 - containerRect.top) / scale
// 				acc.push({ x1, y1, x2, y2 })
// 			}
// 			return acc
// 		}, [] as typeof lines)
// 		setLines(newLines)
// 	}, [nodes, scale])

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

// 	const closeAllModals = () => {
// 		setIsCartOpen(false)
// 		setIsSidebarOpen(false)
// 		setButtonWidgetVisible(false)
// 		setActiveNode(null)
// 		setShowAddButtonFor(null)
// 	}

// 	if (isLoading) return <div className={styles.loading}>Загрузка...</div>
// 	if (error) return <div className={styles.error}>{error}</div>

// 	const showAddStartButton =
// 		nodes.length === 0 ||
// 		(nodes.length === 1 && !nodeHasVisibleChildren(nodes[0].id))
// 	const rootNodes = nodes.filter(n => n.parentId === null)
// 	const onlyRootWithNoChildren =
// 		rootNodes.length === 1 && !nodes.some(n => n.parentId === rootNodes[0].id)

// 	return (
// 		<>
// 			<TransformWrapper
// 				initialScale={1}
// 				minScale={0.5}
// 				maxScale={2}
// 				wheel={{ step: 0.1 }}
// 				doubleClick={{ disabled: true }}
// 				onZoom={({ state }) => setScale(state.scale)}
// 			>
// 				{({ zoomIn, zoomOut, resetTransform }) => (
// 					<>
// 						<div className={styles.controls}>
// 							<button onClick={() => zoomIn()}>+</button>
// 							<button onClick={() => zoomOut()}>-</button>
// 							<button onClick={() => resetTransform()}>Сброс</button>
// 						</div>

// 						<TransformComponent>
// 							<div
// 								className={styles.treeContainer}
// 								ref={containerRef}
// 								onClick={e => {
// 									if (e.target === e.currentTarget) closeAllModals()
// 								}}
// 							>
// 								{showAddStartButton && (
// 									<button
// 										className={styles.startAddButton}
// 										onClick={addFirstNode}
// 									>
// 										+
// 									</button>
// 								)}

// 								<svg className={styles.linesSvg}>
// 									{lines.map((line, idx) => {
// 										const { x1, y1, x2, y2 } = line
// 										const pathD = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${
// 											(x1 + x2) / 2
// 										} ${y2}, ${x2} ${y2}`
// 										return (
// 											<motion.path
// 												key={idx}
// 												d={pathD}
// 												fill='transparent'
// 												stroke='#333'
// 												strokeWidth={6}
// 												strokeLinecap='round'
// 												initial={{ pathLength: 0 }}
// 												animate={{ pathLength: 1 }}
// 												transition={{ duration: 0.4 }}
// 											/>
// 										)
// 									})}
// 								</svg>

// 								{Object.entries(groupedNodes()).map(([level, levelNodes]) => (
// 									<div key={level} className={styles.level}>
// 										{levelNodes.map(node => (
// 											<div key={node.id} className={styles.nodeWrapper}>
// 												<div
// 													className={`${styles.node} ${
// 														activeNode === node.id ? styles.active : ''
// 													}`}
// 													data-node-id={node.id}
// 													onClick={e => {
// 														e.stopPropagation()
// 														toggleVisibility(node.id)
// 													}}
// 												>
// 													<img src='/default-avatar.svg' alt='avatar' />
// 													<div className={styles.content}>{node.name}</div>
// 													<div className={styles.childrenCount}>
// 														{countDescendants(node.id)}
// 													</div>
// 												</div>

// 												{showAddButtonFor === node.id && (
// 													<button
// 														className={styles.addChildButton}
// 														onClick={e => {
// 															e.stopPropagation()
// 															if (currentUser) {
// 																setSidebarParentNode(node)
// 																setIsSidebarOpen(true)
// 															} else {
// 																setAuthNoticeTargetNode(node)
// 																setAuthNoticeOpen(true)
// 															}
// 														}}
// 													>
// 														+
// 													</button>
// 												)}
// 											</div>
// 										))}
// 									</div>
// 								))}
// 							</div>
// 						</TransformComponent>
// 					</>
// 				)}
// 			</TransformWrapper>

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
// 							if (node) {
// 								setCartPerson({
// 									id: node.id,
// 									name: node.name,
// 									description: node.description || '',
// 								})
// 								setIsCartOpen(true)
// 							}
// 						}}
// 						onDeleteClick={() => {
// 							if (activeNodeId) {
// 								setNodes(prev => prev.filter(n => n.id !== activeNodeId))
// 								setButtonWidgetVisible(false)
// 							}
// 						}}
// 					/>
// 				</div>
// 			)}

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
// 						const res = await fetch('http://localhost:5000/api/person', {
// 							method: 'POST',
// 							headers: { 'Content-Type': 'application/json' },
// 							body: JSON.stringify({
// 								name,
// 								description,
// 								parentId: sidebarParentNode?.id || null,
// 								level: sidebarParentNode ? sidebarParentNode.level + 1 : 0,
// 							}),
// 						})
// 						if (!res.ok) throw new Error()
// 						const data = await res.json()
// 						const newNode: Node = {
// 							id: data._id,
// 							parentId: data.parentId,
// 							level: data.level,
// 							visible: true,
// 							name: data.name,
// 							description: data.description,
// 						}
// 						setNodes(prev => [...prev, newNode])
// 						setSidebarParentNode(null)
// 						setIsSidebarOpen(false)
// 						setCartPerson({
// 							id: newNode.id,
// 							name: newNode.name,
// 							description: newNode.description || '',
// 						})
// 						setIsCartOpen(true)
// 					} catch (err) {
// 						alert('Ошибка при добавлении узла')
// 					}
// 				}}
// 			/>

// 			<CartWidget
// 				isOpen={isCartOpen}
// 				onClose={() => setIsCartOpen(false)}
// 				person={cartPerson}
// 			/>
// 		</>
// 	)
// }

// export default GenealogyTree
import React, { useState, useRef, useEffect } from 'react'
import styles from './style.module.scss'
import { motion } from 'framer-motion'
import { useAuth } from '../../widget/AuthContext'
import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal'
import AuthNoticeWidget from '../AuthNoticeWidget/AuthNoticeWidget'
import CartWidget from '../cartWidget/CartWidget'
import HumanWidget from '../HumanWidget/HumanWidget'
import ButtonWidget from '../buttonWidget/ButtonWidget'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useTreeStore } from '../../store/useTreeStore'

import { listenToAuth } from '../../dataBase/firebaseUser'

interface Node {
	id: string
	parentId: string | null
	level: number
	visible: boolean
	name: string
	description?: string
	createdBy?: string // ✅ добавлено
}

interface Person {
	id: string
	name: string
	description: string
	count?: number
	imageUrl?: string
}

const GenealogyTree: React.FC = () => {
	const { currentUser } = useAuth()
	const [nodes, setNodes] = useState<Node[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [scale, setScale] = useState(1)
	const [activeNode, setActiveNode] = useState<string | null>(null)
	const [showAddButtonFor, setShowAddButtonFor] = useState<string | null>(null)
	const [loginTargetNode, setLoginTargetNode] = useState<string | null>(null)
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
	const [authNoticeOpen, setAuthNoticeOpen] = useState(false)
	const [authNoticeTargetNode, setAuthNoticeTargetNode] = useState<Node | null>(
		null
	)
	const scrollToNodeById = (id: string) => {
		const el = document.getElementById(`node-${id}`)
		if (el) {
			el.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center',
			})

			// Плавная подсветка
			el.classList.add(styles.highlight)
			setTimeout(() => el.classList.remove(styles.highlight), 1500)
		}
	}

	const [cartPerson, setCartPerson] = useState<Person | null>(null)
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [sidebarParentNode, setSidebarParentNode] = useState<Node | null>(null)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const [lines, setLines] = useState<
		{ x1: number; y1: number; x2: number; y2: number }[]
	>([])
	const containerRef = useRef<HTMLDivElement>(null)

	const {
		activeNodeId,
		buttonWidgetVisible,
		buttonWidgetPosition,
		setActiveNode: setStoreActiveNode,
		setButtonWidgetPosition,
		setButtonWidgetVisible,
	} = useTreeStore()

	const [email, setEmail] = useState<string | null>(null)

	// Функция для нахождения эмейла
	useEffect(() => {
		listenToAuth(email => setEmail(email))
	}, [])

	useEffect(() => {
		const fetchPersons = async () => {
			try {
				const response = await fetch(
					'https://fashion-mwc8.onrender.com/api/person'
				)
				// const response = await fetch('http://localhost:5000/api/person')
				if (!response.ok) throw new Error('Ошибка при загрузке данных')
				const data = await response.json()

				const persons = data.map((person: any) => ({
					id: person._id,
					parentId: person.parentId,
					level: person.level,
					visible: true,
					name: person.name,
					description: person.description,
					createdBy: person.createdBy, // ✅ добавлено
				}))

				if (email === 'weelppak@gmail.com') {
					setNodes(persons)
				} else {
					setNodes([]) // или null — но [] лучше для карты
				}

				setIsLoading(false)
			} catch (err) {
				setError('Не удалось загрузить данные')
				setIsLoading(false)
			}
		}
		fetchPersons()
	}, [email]) // ✅ важно: зависимость от email, чтобы срабатывало при его получении

	const toggleVisibility = (nodeId: string) => {
		setActiveNode(prev => (prev === nodeId ? null : nodeId))
		setShowAddButtonFor(prev => (prev === nodeId ? null : nodeId))
		setNodes(prevNodes => {
			const shouldShow = !prevNodes.some(
				n => n.parentId === nodeId && n.visible
			)
			const updateVisibility = (
				nodes: Node[],
				parentId: string,
				visible: boolean
			): Node[] => {
				let updated = [...nodes]
				const children = updated.filter(n => n.parentId === parentId)
				for (const child of children) {
					updated = updated.map(n =>
						n.id === child.id ? { ...n, visible } : n
					)
					updated = updateVisibility(updated, child.id, visible)
				}
				return updated
			}
			return updateVisibility(prevNodes, nodeId, shouldShow)
		})

		const el = containerRef.current?.querySelector(`[data-node-id="${nodeId}"]`)
		if (el) {
			const rect = el.getBoundingClientRect()
			setButtonWidgetPosition({ x: rect.right + 10, y: rect.top })
			setStoreActiveNode(nodeId)
			setButtonWidgetVisible(true)
		}
	}

	useEffect(() => {
		const container = containerRef.current
		if (!container) return
		const nodeElements = container.querySelectorAll('[data-node-id]')
		const nodePositions: { [id: string]: DOMRect } = {}
		nodeElements.forEach(el => {
			const id = el.getAttribute('data-node-id')
			if (id) {
				const rect = el.getBoundingClientRect()
				if (rect.width > 0 && rect.height > 0) nodePositions[id] = rect
			}
		})
		const containerRect = container.getBoundingClientRect()
		const newLines = nodes.reduce((acc, node) => {
			if (!node.visible || node.parentId === null) return acc
			const parent = nodePositions[node.parentId]
			const child = nodePositions[node.id]
			if (parent && child) {
				acc.push({
					x1: (parent.right - containerRect.left) / scale,
					y1: (parent.top + parent.height / 2 - containerRect.top) / scale,
					x2: (child.left - containerRect.left) / scale,
					y2: (child.top + child.height / 2 - containerRect.top) / scale,
				})
			}
			return acc
		}, [] as typeof lines)
		setLines(newLines)
	}, [nodes, scale])

	const groupedNodes = () => {
		const grouped: { [level: number]: Node[] } = {}
		nodes.forEach(node => {
			if (!node.visible) return
			if (!grouped[node.level]) grouped[node.level] = []
			grouped[node.level].push(node)
		})
		return grouped
	}

	const handleLoginSuccess = () => {
		setIsLoginModalOpen(false)
		if (loginTargetNode !== null) {
			const target = nodes.find(n => n.id === loginTargetNode)
			if (target) {
				setSidebarParentNode(target)
				setIsSidebarOpen(true)
			}
			setLoginTargetNode(null)
		}
	}

	const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			setIsCartOpen(false)
			setIsSidebarOpen(false)
			setButtonWidgetVisible(false)
			setActiveNode(null)
			setShowAddButtonFor(null)
		}
	}

	const countDescendants = (id: string) =>
		nodes.filter(n => n.parentId === id && n.visible).length

	return (
		<>
			<TransformWrapper
				initialScale={1}
				minScale={0.5}
				maxScale={2}
				wheel={{ step: 0.1 }}
				doubleClick={{ disabled: true }}
				panning={{ disabled: false }}
				limitToBounds={false}
				onZoom={({ state }) => setScale(state.scale)}
			>
				<TransformComponent wrapperStyle={{ width: '100%' }}>
					<div
						className={styles.treeContainer}
						ref={containerRef}
						onClick={onBackgroundClick}
					>
						<svg className={styles.linesSvg}>
							{lines.map((line, idx) => (
								<motion.path
									key={idx}
									d={`M ${line.x1} ${line.y1} C ${(line.x1 + line.x2) / 2} ${
										line.y1
									}, ${(line.x1 + line.x2) / 2} ${line.y2}, ${line.x2} ${
										line.y2
									}`}
									fill='transparent'
									stroke='#333'
									strokeWidth='7'
									strokeLinecap='round'
									initial={{ pathLength: 0 }}
									animate={{ pathLength: 1 }}
									transition={{ duration: 0.4 }}
								/>
							))}
						</svg>

						{email === 'weelppak@gmail.com' && nodes.length === 0 ? (
							<div className={styles.emptyTree}>
								<button
									className={styles.addRootButton}
									onClick={() => {
										if (currentUser) {
											setSidebarParentNode(null)
											setIsSidebarOpen(true)
										} else {
											setAuthNoticeOpen(true)
										}
									}}
								>
									+
								</button>
							</div>
						) : (
							Object.entries(groupedNodes()).map(([level, levelNodes]) => (
								<div key={level} className={styles.level}>
									{levelNodes.map(node => (
										<div key={node.id} className={styles.nodeWrapper}>
											<div
												id={`node-${node.id}`} // ⬅️ вот это добавляем
												className={`${styles.node} ${
													activeNode === node.id ? styles.active : ''
												}`}
												data-node-id={node.id}
												onClick={e => {
													e.stopPropagation()
													toggleVisibility(node.id)
												}}
											>
												<div className={styles.imageWrapper}>
													<img
														src='https://gen.kg/media/requests/solnce.svg'
														alt='avatar'
													/>
												</div>
												<div className={styles.content}>{node.name}</div>
												<div className={styles.childrenCount}>
													{countDescendants(node.id)}
												</div>
											</div>

											{email === 'weelppak@gmail.com' && (
												<button
													className={`${styles.addChildButton} ${
														showAddButtonFor === node.id ? styles.visible : ''
													}`}
													onClick={e => {
														e.stopPropagation()
														if (currentUser) {
															setSidebarParentNode(node)
															setIsSidebarOpen(true)
															setIsCartOpen(false)
														} else {
															setAuthNoticeTargetNode(node)
															setAuthNoticeOpen(true)
														}
													}}
												>
													+
												</button>
											)}
										</div>
									))}
								</div>
							))
						)}
					</div>
				</TransformComponent>
			</TransformWrapper>

			<LoginWidgetModal
				isOpen={isLoginModalOpen}
				onClose={() => {
					setIsLoginModalOpen(false)
					setLoginTargetNode(null)
				}}
				onLoginSuccess={handleLoginSuccess}
			/>

			<AuthNoticeWidget
				isOpen={authNoticeOpen}
				onClose={() => setAuthNoticeOpen(false)}
				onLoginClick={() => {
					setAuthNoticeOpen(false)
					setIsLoginModalOpen(true)
				}}
				personName={authNoticeTargetNode?.name || ''}
			/>

			<HumanWidget
				isOpen={isSidebarOpen}
				onClose={() => {
					setIsSidebarOpen(false)
					setSidebarParentNode(null)
				}}
				onSubmit={async (name, description) => {
					try {
						const body = {
							name,
							description,
							parentId: sidebarParentNode?.id || null,
							level: (sidebarParentNode?.level || 0) + 1,
							createdBy: currentUser?.uid,
						}

						console.log('Отправка узла:', body)

						// const res = await fetch('http://localhost:5000/api/person', {
						// 	method: 'POST',
						// 	headers: {
						// 		'Content-Type': 'application/json',
						// 	},
						// 	body: JSON.stringify(body),
						// })

						const res = await fetch(
							'https://fashion-mwc8.onrender.com/api/person',
							{
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify(body),
							}
						)

						if (!res.ok) {
							const errText = await res.text()
							console.error('Ошибка при сохранении:', errText)
							alert('Ошибка при сохранении нового узла:\n' + errText)
							return
						}

						const data = await res.json()

						const newNode: Node = {
							id: data._id,
							parentId: data.parentId,
							level: data.level,
							visible: true,
							name: data.name,
							description: data.description,
							createdBy: currentUser?.uid,
						}

						setNodes(prev => [...prev, newNode])
						setCartPerson({
							id: data._id,
							name: data.name,
							description: data.description || '',
						})
						setIsCartOpen(true)
						setIsSidebarOpen(false)
						setSidebarParentNode(null)
					} catch (err) {
						console.error('Ошибка:', err)
						alert('Ошибка при сохранении нового узла')
					}
				}}
			/>

			<CartWidget
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				person={cartPerson}
			/>

			{buttonWidgetVisible && buttonWidgetPosition && (
				<div
					style={{
						position: 'fixed',
						left: buttonWidgetPosition.x,
						top: buttonWidgetPosition.y,
						zIndex: 1000,
					}}
				>
					<ButtonWidget
						onInfoClick={() => {
							const node = nodes.find(n => n.id === activeNodeId)
							if (node)
								setCartPerson({
									id: node.id,
									name: node.name,
									description: node.description || '',
								})
							setIsCartOpen(true)
						}}
						onDeleteClick={() => {
							if (!activeNodeId) return
							// fetch(`http://localhost:5000/api/person/${activeNodeId}`, {
							// 	method: 'DELETE',
							// }).then(() => {
							// 	setNodes(prev =>
							// 		prev.filter(
							// 			n => n.id !== activeNodeId && n.parentId !== activeNodeId
							// 		)
							// 	)
							// 	setIsCartOpen(false)
							// 	setButtonWidgetVisible(false)
							// })

							fetch(
								`https://fashion-mwc8.onrender.com/api/person/${activeNodeId}`,
								{
									method: 'DELETE',
								}
							).then(() => {
								setNodes(prev =>
									prev.filter(
										n => n.id !== activeNodeId && n.parentId !== activeNodeId
									)
								)
								setIsCartOpen(false)
								setButtonWidgetVisible(false)
							})
						}}
					/>
				</div>
			)}
		</>
	)
}

export default GenealogyTree
