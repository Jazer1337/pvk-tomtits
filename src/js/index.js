import { setup } from "./metro.js";
import { nodes, graph } from "./map.js";
import { FindShortestPathAll } from "./solve.js";

document.addEventListener('DOMContentLoaded', setup);

// --- TESTING ALGORITHM ---
// let start = nodes[0];
// let visit = [nodes[8], nodes[4], nodes[24], nodes[9]];
// let path = FindShortestPathAll(graph, start, visit);

// console.log("path found:", path);
