export class Graph {
    constructor() {
        /** @type {Map<number, Array<Edge>>} */
        this.edges = new Map();
    }

    /**
     * @param {number} node1 
     * @param {number} node2
     * @param {number} weight 
     */
    addEdge(node1, node2, weight) {
        // TODO: prevent duplicate edges
        if (this.edges.get(node1) === undefined) {
            this.edges.set(node1, []);
        }
        if (this.edges.get(node2) === undefined) {
            this.edges.set(node2, []);
        }

        this.edges.get(node1).push(new Edge(node2, weight));
        this.edges.get(node2).push(new Edge(node1, weight));
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

export class Edge {
    /**
     * 
     * @param {number} to 
     * @param {number} weight 
    */
    constructor(to, weight) {
        this.to = to;
        this.weight = weight;
    }
}

