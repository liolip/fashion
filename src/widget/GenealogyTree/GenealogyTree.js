import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import styles from './style.module.scss';
const GenealogyTree = () => {
    const [nodes, setNodes] = useState([
        { id: 0, parentId: null, level: 0, visible: true },
    ]);
    const [nextId, setNextId] = useState(1);
    const containerRef = useRef(null);
    const [lines, setLines] = useState([]);
    const addNode = (parentId) => {
        const parentNode = nodes.find(node => node.id === parentId);
        if (!parentNode)
            return;
        const newNode = {
            id: nextId,
            parentId,
            level: parentNode.level + 1,
            visible: true,
        };
        setNodes(prev => [...prev, newNode]);
        setNextId(prevId => prevId + 1);
    };
    const toggleVisibility = (nodeId) => {
        setNodes(prevNodes => {
            const hasVisibleChild = prevNodes.some(n => n.parentId === nodeId && n.visible);
            const recursivelyToggle = (arr, id, vis) => {
                return arr.map(n => {
                    if (n.parentId === id) {
                        const updated = { ...n, visible: vis };
                        return (recursivelyToggle(arr, n.id, vis).find(x => x.id === n.id) ||
                            updated);
                    }
                    return n;
                });
            };
            const newNodes = recursivelyToggle(prevNodes, nodeId, !hasVisibleChild);
            return newNodes;
        });
    };
    const groupNodesByLevel = () => {
        const grouped = {};
        nodes.forEach(node => {
            if (!grouped[node.level]) {
                grouped[node.level] = [];
            }
            grouped[node.level].push(node);
        });
        return grouped;
    };
    const countDescendants = (nodeId, arr) => {
        let count = 0;
        arr.forEach(n => {
            if (n.parentId === nodeId) {
                count += 1 + countDescendants(n.id, arr);
            }
        });
        return count;
    };
    useEffect(() => {
        if (!containerRef.current)
            return;
        const nodeElements = containerRef.current.querySelectorAll('[data-node-id]');
        const nodePositions = {};
        nodeElements.forEach(el => {
            const id = el.getAttribute('data-node-id');
            if (id) {
                nodePositions[id] = el.getBoundingClientRect();
            }
        });
        const containerRect = containerRef.current.getBoundingClientRect();
        const newLines = [];
        nodes.forEach(node => {
            if (node.parentId === null)
                return;
            if (!node.visible)
                return;
            const parentRect = nodePositions[node.parentId.toString()];
            const childRect = nodePositions[node.id.toString()];
            if (parentRect && childRect) {
                newLines.push({
                    x1: parentRect.left + parentRect.width - containerRect.left,
                    y1: parentRect.top + parentRect.height / 2 - containerRect.top,
                    x2: childRect.left - containerRect.left,
                    y2: childRect.top + childRect.height / 2 - containerRect.top,
                });
            }
        });
        setLines(newLines);
    }, [nodes]);
    const groupedNodes = groupNodesByLevel();
    return (_jsxs("div", { className: styles.treeContainer, ref: containerRef, children: [_jsx("svg", { className: styles.linesSvg, children: lines.map((line, idx) => (_jsx("line", { x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2, stroke: '#777', strokeWidth: '4', strokeLinecap: 'round' }, idx))) }), Object.keys(groupedNodes)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map(level => (_jsx("div", { className: styles.level, children: groupedNodes[parseInt(level)].map(node => (_jsxs("div", { className: `${styles.node} ${!node.visible ? styles.nodeHidden : ''}`, "data-node-id": node.id, onClick: () => toggleVisibility(node.id), children: [_jsx("div", { className: styles.imageWrapper, children: _jsx("img", { src: 'https://gen.kg/media/requests/solnce.svg', alt: 'avatar' }) }), _jsxs("div", { className: styles.content, children: ["\u0427\u0435\u043B\u043E\u0432\u0435\u043A ", node.id + 1] }), _jsx("div", { className: styles.descendantsCount, children: countDescendants(node.id, nodes) }), _jsx("button", { className: styles.addChildButton, onClick: e => {
                                e.stopPropagation();
                                addNode(node.id);
                            }, title: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0442\u043E\u043C\u043A\u0430', children: "+" })] }, node.id))) }, level)))] }));
};
export default GenealogyTree;
