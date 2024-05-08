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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Graph: () => (/* binding */ Graph),\n/* harmony export */   Node: () => (/* binding */ Node)\n/* harmony export */ });\n\nclass Node {\n    /**\n     * @param {number} name \n     * @param {number} x \n     * @param {number} y \n     */\n    constructor(name, x, y) {\n        this.name = name;\n        this.x = x;\n        this.y = y;\n    }\n}\n\nclass Edge {\n    /**\n     * @param {Node} to \n     * @param {number} weight \n    */\n    constructor(to, weight) {\n        this.to = to;\n        this.weight = weight;\n    }\n}\n\nclass Graph {\n    constructor() {\n        /** @type {Map<Node, Array<Edge>>} */\n        this.edges = new Map();\n    }\n\n    /**\n     * @param {Node} node1\n     * @param {Node} node2\n     */\n    addEdge(node1, node2) {\n        // TODO: prevent duplicate edges\n        if (this.edges.get(node1) === undefined) {\n            this.edges.set(node1, []);\n        }\n        if (this.edges.get(node2) === undefined) {\n            this.edges.set(node2, []);\n        }\n\n        let dist = Math.hypot(node2.x-node1.x, node2.y - node1.y);\n        this.edges.get(node1).push(new Edge(node2, dist));\n        this.edges.get(node2).push(new Edge(node1, dist));\n    }\n\n    /**\n     * @param {number} node1 \n     * @param {number} node2 \n     * @returns {number}\n     */\n    getWeight(node1, node2) {\n\n        for (let e of this.edges.get(node1)) {\n            if (e.to == node2) {\n                return e.weight;\n            }\n        }\n    }\n\n    /**\n     * @returns {IterableIterator<number>}\n     */\n    getNodes() {\n        return this.edges.keys();\n    }\n\n    /**\n     * @param {number} node \n     * @returns {Array<Edge>}\n     */\n    getNeighborEdges(node) {\n        return this.edges.get(node);\n    }\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/graph.js?");

/***/ }),

/***/ "../src/js/index.js":
/*!**************************!*\
  !*** ../src/js/index.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _resolution_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolution.js */ \"../src/js/resolution.js\");\n/* harmony import */ var _metro_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./metro.js */ \"../src/js/metro.js\");\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ \"../src/js/map.js\");\n\n\n\n// import { FindShortestPathAll } from \"./solve.js\";\n\n\n_resolution_js__WEBPACK_IMPORTED_MODULE_0__.Resolution.setup();     // resolution must be set up first\n_map_js__WEBPACK_IMPORTED_MODULE_2__.GameMap.setup();\n\ndocument.addEventListener('DOMContentLoaded', _metro_js__WEBPACK_IMPORTED_MODULE_1__.setup);\n\n// --- TESTING ALGORITHM ---\n// let start = nodes[0];\n// let visit = [nodes[8], nodes[4], nodes[24], nodes[9]];\n// let path = FindShortestPathAll(graph, start, visit);\n\n// console.log(\"path found:\", path);\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/index.js?");

/***/ }),

/***/ "../src/js/map.js":
/*!************************!*\
  !*** ../src/js/map.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameMap: () => (/* binding */ GameMap)\n/* harmony export */ });\n/* harmony import */ var _graph_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graph.js */ \"../src/js/graph.js\");\n\n\nclass GameMap {\n    \n    static nodes = [];\n    static graph = new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Graph();\n\n    static setup() {\n        \n        // Nodes are accessed with indexes (nodes[0] gives first node).\n        // These positions are based on 1920x1080\n        let nodePos = [\n            [ 1,  195,   70],\n            [ 2,  174,  181],\n            [ 3,  342,  145],\n            [ 4,  128,  450],\n            [ 5,  215,  645],\n            [ 6,  343,  931],\n            [ 7,  527,  613],\n            [ 8,  735,  592],\n            [ 9,  762,  887],\n            [10, 1118,  850],\n            [11, 1294, 1017],\n            [12, 1575,  988],\n            [13, 1307,  689],\n            [14, 1588,  661],\n            [15, 1311,  531],\n            [16, 1053,  558],\n            [17,  994,  265],\n            [18,  698,  324],\n            [19,  863,   32],\n            [20, 1320,   92],\n            [21, 1253,  210],\n            [22, 1605,  135],\n            [23, 1600,  292],\n            [24, 1593,  502],\n            [25, 1847,  474],\n        ];\n\n        // [node1.num, node2.num]\n        let edges = [\n            [ 1,  2],\n            [ 1,  3],\n            [ 2,  3],\n            [ 2,  4],\n            [ 3, 18],\n            [ 3, 19],\n            [ 4,  5],\n            [ 4, 18],\n            [ 4,  5],\n            [ 5,  6],\n            [ 5,  7],\n            [ 6,  7],\n            [ 6,  9],\n            [ 7,  8],\n            [ 7, 18],\n            [ 8,  9],\n            [ 8, 18],\n            [ 8, 16],\n            [ 9, 10],\n            [10, 11],\n            [10, 13],\n            [10, 16],\n            [11, 12],\n            [11, 13],\n            [12, 14],\n            [12, 25],\n            [13, 14],\n            [13, 15],\n            [14, 24],\n            [15, 16],\n            [15, 24],\n            [15, 23],\n            [16, 17],\n            [16, 21],\n            [17, 18],\n            [17, 21],\n            [18, 19],\n            [19, 20],\n            [20, 21],\n            [21, 22],\n            [22, 23],\n            [23, 25],\n            [23, 24],\n            [24, 25],\n        ];\n\n        const w = document.getElementById(\"canvas\").width;\n        const h = document.getElementById(\"canvas\").height;\n\n        for (let [i, x, y] of nodePos) {\n            x *= (w/1920);\n            y *= (h/1080);\n            this.nodes.push(new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(i, x, y));\n        }\n\n        for (let e of edges) {\n            this.graph.addEdge(this.nodes[e[0]-1], this.nodes[e[1]-1]);\n        }\n    }\n\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/map.js?");

