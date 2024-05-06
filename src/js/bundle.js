/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../src/js/graph.js":
/*!**************************!*\
  !*** ../src/js/graph.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Graph: () => (/* binding */ Graph),\n/* harmony export */   Node: () => (/* binding */ Node)\n/* harmony export */ });\n\nclass Node {\n    /**\n     * @param {int} name \n     * @param {float} x \n     * @param {float} y \n     */\n    constructor(name, x, y) {\n        this.name = name;\n        this.x = x;\n        this.y = y;\n    }\n}\n\nclass Edge {\n    /**\n     * @param {Node} to \n     * @param {number} weight \n    */\n    constructor(to, weight) {\n        this.to = to;\n        this.weight = weight;\n    }\n}\n\nclass Graph {\n    constructor() {\n        /** @type {Map<Node, Array<Edge>>} */\n        this.edges = new Map();\n    }\n\n    /**\n     * @param {Node} node1\n     * @param {Node} node2\n     */\n    addEdge(node1, node2) {\n        // TODO: prevent duplicate edges\n        if (this.edges.get(node1) === undefined) {\n            this.edges.set(node1, []);\n        }\n        if (this.edges.get(node2) === undefined) {\n            this.edges.set(node2, []);\n        }\n\n        let dist = Math.hypot(node2.x-node1.x, node2.y - node1.y);\n        this.edges.get(node1).push(new Edge(node2, dist));\n        this.edges.get(node2).push(new Edge(node1, dist));\n    }\n\n    /**\n     * @param {number} node1 \n     * @param {number} node2 \n     * @returns {number}\n     */\n    getWeight(node1, node2) {\n\n        for (let e of this.edges.get(node1)) {\n            if (e.to == node2) {\n                return e.weight;\n            }\n        }\n    }\n\n    /**\n     * @returns {IterableIterator<number>}\n     */\n    getNodes() {\n        return this.edges.keys();\n    }\n\n    /**\n     * @param {number} node \n     * @returns {Array<Edge>}\n     */\n    getNeighborEdges(node) {\n        return this.edges.get(node);\n    }\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/graph.js?");

/***/ }),

/***/ "../src/js/index.js":
/*!**************************!*\
  !*** ../src/js/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _metro_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metro.js */ \"../src/js/metro.js\");\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ \"../src/js/map.js\");\n/* harmony import */ var _solve_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solve.js */ \"../src/js/solve.js\");\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', _metro_js__WEBPACK_IMPORTED_MODULE_0__.setup);\n\n// --- TESTING ALGORITHM ---\nconsole.log(\"START\");\nlet start = _map_js__WEBPACK_IMPORTED_MODULE_1__.nodes[0];\nlet visit = [_map_js__WEBPACK_IMPORTED_MODULE_1__.nodes[8], _map_js__WEBPACK_IMPORTED_MODULE_1__.nodes[4], _map_js__WEBPACK_IMPORTED_MODULE_1__.nodes[24], _map_js__WEBPACK_IMPORTED_MODULE_1__.nodes[9]];\nlet path = (0,_solve_js__WEBPACK_IMPORTED_MODULE_2__.FindShortestPathAll)(_map_js__WEBPACK_IMPORTED_MODULE_1__.graph, start, visit);\n\nconsole.log(\"path found:\", path);\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/index.js?");

/***/ }),

