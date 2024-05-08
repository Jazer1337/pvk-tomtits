import { Resolution } from "./resolution.js";
import { GameMap } from "./map.js";


export class Game {
    
    static canvas = document.getElementById('canvas');
    static ctx = canvas.getContext('2d');

    static rect;

    static truck;

    static gameOver = false;
    static startNode;
    static currentNode;
    static count = 0;
    static targets = [];        // list of [node, img]
    static visited = [];        // list of node indices

    static setup() {
        
        Game.rect = Game.canvas.getBoundingClientRect();

        Game.truck = Game.createImg("./src/css/garbage_truck.svg", 150);
        Game.truck.style.zIndex = 1;                                        // show on top of trash cans
        Game.moveTruck(GameMap.nodes[0]);

        document.getElementById("count").innerHTML = "Hämta sopor i alla blåa noder och ta dig sedan tillbaka till sopstation längst upp till vänster";
        
        // init game
        Game.generateMap();
        Game.initialDraw();
        Game.generateGarbage(3);

        Game.canvas.addEventListener('click', event => {

            if (Game.gameOver) {
                return;
            }
            
            const radius = 7 * Resolution.circleRadius;     // not necessary to press exactly on the circle (outside is ok)
            
            const x = event.clientX - Game.rect.left;
            const y = event.clientY - Game.rect.top;
            const clickedNode = GameMap.nodes.find(node => Math.hypot(node.x-x, node.y-y) < radius);

            // if neighbor
            if (GameMap.graph.getNeighborEdges(Game.currentNode).find(edge => edge.to == clickedNode)) {

                // visit node
                Game.count += GameMap.graph.getWeight(Game.currentNode, clickedNode) * Resolution.SCALE;
                Game.drawLine(Game.currentNode, clickedNode, '#F00');
                Game.currentNode = clickedNode;

                Game.moveTruck(clickedNode);

                // empty trash can if first time visiting
                let wasVisitedBefore = Game.visited[clickedNode.name];
                Game.visited[clickedNode.name] = true;
                
                if (!wasVisitedBefore && Game.visited[clickedNode.name]) {
                    for (const [node, img] of Game.targets) {
                        if (node == clickedNode) {
                            img.src = "./src/css/trash_empty.svg";
                            break;
                        }
                    }
                }

                // update info
                let str = "Du har åkt " + parseInt(Game.count) + " meter";

                if (Game.currentNode == Game.startNode && Game.isGarbageCollected()){
                    Game.gameOver = true;
                    str = "Du kom tillbaka på " + parseInt(Game.count) + " meter! Med alla sopor 😱";
                }

                document.getElementById("count").innerHTML = str;
            }           

        });
    }

    static createImg(src, width) {
        const img = document.createElement("img");
        document.getElementById("canvas-container").appendChild(img);

        img.src = src;
        img.style.position = "absolute";
        img.style.width = width / Resolution.SCALE + "px";

        img.style.height = window.getComputedStyle(img).height;

        img.style.pointerEvents = "none";       // ignore events, since they should go to canvas, not this img

        return img;
    }

    // centers truck on (x,y)
    static moveTruck(node) {
        Game.truck.style.left = Game.rect.left + node.x - parseInt(Game.truck.style.width)/2 + "px";
        Game.truck.style.top = Game.rect.top + node.y - parseInt(Game.truck.style.height)/2 + "px";
    }

    static drawNode(node, color) {
        Game.ctx.fillStyle = color;
        Game.ctx.beginPath();
        Game.ctx.arc(node.x, node.y, Resolution.circleRadius, 0, Math.PI * 2);
        Game.ctx.fill();
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

            // create img
            const img = Game.createImg("./src/css/trash_full.svg", 100);
            img.style.left = Game.rect.left + node.x - parseInt(img.style.width)/2 + "px";
            img.style.top = Game.rect.top + node.y - parseInt(img.style.height)/2 + "px";

            Game.targets.push([node, img]);
        }
    }

    static isGarbageCollected() {
        for (const [node, _] of Game.targets) {
            if (!Game.visited[node.name]) {
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
        Game.visited = new Array(GameMap.nodes.length)
    }

    static initialDraw() {

        Game.drawNode(Game.startNode, '#0F0')
        
        Game.currentNode = Game.startNode;

        for (let i = 0; i < Game.visited.length; i++) {
            Game.visited[i] = false;
        }
    }

}