/***/ }),

/***/ "../src/js/metro.js":
/*!**************************!*\
  !*** ../src/js/metro.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setup: () => (/* binding */ setup)\n/* harmony export */ });\n/* harmony import */ var _resolution_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolution.js */ \"../src/js/resolution.js\");\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ \"../src/js/map.js\");\n\n\n\n\n\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\n\nvar gameOver = false;\nvar startNode;\nvar currentNode;\nvar count = 0;\nvar targets = []\nvar visited = []\n\n\nfunction setup() {\n    document.getElementById(\"count\").innerHTML = \"Hämta sopor i alla blåa noder och ta dig sedan tillbaka till sopstation längst upp till vänster\";\n    \n    generateMap()\n    initialDraw()\n    generateGarbage(3)\n\n    canvas.addEventListener('click', function(e) {\n        if (gameOver) {\n            return\n        }\n        const rect = canvas.getBoundingClientRect();\n        const x = e.clientX - rect.left;\n        const y = e.clientY - rect.top;\n        const clickedNode = _map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes.find(node => Math.hypot(node.x - x, node.y - y) < _resolution_js__WEBPACK_IMPORTED_MODULE_0__.Resolution.circleRadius);\n\n        if (_map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.graph.getNeighborEdges(currentNode).find(edge => edge.to == clickedNode)) {\n\n            count += _map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.graph.getWeight(currentNode, clickedNode) * _resolution_js__WEBPACK_IMPORTED_MODULE_0__.Resolution.SCALE;\n            drawLine(currentNode, clickedNode, '#F00');\n            drawNode(currentNode, '#000')\n            drawNode(clickedNode, '#0F0')\n            currentNode = clickedNode\n            \n            visited[_map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes.indexOf(clickedNode)] = true;\n\n            if (currentNode == startNode && garbageCollected()){\n                gameOver = true;\n                document.getElementById(\"count\").innerHTML = \"Du kom tillbaka på \" + parseInt(count) + \" meter! Med alla sopor 😱\"\n            } else {\n                document.getElementById(\"count\").innerHTML = \"Du har åkt \" + parseInt(count) + \" meter\"\n            }\n        }\n        \n\n        console.log(count)\n\n    });\n}\n\nfunction drawNode(node, color) {\n    ctx.fillStyle = color;\n    ctx.beginPath();\n    ctx.arc(node.x, node.y, _resolution_js__WEBPACK_IMPORTED_MODULE_0__.Resolution.circleRadius, 0, Math.PI * 2);\n    ctx.fill();\n}\n\nfunction drawLine(node1, node2, color) {\n    ctx.strokeStyle = color;\n    ctx.lineWidth = 2;\n    ctx.beginPath();\n    ctx.moveTo(node1.x, node1.y);\n    ctx.lineTo(node2.x, node2.y);\n    ctx.stroke();\n}\n\nfunction generateGarbage(amount) {\n    \n    for (let i = 0; i < amount; i++) {\n        \n        const randomIndex = Math.floor(Math.random() * (_map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes.length - 1) + 1)\n        targets.push(randomIndex);\n        drawNode(_map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes[randomIndex], '#00F')\n\n    }\n}\n\nfunction garbageCollected() {\n    for (let i = 0; i < targets.length; i++) {\n        if (visited[targets[i]] == false){\n            return false\n        }\n    }\n    return true\n    \n}\n\nfunction generateMap() {\n\n    for (let node of _map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes) {\n        drawNode(node, '#0003');\n    }\n    startNode = _map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes[0];\n    visited = new Array(_map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes.length)\n}\n\nfunction initialDraw() {\n\n    drawNode(startNode, '#0F0')\n    currentNode = startNode;\n\n    for (let i = 0; i < visited.length; i++) {\n        visited[i] = false;\n    }\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/metro.js?");

/***/ }),

/***/ "../src/js/resolution.js":
/*!*******************************!*\
  !*** ../src/js/resolution.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Resolution: () => (/* binding */ Resolution)\n/* harmony export */ });\n\nclass Resolution {\n\n    static DESIRED_WIDTH = 1920;\n    static DESIRED_HEIGHT = 1080;\n\n    static SCALE;       // used for scaling images and props on the game map\n    \n    // style variables for 1920x1080 (scales automatically)\n    static canvasMargin = 0.1;      // percent\n    static circleRadius = 10;\n\n    static setup() {  \n        \n        const canvas = document.getElementById(\"canvas\");\n       \n        let desiredRatio = this.DESIRED_WIDTH / this.DESIRED_HEIGHT;\n        \n        let winW = window.innerWidth;\n        let winH = window.innerHeight;\n        \n        let winRatio = winW / winH;\n        \n        let w, h;\n        if (winRatio > desiredRatio) {\n            h = winH;\n            w = winH * desiredRatio;     // screen is wider: height constrains svg size\n        }\n        else {\n            w = winW;\n            h = winW / desiredRatio;       // screen is taller/same aspect ratio: width constrains svg size\n        }\n\n        this.SCALE = this.DESIRED_WIDTH / w;\n\n        // set sizes based on potential new ratio\n        this.circleRadius = (this.circleRadius/this.DESIRED_WIDTH) * w;\n\n        // set **internal** size for canvas. Can be set in the element in html (or here in js) but not in css.\n        canvas.width = w * (1-this.canvasMargin);\n        canvas.height = h * (1-this.canvasMargin);\n    }\n\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/resolution.js?");

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