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

/***/ "./js/graph.js":
/*!*********************!*\
  !*** ./js/graph.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Edge: () => (/* binding */ Edge),\n/* harmony export */   Graph: () => (/* binding */ Graph)\n/* harmony export */ });\nclass Graph {\n    constructor() {\n        /** @type {Map<number, Array<Edge>>} */\n        this.edges = new Map();\n    }\n\n    /**\n     * @param {number} node1 \n     * @param {number} node2\n     * @param {number} weight \n     */\n    addEdge(node1, node2, weight) {\n        // TODO: prevent duplicate edges\n        if (this.edges.get(node1) === undefined) {\n            this.edges.set(node1, []);\n        }\n        if (this.edges.get(node2) === undefined) {\n            this.edges.set(node2, []);\n        }\n\n        this.edges.get(node1).push(new Edge(node2, weight));\n        this.edges.get(node2).push(new Edge(node1, weight));\n    }\n\n    /**\n     * @param {number} node1 \n     * @param {number} node2 \n     * @returns {number}\n     */\n    getWeight(node1, node2) {\n\n        for (let e of this.edges.get(node1)) {\n            if (e.to == node2) {\n                return e.weight;\n            }\n        }\n    }\n\n    /**\n     * @returns {IterableIterator<number>}\n     */\n    getNodes() {\n        return this.edges.keys();\n    }\n\n    /**\n     * @param {number} node \n     * @returns {Array<Edge>}\n     */\n    getNeighborEdges(node) {\n        return this.edges.get(node);\n    }\n}\n\nclass Edge {\n    /**\n     * \n     * @param {number} to \n     * @param {number} weight \n    */\n    constructor(to, weight) {\n        this.to = to;\n        this.weight = weight;\n    }\n}\n\n\n\n//# sourceURL=webpack://pvk-tomtits/./js/graph.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ \"./css/style.css\");\n/* harmony import */ var _metro_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./metro.js */ \"./js/metro.js\");\n/* harmony import */ var _graph_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graph.js */ \"./js/graph.js\");\n/* harmony import */ var _solve_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./solve.js */ \"./js/solve.js\");\n\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', _metro_js__WEBPACK_IMPORTED_MODULE_1__.setup);\n\n\n// --- TESTING ALGORITHM ---\n\n// arrays of [node1, node2, weight]\nconst edges = [\n    // horizontal\n    [0, 1, 1],\n    [1, 2, 1],\n    [2, 3, 3],\n    [3, 4, 27],\n    [4, 5, 26],\n    [5, 6, 25],\n    [7, 8, 3],\n    [12, 13, 15],\n    [9, 10, 19],\n    [10, 11, 18],\n    [14, 15, 5],\n    [15, 16, 6],\n    [16, 17, 7],\n    [17, 18, 29],\n    [23, 19, 12],\n    [19, 20, 13],\n\n    // vertical\n    [1, 8, 2],\n    [4, 9, 22],\n    [5, 10, 23],\n    [6, 12, 24],\n    [7, 15, 4],\n    [8, 16, 8],\n    [17, 21, 9],\n    [9, 18, 28],\n    [18, 23, 21],\n    [23, 22, 11],\n    [12, 11, 17],\n    [11, 19, 16],\n    [13, 20, 14]\n];\n\n\nconst graph = new _graph_js__WEBPACK_IMPORTED_MODULE_2__.Graph();\n\nfor (let e of edges) {\n    graph.addEdge(e[0], e[1], e[2]);\n}\n\nlet start = 1;\n// let end = 16;\n// let path = FindShortestPathBetween(graph, start, end);\n\nlet nodes = [16, 5];\nlet path = (0,_solve_js__WEBPACK_IMPORTED_MODULE_3__.FindShortestPathAll)(graph, start, nodes);\n\nconsole.log(\"path found:\", path);\n\n//# sourceURL=webpack://pvk-tomtits/./js/index.js?");

/***/ }),

