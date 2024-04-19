import { Graph, Edge } from "./graph.js";


class Path {
    constructor() {
        this.cost = 0;
        this.nodes = [];
    }
}

/**
 * Include all nodes in `nodes` when finding path.
 * Automatically adds `startNode` as end node.
 * @param {number} startNode 
 * @param {Array<number>} nodes 
 */
export function FindShortestPathAll(graph, startNode, nodes) {
    nodes.push(startNode);

    let pathCombined = new Path();
    pathCombined.nodes.push(startNode);

    let from = startNode;

    for (let node of nodes) {

        // unnecessary to visit node again if already visited through some previous path
        if (pathCombined.nodes.includes(node) && node != nodes[nodes.length - 1]) {
            continue;
        }
        let path = FindShortestPathBetween(graph, from, node);
        from = node;

        // don't append first node (was appended last iteration)
        pathCombined.nodes.push(...path.nodes.slice(1));
        pathCombined.cost += path.cost;
    }
    return pathCombined;
}

/**
 * Dijkstra's algorithm: find shortest path between nodes in weighted, directed graph.
 * (pseudo code at: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
 * @returns {Path}
 */
export function FindShortestPathBetween(graph, startNode, endNode) {

    // setup
    let distanceTo = new Map();
    let parentOf = new Map();
    let queue = [];

    for (let v of graph.getNodes()) {
        distanceTo.set(v, Infinity);
        parentOf.set(v, -1);
        queue.push(v);
    }
    distanceTo.set(startNode, 0);

    // Dijkstra
    while (queue.length > 0) {

        // get min dist node
        let u = -1;
        let minDist = Infinity;

        for (let [node, dist] of distanceTo.entries()) {
            if (dist < minDist && queue.includes(node)) {
                u = node;
                minDist = dist;
            }
        }

        // break early if possible, since we don't need the min distance to all nodes
        if (u == endNode) {
            break;
        }

        // remove from queue
        let idx = queue.indexOf(u);
        queue.splice(idx, 1);

        // update min dist
        for (let edge of graph.getNeighborEdges(u)) {
            let v = edge.to;
            let alt = distanceTo.get(u) + edge.weight;
            if (alt < distanceTo.get(v)) {
                distanceTo.set(v, alt);
                parentOf.set(v, u);
            }
        }
    }

    // build path in reverse
    let path = new Path();
    let u = endNode;

    while (true) {
        path.nodes.unshift(u);
        if (parentOf.get(u) == -1) {
            break;
        }
        path.cost += graph.getWeight(parentOf.get(u), u);
        u = parentOf.get(u);
    }

    return path;
}
