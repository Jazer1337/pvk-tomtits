
export class Node {
    /**
     * @param {int} name 
     * @param {float} x 
     * @param {float} y 
     */
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
    }
}

class Edge {
    /**
     * @param {Node} to 
     * @param {number} weight 
    */
    constructor(to, weight) {
        this.to = to;
        this.weight = weight;
    }
}

export class Graph {
    constructor() {
        /** @type {Map<Node, Array<Edge>>} */
        this.edges = new Map();
    }

    /**
     * @param {Node} node1
     * @param {Node} node2
     */
    addEdge(node1, node2) {
        // TODO: prevent duplicate edges
        if (this.edges.get(node1) === undefined) {
            this.edges.set(node1, []);
        }
        if (this.edges.get(node2) === undefined) {
            this.edges.set(node2, []);
        }

        let dist = Math.hypot(node2.x-node1.x, node2.y - node1.y);
        this.edges.get(node1).push(new Edge(node2, dist));
        this.edges.get(node2).push(new Edge(node1, dist));
    }

    /**
     * @param {number} node1 
     * @param {number} node2 
     * @returns {number}
     */
    getWeight(node1, node2) {

        for (let e of this.edges.get(node1)) {
            if (e.to == node2) {
                return e.weight;
            }
        }
    }

    /**
     * @returns {IterableIterator<number>}
     */
    getNodes() {
        return this.edges.keys();
    }

    /**
     * @param {number} node 
     * @returns {Array<Edge>}
     */
    getNeighborEdges(node) {
        return this.edges.get(node);
    }
}
