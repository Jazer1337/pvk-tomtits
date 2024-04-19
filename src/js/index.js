import '../css/style.css'

import { setup } from "./metro.js";
import { Graph } from "./graph.js";
import { FindShortestPathAll } from "./solve.js";

document.addEventListener('DOMContentLoaded', setup);


// --- TESTING ALGORITHM ---


// index 0 means first node with coords nodes[0]
const nodes = [
    [ 85,  60], // 0
    [200,  60], // 1
    [200, 135], // 2
    [113, 135], // 3
    [ 95, 225], // 4
    [120, 225], // 5
    [200, 225], // 6
    [285, 225], // 7
    [285, 345], // 8
    [450, 345], // 9
    [450, 260], // 10
    [450, 225], // 11
    [450, 180], // 12
    [545, 180], // 13
    [640, 180], // 14
    [640, 260], // 15
    [740, 260], // 16
    [740, 110], // 17
    [640 ,110], // 18
    [640, 60],  // 19
    [545, 60],  // 20
    [500, 60],  // 21
    [450, 60],  // 22
    [410, 60],  // 23
    [250, 60]   // 24
]


// [node1, node2]
const edges = [
    [ 0,  1],
    [ 1,  2],
    [ 1, 24],
    [ 2,  3],
    [ 2,  6],
    [ 3,  5],
    [ 5,  4],
    [ 5,  6],
    [ 6,  7],
    [ 7,  8],
    [ 7, 11],
    [ 8,  9],
    [ 9, 10],
    [10, 11],
    [10, 15],
    [11, 12],
    [12, 22],
    [12, 13],
    [13, 14],
    [13, 20],
    [14, 15],
    [14, 18],
    [15, 16],
    [16, 17],
    [17, 18],
    [18, 19],
    [19, 20],
    [20, 21],
    [21, 22],
    [22, 23],
    [23, 24]
];


const graph = new Graph();

for (let e of edges) {
    graph.addEdge(nodes, e[0], e[1]);
}

let start = 0;
let visit = [8, 4, 24, 9];
let path = FindShortestPathAll(graph, start, visit);

console.log("path found:", path);