/***/ "./js/metro.js":
/*!*********************!*\
  !*** ./js/metro.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setup: () => (/* binding */ setup)\n/* harmony export */ });\nconst canvas = document.getElementById('metroCanvas');\nconst ctx = canvas.getContext('2d');\nconst nodes = [];\nvar gameOver = false;\nvar startNode = null;\nvar currentNode;\nvar count = 0;\nvar targets = []\nvar adjacencyMatrix = []\nvar visited = []\n\nfunction setup() {\n    document.getElementById(\"count\").innerHTML = \"Hämta sopor i alla blåa noder och ta dig sedan tillbaka till sopstation längst upp till vänster\";\n    \n    generateMap()\n    initialDraw()\n    generateGarbage(3)\n\n    canvas.addEventListener('click', function(e) {\n        if (gameOver) {\n            return\n        }\n        const rect = canvas.getBoundingClientRect();\n        const x = e.clientX - rect.left;\n        const y = e.clientY - rect.top;\n        const clickedNode = nodes.find(node => Math.hypot(node.x - x, node.y - y) < 10);\n        \n    \n\n        if (adjacencyMatrix[nodes.indexOf(currentNode)][nodes.indexOf(clickedNode)] == 1){\n            count++;\n            drawLine(currentNode.x, currentNode.y, clickedNode.x, clickedNode.y, '#F00');\n            drawNode(currentNode.x, currentNode.y, '#000')\n            drawNode(clickedNode.x, clickedNode.y, '#0F0')\n            currentNode = clickedNode\n            \n            visited[nodes.indexOf(clickedNode)] = true;\n\n            if (currentNode == startNode && garbageCollected()){\n                gameOver = true;\n                document.getElementById(\"count\").innerHTML = \"Du kom tillbaka på \" + count + \" steg! Med alla sopor 😱\"\n            } else {\n                document.getElementById(\"count\").innerHTML = \"Du har åkt \" + count + \" steg\"\n            }\n        }\n        \n\n        console.log(count)\n        \n    });\n}\n\n\nfunction makeNode(x, y){\n    drawNode(x, y, '#000')\n    nodes.push({x, y})\n}\n\nfunction drawNode(x, y, color) {\n    ctx.fillStyle = color;\n    ctx.beginPath();\n    ctx.arc(x, y, 10, 0, Math.PI * 2);\n    ctx.fill();\n}\n\nfunction drawLine(x1, y1, x2, y2, color) {\n    ctx.strokeStyle = color;\n    ctx.lineWidth = 2;\n    ctx.beginPath();\n    ctx.moveTo(x1, y1);\n    ctx.lineTo(x2, y2);\n    ctx.stroke();\n}\n\nfunction generateGarbage(amount){\n    for (let i = 0; i < amount; i++) {\n        \n        const randomIndex = Math.floor(Math.random() * (nodes.length - 1) + 1)\n        targets.push(randomIndex);\n        drawNode(nodes[randomIndex].x, nodes[randomIndex].y, '#00F')\n\n    }\n}\n\nfunction garbageCollected() {\n    for (let i = 0; i < targets.length; i++) {\n        if (visited[targets[i]] == false){\n            return false\n        }\n    }\n    return true\n    \n}\n\nfunction generateMap() {\n    makeNode(100, 100)\n    makeNode(200, 100)\n    makeNode(300, 100)\n    makeNode(200, 300)\n    makeNode(100, 300)\n    makeNode(150, 100)\n    makeNode(100, 200)\n    makeNode(150, 200)\n\n    startNode = nodes[0]\n    visited = new Array(nodes.length)\n\n\n    adjacencyMatrix = [\n        [0, 0, 0, 0, 0, 1, 1 ,0],\n        [0, 0, 1, 1, 0, 1, 0 ,0],\n        [0, 1, 0, 0, 0, 0, 0 ,0],\n        [0, 1, 0, 0, 1, 0, 0 ,0],\n        [0, 0, 0, 1, 0, 0, 1 ,0],\n        [1, 1, 0, 0, 0, 0, 0 ,0],\n        [1, 0, 0, 0, 1, 0, 0 ,1],\n        [0, 0, 0, 0, 0, 0, 1 ,0],\n      ];\n\n}\n\nfunction initialDraw() {\n    for (let i = 0; i < adjacencyMatrix.length; i++) {\n        for (let u = i; u < adjacencyMatrix.length; u++) {\n            if (adjacencyMatrix[i][u] == 1) {\n                drawLine(nodes[i].x, nodes[i].y, nodes[u].x, nodes[u].y, '#000')\n            }\n        } \n    }\n\n\n    drawNode(startNode.x, startNode.y, '#0F0')\n    currentNode = startNode;\n\n    for (let i = 0; i < visited.length; i++) {\n        visited[i] = false;\n    }\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/./js/metro.js?");

/***/ }),

