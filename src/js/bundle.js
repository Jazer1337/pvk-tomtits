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

/***/ "../src/js/game.js":
/*!*************************!*\
  !*** ../src/js/game.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _resolution_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolution.js */ \"../src/js/resolution.js\");\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ \"../src/js/map.js\");\n\n\n\n\nclass Game {\n    \n    static canvas = document.getElementById('canvas');\n    static ctx = canvas.getContext('2d');\n\n    static rect;\n\n    static truck;\n\n    static gameOver = false;\n    static startNode;\n    static currentNode;\n    static count = 0;\n    static targets = [];        // list of [node, img]\n    static visited = [];        // list of node indices\n\n    static setup() {\n        \n        Game.rect = Game.canvas.getBoundingClientRect();\n\n        Game.truck = Game.createImg(\"./src/css/garbage_truck.svg\", 150);\n        Game.truck.style.zIndex = 1;                                        // show on top of trash cans\n        Game.moveTruck(_map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes[0]);\n\n        document.getElementById(\"count\").innerHTML = \"Hämta sopor i alla blåa noder och ta dig sedan tillbaka till sopstation längst upp till vänster\";\n        \n        // init game\n        Game.generateMap();\n        Game.initialDraw();\n        Game.generateGarbage(3);\n\n        Game.canvas.addEventListener('click', event => {\n\n            if (Game.gameOver) {\n                return;\n            }\n            \n            const radius = 7 * _resolution_js__WEBPACK_IMPORTED_MODULE_0__.Resolution.circleRadius;     // not necessary to press exactly on the circle (outside is ok)\n            \n            const x = event.clientX - Game.rect.left;\n            const y = event.clientY - Game.rect.top;\n            const clickedNode = _map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes.find(node => Math.hypot(node.x-x, node.y-y) < radius);\n\n            // if neighbor\n            if (_map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.graph.getNeighborEdges(Game.currentNode).find(edge => edge.to == clickedNode)) {\n\n                // visit node\n                Game.count += _map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.graph.getWeight(Game.currentNode, clickedNode) * _resolution_js__WEBPACK_IMPORTED_MODULE_0__.Resolution.SCALE;\n                Game.drawLine(Game.currentNode, clickedNode, '#F00');\n                Game.currentNode = clickedNode;\n\n                Game.moveTruck(clickedNode);\n\n                // empty trash can if first time visiting\n                let wasVisitedBefore = Game.visited[clickedNode.name];\n                Game.visited[clickedNode.name] = true;\n                \n                if (!wasVisitedBefore && Game.visited[clickedNode.name]) {\n                    for (const [node, img] of Game.targets) {\n                        if (node == clickedNode) {\n                            img.src = \"./src/css/trash_empty.svg\";\n                            break;\n                        }\n                    }\n                }\n\n                // update info\n                let str = \"Du har åkt \" + parseInt(Game.count) + \" meter\";\n\n                if (Game.currentNode == Game.startNode && Game.isGarbageCollected()){\n                    Game.gameOver = true;\n                    str = \"Du kom tillbaka på \" + parseInt(Game.count) + \" meter! Med alla sopor 😱\";\n                }\n\n                document.getElementById(\"count\").innerHTML = str;\n            }           \n\n        });\n    }\n\n    static createImg(src, width) {\n        const img = document.createElement(\"img\");\n        document.getElementById(\"canvas-container\").appendChild(img);\n\n        img.src = src;\n        img.style.position = \"absolute\";\n        img.style.width = width / _resolution_js__WEBPACK_IMPORTED_MODULE_0__.Resolution.SCALE + \"px\";\n\n        img.style.height = window.getComputedStyle(img).height;\n\n        img.style.pointerEvents = \"none\";       // ignore events, since they should go to canvas, not this img\n\n        return img;\n    }\n\n    // centers truck on (x,y)\n    static moveTruck(node) {\n        Game.truck.style.left = Game.rect.left + node.x - parseInt(Game.truck.style.width)/2 + \"px\";\n        Game.truck.style.top = Game.rect.top + node.y - parseInt(Game.truck.style.height)/2 + \"px\";\n    }\n\n    static drawNode(node, color) {\n        Game.ctx.fillStyle = color;\n        Game.ctx.beginPath();\n        Game.ctx.arc(node.x, node.y, _resolution_js__WEBPACK_IMPORTED_MODULE_0__.Resolution.circleRadius, 0, Math.PI * 2);\n        Game.ctx.fill();\n    }\n\n    static drawLine(node1, node2, color) {\n        Game.ctx.strokeStyle = color;\n        Game.ctx.lineWidth = 2;\n        Game.ctx.beginPath();\n        Game.ctx.moveTo(node1.x, node1.y);\n        Game.ctx.lineTo(node2.x, node2.y);\n        Game.ctx.stroke();\n    }\n\n    static generateGarbage(amount) {\n        \n        let nodesLeft = [..._map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes];\n\n        for (let i=0; i<amount; i++) {\n            \n            // pick random trash\n            const randIdx = Math.floor(Math.random() * (nodesLeft.length - 1) + 1);\n            const node = nodesLeft.splice(randIdx, 1)[0];\n\n            // create img\n            const img = Game.createImg(\"./src/css/trash_full.svg\", 100);\n            img.style.left = Game.rect.left + node.x - parseInt(img.style.width)/2 + \"px\";\n            img.style.top = Game.rect.top + node.y - parseInt(img.style.height)/2 + \"px\";\n\n            Game.targets.push([node, img]);\n        }\n    }\n\n    static isGarbageCollected() {\n        for (const [node, _] of Game.targets) {\n            if (!Game.visited[node.name]) {\n                console.log(node);\n                console.log(\"not visited\");\n                return false;\n            }\n        }\n        return true;\n    }\n\n    static generateMap() {\n\n        for (let node of _map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes) {\n            Game.drawNode(node, '#0003');\n        }\n        Game.startNode = _map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes[0];\n        Game.visited = new Array(_map_js__WEBPACK_IMPORTED_MODULE_1__.GameMap.nodes.length)\n    }\n\n    static initialDraw() {\n\n        Game.drawNode(Game.startNode, '#0F0')\n        \n        Game.currentNode = Game.startNode;\n\n        for (let i = 0; i < Game.visited.length; i++) {\n            Game.visited[i] = false;\n        }\n    }\n\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/game.js?");

