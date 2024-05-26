import { Resolution } from "./resolution.js";
import { Game } from "./game.js";
import { GameMap } from "./map.js";
import { UI } from "./ui.js";


Resolution.setup();     // resolution must be set up first
UI.setup();
GameMap.setup();

Game.setup();
