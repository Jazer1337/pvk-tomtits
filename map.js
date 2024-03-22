import { Graph } from "./js/graph.js";
import { FindShortestPathAll, FindShortestPathBetween } from "./js/solve.js";


// arrays of [node1, node2, weight]
const edges = [
    // horizontal
    [0, 1, 1],
    [1, 2, 1],
    [2, 3, 3],
    [3, 4, 27],
    [4, 5, 26],
    [5, 6, 25],
    [7, 8, 3],
    [12, 13, 15],
    [9, 10, 19],
    [10, 11, 18],
    [14, 15, 5],
    [15, 16, 6],
    [16, 17, 7],
    [17, 18, 29],
    [23, 19, 12],
    [19, 20, 13],

    // vertical
    [1, 8, 2],
    [4, 9, 22],
    [5, 10, 23],
    [6, 12, 24],
    [7, 15, 4],
    [8, 16, 8],
    [17, 21, 9],
    [9, 18, 28],
    [18, 23, 21],
    [23, 22, 11],
    [12, 11, 17],
    [11, 19, 16],
    [13, 20, 14]
];


const graph = new Graph();

for (let e of edges) {
    graph.addEdge(e[0], e[1], e[2]);
}

let start = 1;
// let end = 16;
// let path = FindShortestPathBetween(graph, start, end);

let nodes = [16, 5];
let path = FindShortestPathAll(graph, start, nodes);

console.log("path found:", path);