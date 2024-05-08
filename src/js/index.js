import { Resolution } from "./resolution.js";
import { Game } from "./game.js";
import { GameMap } from "./map.js";
// import { FindShortestPathAll } from "./solve.js";


Resolution.setup();     // resolution must be set up first
GameMap.setup();

document.addEventListener('DOMContentLoaded', Game.setup);

// --- TESTING ALGORITHM ---
// let start = nodes[0];
// let visit = [nodes[8], nodes[4], nodes[24], nodes[9]];
// let path = FindShortestPathAll(graph, start, visit);

// console.log("path found:", path);
