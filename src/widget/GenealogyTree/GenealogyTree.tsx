// import React, { useState, useRef, useEffect } from 'react'
// import styles from './style.module.scss'
// import { motion } from 'framer-motion'
// import { useAuth } from '../../widget/AuthContext'
// import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal'
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
// import HumanWidget from '../HumanWidget/HumanWidget'
// import AuthNoticeWidget from '../AuthNoticeWidget/AuthNoticeWidget'
// import CartWidget from '../cartWidget/CartWidget'

// interface Node {
// 	id: number
// 	parentId: number | null
// 	level: number
// 	visible: boolean
// }

// const GenealogyTree: React.FC = () => {
// 	// const [isSidebarOpen, setIsSidebarOpen] = useState(false)
// 	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
// 	const [sidebarParentNode, setSidebarParentNode] = useState<Node | null>(null)

// 	const { currentUser } = useAuth()
// 	const [nodes, setNodes] = useState<Node[]>([
// 		{ id: 0, parentId: null, level: 0, visible: true },
// 	])
// 	const [nextId, setNextId] = useState(1)
// 	const [scale, setScale] = useState(1)
// 	const [showAuthNotice, setShowAuthNotice] = useState(false)

// 	const [activeNode, setActiveNode] = useState<number | null>(null)
// 	const [showAddButtonFor, setShowAddButtonFor] = useState<number | null>(null)
// 	const [loginTargetNode, setLoginTargetNode] = useState<number | null>(null)
// 	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
// 	const containerRef = useRef<HTMLDivElement>(null)
// 	const [authNoticeOpen, setAuthNoticeOpen] = useState(false)
// 	const [authNoticeTargetNode, setAuthNoticeTargetNode] = useState<Node | null>(
// 		null
// 	)

// 	const [lines, setLines] = useState<
// 		{ x1: number; y1: number; x2: number; y2: number }[]
// 	>([])

// 	const animatingNodes = useRef(0)

// 	const [selectedPerson, setSelectedPerson] = useState<Node | null>(null)
// 	const [showCartWidget, setShowCartWidget] = useState(false)

// 	const handleShowPersonInfo = (node: Node) => {
// 		setSelectedPerson(node)
// 		setShowCartWidget(true)
// 	}

// 	const addNode = (parentId: number) => {
// 		const parentNode = nodes.find(node => node.id === parentId)
// 		if (!parentNode) return

// 		const newId = nextId

// 		const newNode: Node = {
// 			id: newId,
// 			parentId,
// 			level: parentNode.level + 1,
// 			visible: true,
// 		}

// 		setNodes(prev => [...prev, newNode])
// 		setNextId(prev => prev + 1)
// 		setActiveNode(newId)
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

// 			animatingNodes.current = prevNodes.filter(
// 				n => n.parentId === nodeId
// 			).length

// 			return updateVisibility(prevNodes, nodeId, shouldShow)
// 		})
// 	}

// 	const groupNodesByLevel = () => {
// 		const grouped: { [level: number]: Node[] } = {}
// 		nodes.forEach(node => {
// 			if (!node.visible) return
// 			if (!grouped[node.level]) grouped[node.level] = []
// 			grouped[node.level].push(node)
// 		})

// 		return grouped
// 	}

// 	const countDescendants = (nodeId: number, arr: Node[]): number =>
// 		arr.filter(n => n.parentId === nodeId && n.visible).length

// 	useEffect(() => {
// 		const container = containerRef.current
// 		if (!container) return

// 		const nodeElements = container.querySelectorAll('[data-node-id]')
// 		const nodePositions: { [id: string]: DOMRect } = {}

// 		nodeElements.forEach(el => {
// 			const id = el.getAttribute('data-node-id')
// 			if (id) {
// 				const rect = el.getBoundingClientRect()
// 				if (rect.width > 0 && rect.height > 0) {
// 					nodePositions[id] = rect
// 				}
// 			}
// 		})

