import { Graph, Node } from "./graph.js";

// nodes are accessed with indexes (nodes[0] gives first node)
export const nodes = [
    new Node( 1, 0.101, 0.069),
    new Node( 2, 0.091, 0.168),
    new Node( 3, 0.179, 0.134),
    new Node( 4, 0.070, 0.412),
    new Node( 5, 0.111, 0.597),
    new Node( 6, 0.179, 0.861),
    new Node( 7, 0.276, 0.564),
    new Node( 8, 0.385, 0.546),
    new Node( 9, 0.401, 0.819),
    new Node(10, 0.583, 0.782),
    new Node(11, 0.677, 0.935),
    new Node(12, 0.822, 0.912),
    new Node(13, 0.682, 0.643),
    new Node(14, 0.828, 0.611),
    new Node(15, 0.684, 0.490),
    new Node(16, 0.552, 0.513),
    new Node(17, 0.520, 0.240),
    new Node(18, 0.364, 0.300),
    new Node(19, 0.450, 0.032),
    new Node(20, 0.687, 0.087),
    new Node(21, 0.653, 0.194),
    new Node(22, 0.838, 0.125),
    new Node(23, 0.835, 0.273),
    new Node(24, 0.833, 0.462),
    new Node(25, 0.958, 0.444),
];


// [node1.num, node2.num]
const edges = [
    [ 1,  2],
    [ 1,  3],
    [ 2,  3],
    [ 2,  4],
    [ 3, 18],
    [ 3, 19],
    [ 4,  5],
    [ 4, 18],
    [ 4,  5],
    [ 5,  6],
    [ 5,  7],
    [ 6,  7],
    [ 6,  9],
    [ 7,  8],
    [ 7, 18],
    [ 8,  9],
    [ 8, 18],
    [ 8, 16],
    [ 9, 10],
    [10, 11],
    [10, 13],
    [10, 16],
    [11, 12],
    [11, 13],
    [12, 14],
    [12, 25],
    [13, 14],
    [13, 15],
    [14, 24],
    [15, 16],
    [15, 24],
    [15, 23],
    [16, 17],
    [16, 21],
    [17, 18],
    [17, 21],
    [18, 19],
    [19, 20],
    [20, 21],
    [21, 22],
    [22, 23],
    [23, 25],
    [23, 24],
    [24, 25],
];

export const graph = new Graph();

for (let e of edges) {
    graph.addEdge(nodes[e[0]-1], nodes[e[1]-1]);
}
