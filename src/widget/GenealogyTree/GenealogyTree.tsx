import React, { useState, useRef, useEffect } from 'react'
import styles from './style.module.scss'
import { motion } from 'framer-motion'
import { useAuth } from '../../widget/AuthContext'
import LoginWidgetModal from '../../widget/loginWidgetModal/LoginWidgetModal'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import HumanWidget from '../HumanWidget/HumanWidget'
import AuthNoticeWidget from '../AuthNoticeWidget/AuthNoticeWidget'
import CartWidget from '../cartWidget/CartWidget'
import ButtonWidget from '../buttonWidget/ButtonWidget'
import { useTreeStore } from '../../store/useTreeStore'

interface Node {
	id: number
	parentId: number | null
	level: number
	visible: boolean
	name: string
	description?: string
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
	const [nodes, setNodes] = useState<Node[]>([
		{
			id: 0,
			parentId: null,
			level: 0,
			visible: true,
			name: 'Долон бий',
			description:
				'У кыргызов роды делятся на два крыла: правое и левое. Вот мы, оказывается, происходим от Долон-бия. До Долон-бия было 11 отцов. Самый последний из них – Кыргызбаем звался. Когда переходили перевал Долон, родился у Кыргызбая Долон-бий. Его жена родила в свое время близнецов, одного она назвала Оң (правый – ред.), сказав, что родила его с помощью правой почки, а другого – Сол (левый – ред.), сказав, что родила мальчика с помощью левой почки. От Оң произошли Адигине, Тагай и Наали – девочка и два мальчика. От Адигине – Солто, Сарыбагыш, Саяк, Бугу. В Таласе от старшего сына Долон-бия Каратала произошли Кушчу и Саруу. От Кушчу – Каратал и Каранай. Нашим призывом до сих пор является “Каратал” и “Каранай”. От Каратала – Жакып. От Жакыпа – Жантай, Эльтай и Кудайменде. От Жантая Каймазар, от которого мы вот произошли. От Эльтая – народ Кыргый произошел, который у истока Каракола расположился. От Кудайменде – племя Сабатар. Вот мы от этих троих сыновей и произошли, остальные дальше идут ветками. У Караная было два сына- Жансейит и Байсейит. От Жансейита пошли Каракушчу, Саркушчу, Кёккушчу, Тазкушчу. От второго – мелкие народы Сакалды, Чейне, Чилжуут и Бочу.',
		},
	])
	const [nextId, setNextId] = useState(1)
	const [scale, setScale] = useState(1)
	const [activeNode, setActiveNode] = useState<number | null>(null)
	const [showAddButtonFor, setShowAddButtonFor] = useState<number | null>(null)
	const [loginTargetNode, setLoginTargetNode] = useState<number | null>(null)
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
	const [authNoticeOpen, setAuthNoticeOpen] = useState(false)
	const [authNoticeTargetNode, setAuthNoticeTargetNode] = useState<Node | null>(
		null
	)
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

	const addNode = (parentId: number, name: string, description = '') => {
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
		setCartPerson({ id: newId.toString(), name, description })
		setIsCartOpen(true)
		setIsSidebarOpen(false)
	}

	const deleteNode = (id: number) => {
		setNodes(prev =>
			prev.filter(node => node.id !== id && node.parentId !== id)
		)
		if (activeNode === id) {
			setActiveNode(null)
			setCartPerson(null)
			setIsCartOpen(false)
		}
	}

	const showCartForNode = (node: Node) => {
		setCartPerson({
			id: node.id.toString(),
			name: node.name,
			description: node.description || '',
		})
		setIsCartOpen(true)
		setIsSidebarOpen(false)
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
		const element = containerRef.current?.querySelector(
			`[data-node-id="${nodeId}"]`
		)
		if (element) {
			const rect = element.getBoundingClientRect()
			setButtonWidgetPosition({ x: rect.right + 10, y: rect.top })
			setStoreActiveNode(nodeId.toString())
			setButtonWidgetVisible(true)
		}
	}

	const groupedNodes = () => {
		const grouped: { [level: number]: Node[] } = {}
		nodes.forEach(node => {
			if (!node.visible) return
			if (!grouped[node.level]) grouped[node.level] = []
			grouped[node.level].push(node)
		})
		return grouped
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
			if (node.parentId === null || !node.visible) return acc
			const parentRect = nodePositions[node.parentId.toString()]
			const childRect = nodePositions[node.id.toString()]
			if (parentRect && childRect) {
				const x1 = (parentRect.right - containerRect.left) / scale
				const y1 =
					(parentRect.top + parentRect.height / 2 - containerRect.top) / scale
				const x2 = (childRect.left - containerRect.left) / scale
				const y2 =
					(childRect.top + childRect.height / 2 - containerRect.top) / scale
				acc.push({ x1, y1, x2, y2 })
			}
			return acc
		}, [] as typeof lines)
		setLines(newLines)
	}, [nodes, scale])

	const countDescendants = (nodeId: number) =>
		nodes.filter(n => n.parentId === nodeId && n.visible).length

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

	// Закрытие всех модалок
	const closeAllModals = () => {
		setIsCartOpen(false)
		setIsSidebarOpen(false)
		setButtonWidgetVisible(false)
		setActiveNode(null)
		setShowAddButtonFor(null)
	}

	// Обработчик клика по фону (контейнеру дерева)
	const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// Чтобы не закрывать модалки при клике по узлам, проверяем, что клик именно по контейнеру
		if (e.target === e.currentTarget) {
			closeAllModals()
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
						<TransformComponent>
							{/* Вешаем обработчик клика именно сюда */}
							<div
								className={styles.treeContainer}
								ref={containerRef}
								onClick={onBackgroundClick}
							>
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
												transition={{ duration: 0.4 }}
											/>
										)
									})}
								</svg>

								{Object.entries(groupedNodes()).map(([level, levelNodes]) => (
									<div key={level} className={styles.level}>
										{levelNodes.map(node => (
											<div key={node.id} className={styles.nodeWrapper}>
												<div
													className={`${styles.node} ${
														!node.visible ? styles.nodeHidden : ''
													} ${activeNode === node.id ? styles.active : ''}`}
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
												<button
													className={`${styles.addChildButton} ${
														showAddButtonFor === node.id ? styles.visible : ''
													}`}
													onClick={e => {
														e.stopPropagation()
														if (currentUser) {
															setSidebarParentNode(node)
															setIsSidebarOpen(true)
															setIsCartOpen(false) // Закрываем CartWidget при открытии HumanWidget
														} else {
															setAuthNoticeTargetNode(node)
															setAuthNoticeOpen(true)
														}
													}}
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
							const node = nodes.find(n => n.id.toString() === activeNodeId)
							if (node) {
								showCartForNode(node)
							}
						}}
						onDeleteClick={() => {
							if (activeNodeId) deleteNode(Number(activeNodeId))
							setButtonWidgetVisible(false)
						}}
					/>
				</div>
			)}

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
					if (sidebarParentNode) {
						try {
							const res = await fetch('http://localhost:5000/api/person', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({ name, description }),
							})

							if (!res.ok) throw new Error('Не удалось сохранить в базу данных')

							const data = await res.json()

							addNode(sidebarParentNode.id, data.name, data.description)

							setIsSidebarOpen(false)
							setSidebarParentNode(null)
						} catch (err) {
							console.error(err)
							alert('Ошибка при сохранении. Попробуйте ещё раз.')
						}
					}
				}}
			/>
			<CartWidget
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				person={cartPerson}
			/>
		</>
	)
}

export default GenealogyTree