// 		const containerRect = container.getBoundingClientRect()

// 		const newLines: { x1: number; y1: number; x2: number; y2: number }[] = []

// 		nodes.forEach(node => {
// 			if (node.parentId === null || !node.visible) return

// 			const parentRect = nodePositions[node.parentId.toString()]
// 			const childRect = nodePositions[node.id.toString()]

// 			if (parentRect && childRect) {
// 				const x1 = (parentRect.right - containerRect.left) / scale
// 				const y1 =
// 					(parentRect.top + parentRect.height / 2 - containerRect.top) / scale
// 				const x2 = (childRect.left - containerRect.left) / scale
// 				const y2 =
// 					(childRect.top + childRect.height / 2 - containerRect.top) / scale
// 				newLines.push({ x1, y1, x2, y2 })
// 			}
// 		})

// 		setLines(newLines)
// 	}, [nodes, scale])

// 	useEffect(() => {
// 		if (activeNode === null) return
// 		const container = containerRef.current
// 		if (!container) return

// 		const nodeElement = container.querySelector(
// 			`[data-node-id="${activeNode}"]`
// 		) as HTMLElement | null
// 		if (!nodeElement) return

// 		const containerRect = container.getBoundingClientRect()
// 		const nodeRect = nodeElement.getBoundingClientRect()

// 		const offsetLeft = nodeRect.left - containerRect.left + container.scrollLeft
// 		const offsetTop = nodeRect.top - containerRect.top + container.scrollTop

// 		const scrollLeft =
// 			offsetLeft - container.clientWidth / 2 + nodeElement.clientWidth / 2
// 		const scrollTop =
// 			offsetTop - container.clientHeight / 2 + nodeElement.clientHeight / 2

// 		container.scrollTo({
// 			left: scrollLeft,
// 			top: scrollTop,
// 			behavior: 'smooth',
// 		})
// 	}, [activeNode])

// 	const groupedNodes = groupNodesByLevel()

// 	const handleLoginSuccess = () => {
// 		setIsLoginModalOpen(false)
// 		if (loginTargetNode !== null) {
// 			addNode(loginTargetNode)
// 			setLoginTargetNode(null)
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

// 						<TransformComponent wrapperClass={styles.zoomWrapper}>
// 							<div className={styles.treeContainer} ref={containerRef}>
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
// 												transition={{ duration: 0.4, ease: 'easeInOut' }}
// 											/>
// 										)
// 									})}
// 								</svg>

// 								{Object.keys(groupedNodes)
// 									.sort((a, b) => parseInt(a) - parseInt(b))
// 									.map(level => (
// 										<div key={level} className={styles.level}>
// 											{groupedNodes[parseInt(level)].map(node => (
// 												<div key={node.id} className={styles.nodeWrapper}>
// 													<div
// 														className={`${styles.node} ${
// 															!node.visible ? styles.nodeHidden : ''
// 														} ${
// 															activeNode === node.id && node.visible
// 																? styles.active
// 																: ''
// 														}`}
// 														data-node-id={node.id}
// 														onClick={() => toggleVisibility(node.id)}
// 													>
// 														<div className={styles.imageWrapper}>
// 															<img
// 																src='https://gen.kg/media/requests/solnce.svg'
// 																alt='avatar'
// 															/>
// 														</div>
// 														<div className={styles.content}>
// 															{node.id === 0
// 																? 'Долон бий'
// 																: `Человек ${node.id + 0}`}
// 														</div>
// 														<div className={styles.childrenCount}>
// 															{countDescendants(node.id, nodes)}
// 														</div>
// 													</div>

