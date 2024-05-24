import { Resolution } from "./resolution.js";
import { GameMap } from "./map.js";
import { FindShortestPathAll } from "./solve.js";
import { Sprite } from "./sprite.js";


export class Game {
    
    static SRC_TRASH_EMPTY = "./src/css/trash_empty.svg";
    static SRC_TRASH_FULL = "./src/css/trash_full.svg";

    static canvas = document.getElementById('canvas');
    static canvasX;
    static canvasY;
    static ctx = canvas.getContext('2d');

    static gameOver = false;
    static startNode;
    static count = 0;
    static targets = [];        // list of [node, Sprite]
    static playerVisited = [];        // list of node indices
    
    static playerCurrentNode;
    static player;      // Sprite
    static playerMoving = false;        // player is unable to move while animation is playing

    static robot;       // Sprite
    static robotPath;   // Path
    static robotIdx;    // int
    static robotUndrawnRoads;       // list of [node1, node2]
    static robotVisited = [];        // list of node indices

    static setup() {
        
        const rect = Game.canvas.getBoundingClientRect();
        Game.canvasX = Math.floor(rect.x);
        Game.canvasY = Math.floor(rect.y);

        const x = GameMap.nodes[0].x;
        const y = GameMap.nodes[0].y;

        // setup truck
        Game.player = new Sprite("./src/css/garbage_truck.svg", 150, x, y);
        Game.player.img.style.zIndex = 1;                                        // show on top of trash cans

        // setup robot
        Game.robot = new Sprite("./src/css/ai_robot.png", 100, x, y);
        Game.robot.img.style.zIndex = 1;
        Game.robot.img.style.display = "none";

        document.getElementById("count").innerHTML = "Hämta sopor i alla blåa noder och ta dig sedan tillbaka till sopstation längst upp till vänster";
        
        // init game
        Game.generateMap();
        Game.initialDraw();
        Game.generateGarbage(3);              
        
        Game.canvas.addEventListener('click', event => {

            if (Game.gameOver || Game.playerMoving) {
                return;
            }
            
            const radius = 7 * Resolution.circleRadius;     // not necessary to press exactly on the circle (outside is ok)
            
            const x = event.clientX - Game.canvasX;
            const y = event.clientY - Game.canvasY;
            const clickedNode = GameMap.nodes.find(node => Math.hypot(node.x-x, node.y-y) < radius);

            // if neighbor
            if (GameMap.graph.getNeighborEdges(Game.playerCurrentNode).find(edge => edge.to == clickedNode)) {

                // visit node
                Game.count += GameMap.graph.getWeight(Game.playerCurrentNode, clickedNode) * Resolution.SCALE;
                Game.drawLine(Game.playerCurrentNode, clickedNode, '#F00');
                Game.playerCurrentNode = clickedNode;

                function onFinish() {
                    Game.emptyTrash(Game.playerVisited, clickedNode);
    
                    // update info
                    let str = "Du har åkt " + parseInt(Game.count) + " meter";
    
                    if (Game.playerCurrentNode == Game.startNode && Game.isGarbageCollected()){
                        Game.gameOver = true;
                        str = "Du kom tillbaka på " + parseInt(Game.count) + " meter! Med alla sopor 😱";
                        Game.drawAISolution();
                    }
    
                    document.getElementById("count").innerHTML = str;

                    Game.playerMoving = false;
                }

                Game.playerMoving = true;
                Game.player.moveToAnim(clickedNode.x, clickedNode.y, onFinish);
            }           

        });
    }

    static drawNode(node, color) {
        Game.ctx.fillStyle = color;
        Game.ctx.beginPath();
        Game.ctx.arc(node.x, node.y, Resolution.circleRadius, 0, Math.PI * 2);
        Game.ctx.fill();

        Game.ctx.font = '30px Arial';             // Set font size and family
        Game.ctx.fillStyle = 'blue';              // Set text color
        Game.ctx.textAlign = 'center';            // Set text alignment
        Game.ctx.textBaseline = 'middle';         // Set text baseline
        Game.ctx.fillText(node.name, node.x+40, node.y);

    }

