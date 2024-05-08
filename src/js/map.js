import { Graph, Node } from "./graph.js";

export class GameMap {
    
    static nodes = [];
    static graph = new Graph();

    static setup() {
        
        // Nodes are accessed with indexes (nodes[0] gives first node).
        // These positions are based on 1920x1080
        let nodePos = [
            [ 1,  195,   70],
            [ 2,  174,  181],
            [ 3,  342,  145],
            [ 4,  128,  450],
            [ 5,  215,  645],
            [ 6,  343,  931],
            [ 7,  527,  613],
            [ 8,  735,  592],
            [ 9,  762,  887],
            [10, 1118,  850],
            [11, 1294, 1017],
            [12, 1575,  988],
            [13, 1307,  689],
            [14, 1588,  661],
            [15, 1311,  531],
            [16, 1053,  558],
            [17,  994,  265],
            [18,  698,  324],
            [19,  863,   32],
            [20, 1320,   92],
            [21, 1253,  210],
            [22, 1605,  135],
            [23, 1600,  292],
            [24, 1593,  502],
            [25, 1847,  474],
        ];

        // [node1.num, node2.num]
        let edges = [
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

        const w = document.getElementById("canvas").width;
        const h = document.getElementById("canvas").height;

        for (let [i, x, y] of nodePos) {
            x *= (w/1920);
            y *= (h/1080);
            this.nodes.push(new Node(i, x, y));
        }

        for (let e of edges) {
            this.graph.addEdge(this.nodes[e[0]-1], this.nodes[e[1]-1]);
        }
    }

}