// 													<button
// 														className={`${styles.addChildButton} ${
// 															showAddButtonFor === node.id ? styles.visible : ''
// 														}`}
// 														onClick={e => {
// 															e.stopPropagation()
// 															if (currentUser) {
// 																const target = nodes.find(n => n.id === node.id)
// 																if (target) {
// 																	setSidebarParentNode(target)
// 																	setIsSidebarOpen(true)
// 																}
// 															} else {
// 																const target = nodes.find(n => n.id === node.id)
// 																if (target) {
// 																	setAuthNoticeTargetNode(target)
// 																	setAuthNoticeOpen(true)
// 																}
// 															}
// 														}}
// 														title='Добавить потомка'
// 													>
// 														+
// 													</button>
// 												</div>
// 											))}
// 										</div>
// 									))}
// 							</div>
// 						</TransformComponent>
// 					</>
// 				)}
// 			</TransformWrapper>

// 			{isLoginModalOpen && (
// 				<LoginWidgetModal
// 					isOpen={isLoginModalOpen}
// 					onClose={() => {
// 						setIsLoginModalOpen(false)
// 						setLoginTargetNode(null)
// 					}}
// 					onLoginSuccess={handleLoginSuccess}
// 				/>
// 			)}
// 			{authNoticeTargetNode && (
// 				<AuthNoticeWidget
// 					isOpen={authNoticeOpen}
// 					onClose={() => setAuthNoticeOpen(false)}
// 					onLoginClick={() => {
// 						setAuthNoticeOpen(false)
// 						setIsLoginModalOpen(true)
// 					}}
// 					personName={
// 						authNoticeTargetNode.id === 0
// 							? 'Долон бий'
// 							: `Человек ${authNoticeTargetNode.id}`
// 					}
// 				/>
// 			)}
// 			<HumanWidget
// 				isOpen={isSidebarOpen}
// 				onClose={() => setIsSidebarOpen(false)}
// 				onSubmit={(name, description) => {
// 					if (sidebarParentNode) {
// 						addNode(sidebarParentNode.id)
// 						console.log('Добавлен потомок:', name, description)
// 						setIsSidebarOpen(false)
// 						setSidebarParentNode(null)
// 					}
// 				}}
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
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import HumanWidget from '../HumanWidget/HumanWidget'
import AuthNoticeWidget from '../AuthNoticeWidget/AuthNoticeWidget'

interface Node {
	id: number
	parentId: number | null
	level: number
	visible: boolean
	name: string
	description?: string
}

interface Person {
	id: number
	name: string
	description?: string
	count?: number
}