/***/ }),

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _resolution_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolution.js */ \"../src/js/resolution.js\");\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.js */ \"../src/js/game.js\");\n/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ \"../src/js/map.js\");\n\n\n\n// import { FindShortestPathAll } from \"./solve.js\";\n\n\n_resolution_js__WEBPACK_IMPORTED_MODULE_0__.Resolution.setup();     // resolution must be set up first\n_map_js__WEBPACK_IMPORTED_MODULE_2__.GameMap.setup();\n\ndocument.addEventListener('DOMContentLoaded', _game_js__WEBPACK_IMPORTED_MODULE_1__.Game.setup);\n\n// --- TESTING ALGORITHM ---\n// let start = nodes[0];\n// let visit = [nodes[8], nodes[4], nodes[24], nodes[9]];\n// let path = FindShortestPathAll(graph, start, visit);\n\n// console.log(\"path found:\", path);\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/index.js?");

/***/ }),

/***/ "../src/js/map.js":
/*!************************!*\
  !*** ../src/js/map.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameMap: () => (/* binding */ GameMap)\n/* harmony export */ });\n/* harmony import */ var _graph_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graph.js */ \"../src/js/graph.js\");\n\n\nclass GameMap {\n    \n    static nodes = [];\n    static graph = new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Graph();\n\n    static setup() {\n        \n        // Nodes are accessed with indexes (nodes[0] gives first node).\n        // These positions are based on 1920x1080\n        let nodePos = [\n            [ 0,  195,   70],\n            [ 1,  174,  181],\n            [ 2,  342,  145],\n            [ 3,  128,  450],\n            [ 4,  215,  645],\n            [ 5,  343,  931],\n            [ 6,  527,  613],\n            [ 7,  735,  592],\n            [ 8,  762,  887],\n            [ 9, 1118,  850],\n            [10, 1294, 1017],\n            [11, 1575,  988],\n            [12, 1307,  689],\n            [13, 1588,  661],\n            [14, 1311,  531],\n            [15, 1053,  558],\n            [16,  994,  265],\n            [17,  698,  324],\n            [18,  863,   32],\n            [19, 1320,   92],\n            [20, 1253,  210],\n            [21, 1605,  135],\n            [22, 1600,  292],\n            [23, 1593,  502],\n            [24, 1847,  474],\n        ];\n\n        // [node1.num, node2.num]\n        let edges = [\n            [ 0,  1],\n            [ 0,  2],\n            [ 1,  2],\n            [ 1,  3],\n            [ 2, 17],\n            [ 2, 18],\n            [ 3,  4],\n            [ 3, 17],\n            [ 3,  4],\n            [ 4,  5],\n            [ 4,  6],\n            [ 5,  6],\n            [ 5,  8],\n            [ 6,  7],\n            [ 6, 17],\n            [ 7,  8],\n            [ 7, 17],\n            [ 7, 15],\n            [ 8,  9],\n            [ 9, 10],\n            [ 9, 12],\n            [ 9, 15],\n            [10, 11],\n            [10, 12],\n            [11, 13],\n            [11, 24],\n            [12, 13],\n            [12, 14],\n            [13, 23],\n            [14, 15],\n            [14, 23],\n            [14, 22],\n            [15, 16],\n            [15, 20],\n            [16, 17],\n            [16, 20],\n            [17, 18],\n            [18, 19],\n            [19, 20],\n            [20, 21],\n            [21, 22],\n            [22, 24],\n            [22, 23],\n            [23, 24],\n        ];\n\n        const w = document.getElementById(\"canvas\").width;\n        const h = document.getElementById(\"canvas\").height;\n\n        for (let [i, x, y] of nodePos) {\n            x *= (w/1920);\n            y *= (h/1080);\n            this.nodes.push(new _graph_js__WEBPACK_IMPORTED_MODULE_0__.Node(i, x, y));\n        }\n\n        for (let e of edges) {\n            this.graph.addEdge(this.nodes[e[0]], this.nodes[e[1]]);\n        }\n    }\n\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/../src/js/map.js?");

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