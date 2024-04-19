import { Graph, Node } from "./graph.js";

// index 0 means first node with coords nodeCoords[0]
export const nodes = [
    new Node( 0,  85,  60),
    new Node( 1, 200,  60),
    new Node( 2, 200, 135),
    new Node( 3, 115, 135),
    new Node( 4,  95, 225),
    new Node( 5, 115, 225),
    new Node( 6, 200, 225),
    new Node( 7, 285, 225),
    new Node( 8, 285, 345),
    new Node( 9, 450, 345),
    new Node(10, 450, 260),
    new Node(11, 450, 225),
    new Node(12, 450, 180),
    new Node(13, 545, 180),
    new Node(14, 640, 180),
    new Node(15, 640, 260),
    new Node(16, 740, 260),
    new Node(17, 740, 110),
    new Node(18, 640, 110),
    new Node(19, 640,  60),
    new Node(20, 545,  60),
    new Node(21, 500,  60),
    new Node(22, 450,  60),
    new Node(23, 410,  60),
    new Node(24, 250,  60) 
];


// [node1.num, node2.num]
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

export const graph = new Graph();

for (let e of edges) {
    graph.addEdge(nodes[e[0]], nodes[e[1]]);
}