interface NodeProps {
	person: Person
	isActive: boolean
	onActivate: (id: number) => void
	onShowCart: (person: Person) => void
	onDelete: (id: number) => void
}
const GenealogyTree: React.FC = () => {
	const { currentUser } = useAuth()

	const [nodes, setNodes] = useState<Node[]>([
		{ id: 0, parentId: null, level: 0, visible: true, name: 'Долон бий' },
	])
	const [nextId, setNextId] = useState(1)
	const [scale, setScale] = useState(1)
	const [activeNode, setActiveNode] = useState<number | null>(null)
	const [showAddButtonFor, setShowAddButtonFor] = useState<number | null>(null)
	const [loginTargetNode, setLoginTargetNode] = useState<number | null>(null)
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const [authNoticeOpen, setAuthNoticeOpen] = useState(false)
	const [authNoticeTargetNode, setAuthNoticeTargetNode] = useState<Node | null>(
		null
	)

	const [lines, setLines] = useState<
		{ x1: number; y1: number; x2: number; y2: number }[]
	>([])

	const [sidebarParentNode, setSidebarParentNode] = useState<Node | null>(null)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const addNode = (parentId: number, name: string, description?: string) => {
		const parentNode = nodes.find(node => node.id === parentId)
		if (!parentNode) return

		const newId = nextId

		const newNode: Node = {
			id: newId,
			parentId,
			level: parentNode.level + 1,
			visible: true,
			name,
			description,
		}

		setNodes(prev => [...prev, newNode])
		setNextId(prev => prev + 1)
		setActiveNode(newId)
	}

	const nodeHasVisibleChildren = (id: number, nodeArray: Node[]) =>
		nodeArray.some(n => n.parentId === id && n.visible)

	const toggleVisibility = (nodeId: number) => {
		setActiveNode(prev => (prev === nodeId ? null : nodeId))
		setShowAddButtonFor(prev => (prev === nodeId ? null : nodeId))

		setNodes(prevNodes => {
			const shouldShow = !nodeHasVisibleChildren(nodeId, prevNodes)

			const updateVisibility = (
				nodes: Node[],
				parentId: number,
				visible: boolean
			): Node[] => {
				let updatedNodes = [...nodes]
				const directChildren = updatedNodes.filter(n => n.parentId === parentId)

				for (const child of directChildren) {
					updatedNodes = updatedNodes.map(n =>
						n.id === child.id ? { ...n, visible } : n
					)
					updatedNodes = updateVisibility(updatedNodes, child.id, visible)
				}

				return updatedNodes
			}

			return updateVisibility(prevNodes, nodeId, shouldShow)
		})
	}

	const groupNodesByLevel = () => {
		const grouped: { [level: number]: Node[] } = {}
		nodes.forEach(node => {
			if (!node.visible) return
			if (!grouped[node.level]) grouped[node.level] = []
			grouped[node.level].push(node)
		})

		return grouped
	}

	const countDescendants = (nodeId: number, arr: Node[]): number =>
		arr.filter(n => n.parentId === nodeId && n.visible).length

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const nodeElements = container.querySelectorAll('[data-node-id]')
		const nodePositions: { [id: string]: DOMRect } = {}

		nodeElements.forEach(el => {
			const id = el.getAttribute('data-node-id')
			if (id) {
				const rect = el.getBoundingClientRect()
				if (rect.width > 0 && rect.height > 0) {
					nodePositions[id] = rect
				}
			}
		})

		const containerRect = container.getBoundingClientRect()

		const newLines: { x1: number; y1: number; x2: number; y2: number }[] = []

		nodes.forEach(node => {
			if (node.parentId === null || !node.visible) return

			const parentRect = nodePositions[node.parentId.toString()]
			const childRect = nodePositions[node.id.toString()]

			if (parentRect && childRect) {
				const x1 = (parentRect.right - containerRect.left) / scale
				const y1 =
					(parentRect.top + parentRect.height / 2 - containerRect.top) / scale
				const x2 = (childRect.left - containerRect.left) / scale
				const y2 =
					(childRect.top + childRect.height / 2 - containerRect.top) / scale
				newLines.push({ x1, y1, x2, y2 })
			}
		})

		setLines(newLines)
	}, [nodes, scale])

	useEffect(() => {
		if (activeNode === null) return
		const container = containerRef.current
		if (!container) return

		const nodeElement = container.querySelector(
			`[data-node-id="${activeNode}"]`
		) as HTMLElement | null
		if (!nodeElement) return

		const containerRect = container.getBoundingClientRect()
		const nodeRect = nodeElement.getBoundingClientRect()

		const offsetLeft = nodeRect.left - containerRect.left + container.scrollLeft
		const offsetTop = nodeRect.top - containerRect.top + container.scrollTop

		const scrollLeft =
			offsetLeft - container.clientWidth / 2 + nodeElement.clientWidth / 2
		const scrollTop =
			offsetTop - container.clientHeight / 2 + nodeElement.clientHeight / 2

		container.scrollTo({
			left: scrollLeft,
			top: scrollTop,
			behavior: 'smooth',
		})
	}, [activeNode])

	const groupedNodes = groupNodesByLevel()

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

	return (
		<>
			<TransformWrapper
				initialScale={1}
				minScale={0.5}
				maxScale={2}
				wheel={{ step: 0.1 }}
				doubleClick={{ disabled: true }}
				panning={{ disabled: false, velocityDisabled: true }}
				limitToBounds={false}
				onZoom={({ state }) => setScale(state.scale)}
			>
				{({ zoomIn, zoomOut, resetTransform }) => (
					<>
						<div className={styles.controls}>
							<button onClick={() => zoomIn()}>+</button>
							<button onClick={() => zoomOut()}>-</button>
							<button onClick={() => resetTransform()}>Сброс</button>
						</div>

						<TransformComponent wrapperClass={styles.zoomWrapper}>
							<div className={styles.treeContainer} ref={containerRef}>
								<svg className={styles.linesSvg}>
									{lines.map((line, idx) => {
										const { x1, y1, x2, y2 } = line
										const pathD = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${
											(x1 + x2) / 2
										} ${y2}, ${x2} ${y2}`

										return (
											<motion.path
												key={idx}
												d={pathD}
												fill='transparent'
												stroke='#333'
												strokeWidth='7'
												strokeLinecap='round'
												initial={{ pathLength: 0 }}
												animate={{ pathLength: 1 }}
												transition={{ duration: 0.4, ease: 'easeInOut' }}
											/>
										)
									})}
								</svg>

								{Object.keys(groupedNodes)
									.sort((a, b) => parseInt(a) - parseInt(b))
									.map(level => (
										<div key={level} className={styles.level}>
											{groupedNodes[parseInt(level)].map(node => (
												<div key={node.id} className={styles.nodeWrapper}>
													<div
														className={`${styles.node} ${
															!node.visible ? styles.nodeHidden : ''
														} ${
															activeNode === node.id && node.visible
																? styles.active
																: ''
														}`}
														data-node-id={node.id}
														onClick={() => toggleVisibility(node.id)}
													>
														<div className={styles.imageWrapper}>
															<img
																src='https://gen.kg/media/requests/solnce.svg'
																alt='avatar'
															/>
														</div>
														<div className={styles.content}>{node.name}</div>
														<div className={styles.childrenCount}>
															{countDescendants(node.id, nodes)}
														</div>
													</div>

													<button
														className={`${styles.addChildButton} ${
															showAddButtonFor === node.id ? styles.visible : ''
														}`}
														onClick={e => {
															e.stopPropagation()
															if (currentUser) {
																const target = nodes.find(n => n.id === node.id)
																if (target) {
																	setSidebarParentNode(target)
																	setIsSidebarOpen(true)
																}
															} else {
																const target = nodes.find(n => n.id === node.id)
																if (target) {
																	setAuthNoticeTargetNode(target)
																	setAuthNoticeOpen(true)
																}
															}
														}}
														title='Добавить потомка'
													>
														+
													</button>
												</div>
											))}
										</div>
									))}
							</div>
						</TransformComponent>
					</>
				)}
			</TransformWrapper>

			{isLoginModalOpen && (
				<LoginWidgetModal
					isOpen={isLoginModalOpen}
					onClose={() => {
						setIsLoginModalOpen(false)
						setLoginTargetNode(null)
					}}
					onLoginSuccess={handleLoginSuccess}
				/>
			)}

			{authNoticeTargetNode && (
				<AuthNoticeWidget
					isOpen={authNoticeOpen}
					onClose={() => setAuthNoticeOpen(false)}
					onLoginClick={() => {
						setAuthNoticeOpen(false)
						setIsLoginModalOpen(true)
					}}
					personName={authNoticeTargetNode.name}
				/>
			)}

			<HumanWidget
				isOpen={isSidebarOpen}
				onClose={() => {
					setIsSidebarOpen(false)
					setSidebarParentNode(null)
				}}
				onSubmit={(name, description) => {
					if (sidebarParentNode) {
						addNode(sidebarParentNode.id, name, description)
						setIsSidebarOpen(false)
						setSidebarParentNode(null)
					}
				}}
			/>
		</>
	)
}

export default GenealogyTree