/***/ "./js/solve.js":
/*!*********************!*\
  !*** ./js/solve.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FindShortestPathAll: () => (/* binding */ FindShortestPathAll),\n/* harmony export */   FindShortestPathBetween: () => (/* binding */ FindShortestPathBetween)\n/* harmony export */ });\n/* harmony import */ var _graph_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graph.js */ \"./js/graph.js\");\n\n\n\nclass Path {\n    constructor() {\n        this.cost = 0;\n        this.nodes = [];\n    }\n}\n\n/**\n * Include all nodes in `nodes` when finding path.\n * Automatically adds `startNode` as end node.\n * @param {number} startNode \n * @param {Array<number>} nodes \n */\nfunction FindShortestPathAll(graph, startNode, nodes) {\n    nodes.push(startNode);\n\n    let pathCombined = new Path();\n    pathCombined.nodes.push(startNode);\n\n    let from = startNode;\n\n    for (let node of nodes) {\n\n        // unnecessary to visit node again if already visited through some previous path\n        if (pathCombined.nodes.includes(node) && node != nodes[nodes.length - 1]) {\n            continue;\n        }\n        let path = FindShortestPathBetween(graph, from, node);\n        from = node;\n\n        // don't append first node (was appended last iteration)\n        pathCombined.nodes.push(...path.nodes.slice(1));\n        pathCombined.cost += path.cost;\n    }\n    return pathCombined;\n}\n\n/**\n * Dijkstra's algorithm: find shortest path between nodes in weighted, directed graph.\n * (pseudo code at: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)\n * @returns {Path}\n */\nfunction FindShortestPathBetween(graph, startNode, endNode) {\n\n    // setup\n    let distanceTo = new Map();\n    let parentOf = new Map();\n    let queue = [];\n\n    for (let v of graph.getNodes()) {\n        distanceTo.set(v, Infinity);\n        parentOf.set(v, -1);\n        queue.push(v);\n    }\n    distanceTo.set(startNode, 0);\n\n    // Dijkstra\n    while (queue.length > 0) {\n\n        // get min dist node\n        let u = -1;\n        let minDist = Infinity;\n\n        for (let [node, dist] of distanceTo.entries()) {\n            if (dist < minDist && queue.includes(node)) {\n                u = node;\n                minDist = dist;\n            }\n        }\n\n        // break early if possible, since we don't need the min distance to all nodes\n        if (u == endNode) {\n            break;\n        }\n\n        // remove from queue\n        let idx = queue.indexOf(u);\n        queue.splice(idx, 1);\n\n        // update min dist\n        for (let edge of graph.getNeighborEdges(u)) {\n            let v = edge.to;\n            let alt = distanceTo.get(u) + edge.weight;\n            if (alt < distanceTo.get(v)) {\n                distanceTo.set(v, alt);\n                parentOf.set(v, u);\n            }\n        }\n    }\n\n    // build path in reverse\n    let path = new Path();\n    let u = endNode;\n\n    while (true) {\n        path.nodes.unshift(u);\n        if (parentOf.get(u) == -1) {\n            break;\n        }\n        path.cost += graph.getWeight(parentOf.get(u), u);\n        u = parentOf.get(u);\n    }\n\n    return path;\n}\n\n\n//# sourceURL=webpack://pvk-tomtits/./js/solve.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./css/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./css/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `whooop {\n    display: flex;\n    justify-content: center;\n    margin-top: 50px;\n}\n\ncanvas {\n    border: 1px solid black;\n}\n\np {\n    display: flex;\n    justify-content: center;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://pvk-tomtits/./css/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://pvk-tomtits/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://pvk-tomtits/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./css/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://pvk-tomtits/./css/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://pvk-tomtits/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://pvk-tomtits/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://pvk-tomtits/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://pvk-tomtits/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://pvk-tomtits/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://pvk-tomtits/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/index.js");
/******/ 	
/******/ })()
;