import { Graph, Node } from "./graph.js";

export class GameMap {
    
    static nodes = [];
    static graph = new Graph();

    static setup() {
        
        // Nodes are accessed with indexes (nodes[0] gives first node).
        // These positions are based on 1920x1080
        let nodePos = [
            [ 0,  195,   70],
            [ 1,  174,  181],
            [ 2,  342,  145],
            [ 3,  128,  450],
            [ 4,  215,  645],
            [ 5,  343,  931],
            [ 6,  527,  613],
            [ 7,  735,  592],
            [ 8,  762,  887],
            [ 9, 1118,  850],
            [10, 1294, 1017],
            [11, 1575,  988],
            [12, 1307,  689],
            [13, 1588,  661],
            [14, 1311,  531],
            [15, 1053,  558],
            [16,  994,  265],
            [17,  698,  324],
            [18,  863,   32],
            [19, 1320,   92],
            [20, 1253,  210],
            [21, 1605,  135],
            [22, 1600,  292],
            [23, 1593,  502],
            [24, 1847,  474],
        ];

        // [node1.num, node2.num]
        let edges = [
            [ 0,  1],
            [ 0,  2],
            [ 1,  2],
            [ 1,  3],
            [ 2, 17],
            [ 2, 18],
            [ 3,  4],
            [ 3, 17],
            [ 3,  4],
            [ 4,  5],
            [ 4,  6],
            [ 5,  6],
            [ 5,  8],
            [ 6,  7],
            [ 6, 17],
            [ 7,  8],
            [ 7, 17],
            [ 7, 15],
            [ 8,  9],
            [ 9, 10],
            [ 9, 12],
            [ 9, 15],
            [10, 11],
            [10, 12],
            [11, 13],
            [11, 24],
            [12, 13],
            [12, 14],
            [13, 23],
            [14, 15],
            [14, 23],
            [14, 22],
            [15, 16],
            [15, 20],
            [16, 17],
            [16, 20],
            [17, 18],
            [18, 19],
            [19, 20],
            [20, 21],
            [21, 22],
            [22, 24],
            [22, 23],
            [23, 24],
        ];

        const w = document.getElementById("canvas").width;
        const h = document.getElementById("canvas").height;

        for (let [i, x, y] of nodePos) {
            x = Math.floor(x * (w/1920));
            y = Math.floor(y * (h/1080));
            this.nodes.push(new Node(i, x, y));
        }

        for (let e of edges) {
            this.graph.addEdge(this.nodes[e[0]], this.nodes[e[1]]);
        }
    }

}