/***/ "../src/js/map.js":
/*!************************!*\
  !*** ../src/js/map.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   graph: () => (/* binding */ graph),\n/* harmony export */   nodes: () => (/* binding */ nodes)\n/* harmony export */ });\n/* harmony import */ var _graph_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graph.js */ \"../src/js/graph.js\");\n\n\n// nodes are accessed with indexes (nodes[0] gives first node)\nconst nodes = [\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node( 1, 0.101, 0.069),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node( 2, 0.091, 0.168),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node( 3, 0.179, 0.134),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node( 4, 0.070, 0.412),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node( 5, 0.111, 0.597),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node( 6, 0.179, 0.861),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node( 7, 0.276, 0.564),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node( 8, 0.385, 0.546),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node( 9, 0.401, 0.819),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(10, 0.583, 0.782),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(11, 0.677, 0.935),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(12, 0.822, 0.912),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(13, 0.682, 0.643),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(14, 0.828, 0.611),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(15, 0.684, 0.490),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(16, 0.552, 0.513),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(17, 0.520, 0.240),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(18, 0.364, 0.300),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(19, 0.450, 0.032),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(20, 0.687, 0.087),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(21, 0.653, 0.194),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(22, 0.838, 0.125),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(23, 0.835, 0.273),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(24, 0.833, 0.462),\n    new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(25, 0.958, 0.444),\n];\n\n\n// [node1.num, node2.num]\nconst edges = [\n    [ 1,  2],\n    [ 1,  3],\n    [ 2,  3],\n    [ 2,  4],\n    [ 3, 18],\n    [ 3, 19],\n    [ 4,  5],\n    [ 4, 18],\n    [ 4,  5],\n    [ 5,  6],\n    [ 5,  7],\n    [ 6,  7],\n    [ 6,  9],\n    [ 7,  8],\n    [ 7, 18],\n    [ 8,  9],\n    [ 8, 18],\n    [ 8, 16],\n    [ 9, 10],\n    [10, 11],\n    [10, 13],\n    [10, 16],\n    [11, 12],\n    [11, 13],\n    [12, 14],\n    [12, 25],\n    [13, 14],\n    [13, 15],\n    [14, 24],\n    [15, 16],\n    [15, 24],\n    [15, 23],\n    [16, 17],\n    [16, 21],\n    [17, 18],\n    [17, 21],\n    [18, 19],\n    [19, 20],\n    [20, 21],\n    [21, 22],\n    [22, 23],\n    [23, 25],\n    [23, 24],\n    [24, 25],\n];\n\nconst graph = new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Graph();\n\nfor (let e of edges) {\n    graph.addEdge(nodes[e[0]-1], nodes[e[1]-1]);\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/map.js?");

/***/ }),

/***/ "../src/js/metro.js":
/*!**************************!*\
  !*** ../src/js/metro.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setup: () => (/* binding */ setup)\n/* harmony export */ });\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ \"../src/js/map.js\");\n\n\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\n\nvar gameOver = false;\nvar startNode;\nvar currentNode;\nvar count = 0;\nvar targets = []\nvar visited = []\n\n// set **internal** size for canvas. Can be set in the element in html (or here in js) but not in css.\nconst dispWidth = 1920;\nconst dispHeight = 1080;\n\ncanvas.width = dispWidth;\ncanvas.height = dispHeight;\n\n\nfunction setup() {\n    document.getElementById(\"count\").innerHTML = \"Hämta sopor i alla blåa noder och ta dig sedan tillbaka till sopstation längst upp till vänster\";\n    \n    generateMap()\n    initialDraw()\n    generateGarbage(3)\n\n    canvas.addEventListener('click', function(e) {\n        if (gameOver) {\n            return\n        }\n        const rect = canvas.getBoundingClientRect();\n        const x = e.clientX - rect.left;\n        const y = e.clientY - rect.top;\n        const clickedNode = _map_js__WEBPACK_IMPORTED_MODULE_0__.nodes.find(node => Math.hypot(node.x*dispWidth - x, node.y*dispHeight - y) < 10);\n\n        if (_map_js__WEBPACK_IMPORTED_MODULE_0__.graph.getNeighborEdges(currentNode).find(edge => edge.to == clickedNode)) {\n\n            count++;\n            drawLine(currentNode, clickedNode, '#F00');\n            drawNode(currentNode, '#000')\n            drawNode(clickedNode, '#0F0')\n            currentNode = clickedNode\n            \n            visited[_map_js__WEBPACK_IMPORTED_MODULE_0__.nodes.indexOf(clickedNode)] = true;\n\n            if (currentNode == startNode && garbageCollected()){\n                gameOver = true;\n                document.getElementById(\"count\").innerHTML = \"Du kom tillbaka på \" + count + \" steg! Med alla sopor 😱\"\n            } else {\n                document.getElementById(\"count\").innerHTML = \"Du har åkt \" + count + \" steg\"\n            }\n        }\n        \n\n        console.log(count)\n        \n    });\n}\n\nfunction drawNode(node, color) {\n    ctx.fillStyle = color;\n    ctx.beginPath();\n    ctx.arc(node.x*dispWidth, node.y*dispHeight, 10, 0, Math.PI * 2);\n    ctx.fill();\n}\n\nfunction drawLine(node1, node2, color) {\n    ctx.strokeStyle = color;\n    ctx.lineWidth = 2;\n    ctx.beginPath();\n    ctx.moveTo(node1.x*dispWidth, node1.y*dispHeight);\n    ctx.lineTo(node2.x*dispWidth, node2.y*dispHeight);\n    ctx.stroke();\n}\n\nfunction generateGarbage(amount){\n    for (let i = 0; i < amount; i++) {\n        \n        const randomIndex = Math.floor(Math.random() * (_map_js__WEBPACK_IMPORTED_MODULE_0__.nodes.length - 1) + 1)\n        targets.push(randomIndex);\n        drawNode(_map_js__WEBPACK_IMPORTED_MODULE_0__.nodes[randomIndex], '#00F')\n\n    }\n}\n\nfunction garbageCollected() {\n    for (let i = 0; i < targets.length; i++) {\n        if (visited[targets[i]] == false){\n            return false\n        }\n    }\n    return true\n    \n}\n\nfunction generateMap() {\n    for (let node of _map_js__WEBPACK_IMPORTED_MODULE_0__.nodes) {\n        drawNode(node, '#0003');\n    }\n    startNode = _map_js__WEBPACK_IMPORTED_MODULE_0__.nodes[0];\n    visited = new Array(_map_js__WEBPACK_IMPORTED_MODULE_0__.nodes.length)\n}\n\nfunction initialDraw() {\n\n    drawNode(startNode, '#0F0')\n    currentNode = startNode;\n\n    for (let i = 0; i < visited.length; i++) {\n        visited[i] = false;\n    }\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/metro.js?");