    static drawLine(node1, node2, color) {
        Game.ctx.strokeStyle = color;
        Game.ctx.lineWidth = 2;
        Game.ctx.beginPath();
        Game.ctx.moveTo(node1.x, node1.y);
        Game.ctx.lineTo(node2.x, node2.y);
        Game.ctx.stroke();
    }

    static generateGarbage(amount) {
        
        let nodesLeft = [...GameMap.nodes];

        for (let i=0; i<amount; i++) {
            
            // pick random trash
            const randIdx = Math.floor(Math.random() * (nodesLeft.length - 1) + 1);
            const node = nodesLeft.splice(randIdx, 1)[0];

            // create sprite
            const sprite = new Sprite("./src/css/trash_full.svg", 100, node.x, node.y);
            Game.targets.push([node, sprite]);
        }
    }

    static isGarbageCollected() {
        for (const [node, _] of Game.targets) {
            if (!Game.playerVisited[node.name]) {
                console.log(node);
                console.log("not visited");
                return false;
            }
        }
        return true;
    }

    static generateMap() {

        for (let node of GameMap.nodes) {
            Game.drawNode(node, '#0003');
        }
        Game.startNode = GameMap.nodes[0];
        Game.playerVisited = new Array(GameMap.nodes.length)
    }

    static initialDraw() {

        Game.drawNode(Game.startNode, '#0F0')
        
        Game.playerCurrentNode = Game.startNode;

        for (let i = 0; i < Game.playerVisited.length; i++) {
            Game.playerVisited[i] = false;
        }
    }

    static drawAISolution() {
        
        Game.robot.img.style.display = "block";

        // find solution
        const start = GameMap.nodes[0];
        
        let nodeTargets = [];
        for (const [node, _] of Game.targets) {
            nodeTargets.push(node);
        }     

        let robotPath = FindShortestPathAll(GameMap.graph, start, nodeTargets);

        let robotIdx = 0;      // first idx of `path`

        let robotUndrawnRoads = [];
        for (let i=0; i<robotPath.nodes.length-1; i++) {
            const node1 = robotPath.nodes[i];
            const node2 = robotPath.nodes[i+1];

            let add = true;
            for (const [n1, n2] of robotUndrawnRoads) {
                if (n1 == node2 && n2 == node1) {
                    add = false;
                    break;
                }
            }

            if (add) {
                robotUndrawnRoads.push([node1, node2]);
            }
        }

        // refill trash
        for (const [_, sprite] of Game.targets) {
            sprite.img.src = Game.SRC_TRASH_FULL;
        }

        Game.ctx.setLineDash([10, 10]);


        function moveToNextNode() {
            robotIdx++;

            if (robotIdx == robotPath.nodes.length) {
                return;
            }

            const node = robotPath.nodes[robotIdx];
            const oldNode = robotPath.nodes[robotIdx-1];

            for (let i=0; i<robotUndrawnRoads.length; i++) {
                
                const n1 = robotUndrawnRoads[i][0];
                const n2 = robotUndrawnRoads[i][1];
                
                if ((n1 == oldNode && n2 == node) || (n2 == node && n1 == oldNode)) {
                    Game.drawLine(oldNode, node, "blue");
                    robotUndrawnRoads.splice(i, 1);
                    break;
                }
            }

            Game.robot.moveToAnim(node.x, node.y, () => {
                Game.emptyTrash(Game.robotVisited, node);

                setTimeout(() => {
                    moveToNextNode();       // wait before moving to next trash
                }, 250);
            });
            

        }

        setTimeout(() => {
            moveToNextNode();
        }, 250);

    }

    static emptyTrash(visited, node) {
        
        // empty trash can if first time visiting
        let wasVisitedBefore = visited[node.name];
        visited[node.name] = true;
        
        if (!wasVisitedBefore && visited[node.name]) {
            for (const [n, sprite] of Game.targets) {
                if (n == node) {
                    sprite.img.src = Game.SRC_TRASH_EMPTY;
                    break;
                }
            }
        }

    }

}
