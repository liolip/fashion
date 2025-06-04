import React, { useState, useRef, useEffect } from 'react'
import styles from './style.module.scss'

interface Node {
	id: number
	parentId: number | null
	level: number
	visible: boolean
}

const GenealogyTree: React.FC = () => {
	const [nodes, setNodes] = useState<Node[]>([
		{ id: 0, parentId: null, level: 0, visible: true },
	])
	const [nextId, setNextId] = useState(1)
	const containerRef = useRef<HTMLDivElement>(null)
	const [lines, setLines] = useState<
		{ x1: number; y1: number; x2: number; y2: number }[]
	>([])

	const addNode = (parentId: number) => {
		const parentNode = nodes.find(node => node.id === parentId)
		if (!parentNode) return

		const newNode = {
			id: nextId,
			parentId,
			level: parentNode.level + 1,
			visible: true,
		}

		setNodes(prev => [...prev, newNode])
		setNextId(prevId => prevId + 1)
	}

	const toggleVisibility = (nodeId: number) => {
		setNodes(prevNodes => {
			const hasVisibleChild = prevNodes.some(
				n => n.parentId === nodeId && n.visible
			)

			const recursivelyToggle = (
				arr: Node[],
				id: number,
				vis: boolean
			): Node[] => {
				return arr.map(n => {
					if (n.parentId === id) {
						const updated = { ...n, visible: vis }
						return (
							recursivelyToggle(arr, n.id, vis).find(x => x.id === n.id) ||
							updated
						)
					}
					return n
				})
			}

			const newNodes = recursivelyToggle(prevNodes, nodeId, !hasVisibleChild)
			return newNodes
		})
	}

	const groupNodesByLevel = () => {
		const grouped: { [level: number]: Node[] } = {}
		nodes.forEach(node => {
			if (!grouped[node.level]) {
				grouped[node.level] = []
			}
			grouped[node.level].push(node)
		})
		return grouped
	}

	const countDescendants = (nodeId: number, arr: Node[]): number => {
		let count = 0
		arr.forEach(n => {
			if (n.parentId === nodeId) {
				count += 1 + countDescendants(n.id, arr)
			}
		})
		return count
	}

	useEffect(() => {
		if (!containerRef.current) return

		const nodeElements = containerRef.current.querySelectorAll('[data-node-id]')
		const nodePositions: { [id: string]: DOMRect } = {}

		nodeElements.forEach(el => {
			const id = el.getAttribute('data-node-id')
			if (id) {
				nodePositions[id] = el.getBoundingClientRect()
			}
		})

		const containerRect = containerRef.current.getBoundingClientRect()
		const newLines: { x1: number; y1: number; x2: number; y2: number }[] = []

		nodes.forEach(node => {
			if (node.parentId === null) return
			if (!node.visible) return

			const parentRect = nodePositions[node.parentId.toString()]
			const childRect = nodePositions[node.id.toString()]

			if (parentRect && childRect) {
				newLines.push({
					x1: parentRect.left + parentRect.width - containerRect.left,
					y1: parentRect.top + parentRect.height / 2 - containerRect.top,
					x2: childRect.left - containerRect.left,
					y2: childRect.top + childRect.height / 2 - containerRect.top,
				})
			}
		})

		setLines(newLines)
	}, [nodes])

	const groupedNodes = groupNodesByLevel()

	return (
		<div className={styles.treeContainer} ref={containerRef}>
			<svg className={styles.linesSvg}>
				{lines.map((line, idx) => (
					<line
						key={idx}
						x1={line.x1}
						y1={line.y1}
						x2={line.x2}
						y2={line.y2}
						stroke='#777'
						strokeWidth='4'
						strokeLinecap='round'
					/>
				))}
			</svg>

			{Object.keys(groupedNodes)
				.sort((a, b) => parseInt(a) - parseInt(b))
				.map(level => (
					<div key={level} className={styles.level}>
						{groupedNodes[parseInt(level)].map(node => (
							<div
								key={node.id}
								className={`${styles.node} ${
									!node.visible ? styles.nodeHidden : ''
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
								<div className={styles.content}>Человек {node.id + 1}</div>

								<div className={styles.descendantsCount}>
									{countDescendants(node.id, nodes)}
								</div>

								<button
									className={styles.addChildButton}
									onClick={e => {
										e.stopPropagation()
										addNode(node.id)
									}}
									title='Добавить потомка'
								>
									+ff
								</button>
							</div>
						))}
					</div>
				))}
		</div>
	)
}

export default GenealogyTree