/***/ }),

/***/ "../src/js/solve.js":
/*!**************************!*\
  !*** ../src/js/solve.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FindShortestPathAll: () => (/* binding */ FindShortestPathAll)\n/* harmony export */ });\n\nclass Path {\n    constructor() {\n        this.cost = 0;\n        this.nodes = [];\n    }\n}\n\n/**\n * Include all nodes in `nodes` when finding path.\n * Automatically adds `startNode` as end node.\n * @param {Node} startNode \n * @param {Array<number>} unvisited \n */\nfunction FindShortestPathAll(graph, startNode, unvisited) {\n\n    let pathCombined = new Path();\n    pathCombined.nodes.push(startNode);\n\n    let from = startNode;\n\n    while (unvisited.length > 0) {\n        \n        let lastPath = null;\n\n        for (let node of unvisited) {\n    \n            let path = FindShortestPathBetween(graph, from, node);\n\n            if (lastPath === null || path.cost < lastPath.cost) {\n                lastPath = path;\n            }\n        }\n\n        from = lastPath.nodes[lastPath.nodes.length-1];\n\n        unvisited = unvisited.filter(unvNode => !lastPath.nodes.includes(unvNode));\n\n        // don't append first node (was appended last iteration)\n        pathCombined.nodes.push(...lastPath.nodes.slice(1));\n        pathCombined.cost += lastPath.cost;\n    }\n\n    // connect back to startNode\n    from = pathCombined.nodes[pathCombined.nodes.length-1];\n    let path = FindShortestPathBetween(graph, from, startNode);\n\n    pathCombined.nodes.push(...path.nodes.slice(1));\n    pathCombined.cost += path.cost;\n\n    return pathCombined;\n}\n\n/**\n * Dijkstra's algorithm: find shortest path between nodes in weighted, directed graph.\n * (pseudo code at: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)\n * @returns {Path}\n */\nfunction FindShortestPathBetween(graph, startNode, endNode) {\n\n    // setup\n    let distanceTo = new Map();\n    let parentOf = new Map();\n    let queue = [];\n\n    for (let v of graph.getNodes()) {\n        distanceTo.set(v, Infinity);\n        parentOf.set(v, -1);\n        queue.push(v);\n    }\n    distanceTo.set(startNode, 0);\n\n    // Dijkstra\n    while (queue.length > 0) {\n\n        // get min dist node\n        let u = null;\n        let minDist = Infinity;\n\n        for (let [node, dist] of distanceTo.entries()) {\n            if (dist < minDist && queue.includes(node)) {\n                u = node;\n                minDist = dist;\n            }\n        }\n\n        // break early if possible, since we don't need the min distance to all nodes\n        if (u == endNode) {\n            break;\n        }\n\n        // remove from queue\n        let idx = queue.indexOf(u);\n        queue.splice(idx, 1);\n\n        // update min dist\n        for (let edge of graph.getNeighborEdges(u)) {\n            let v = edge.to;\n            let alt = distanceTo.get(u) + edge.weight;\n            if (alt < distanceTo.get(v)) {\n                distanceTo.set(v, alt);\n                parentOf.set(v, u);\n            }\n        }\n    }\n\n    // build path in reverse\n    let path = new Path();\n    let u = endNode;\n\n    while (true) {\n        path.nodes.unshift(u);\n        if (parentOf.get(u) == -1) {\n            break;\n        }\n        path.cost += graph.getWeight(parentOf.get(u), u);\n        u = parentOf.get(u);\n    }\n\n    return path;\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/solve.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("../src/js/index.js");
/******/ 	
/******/ })()
;