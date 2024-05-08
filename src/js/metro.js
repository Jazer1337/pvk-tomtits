import { Resolution } from "./resolution.js";
import { GameMap } from "./map.js";


export class Game {
    
    static canvas = document.getElementById('canvas');
    static ctx = canvas.getContext('2d');

    static rect;

    static truck;
    static truckWidth;
    static truckHeight;

    static gameOver = false;
    static startNode;
    static currentNode;
    static count = 0;
    static targets = [];        // [[idx, img], [idx, img], ...]
    static visited = [];

    static setup() {
        
        Game.rect = Game.canvas.getBoundingClientRect();

        Game.truck = Game.createImg("./src/css/garbage_truck.svg", 150);
        

        // save computed style for truck
        const compStyle = window.getComputedStyle(Game.truck);
        Game.truckWidth = parseInt(compStyle.width);
        Game.truckHeight = parseInt(compStyle.height);
        
        Game.moveTruck(GameMap.nodes[0].x, GameMap.nodes[0].y);



        document.getElementById("count").innerHTML = "Hämta sopor i alla blåa noder och ta dig sedan tillbaka till sopstation längst upp till vänster";
        
        Game.generateMap()
        Game.initialDraw()
        Game.generateGarbage(3)

        Game.canvas.addEventListener('click', function(e) {

            if (Game.gameOver) {
                return
            }
            const x = e.clientX - Game.rect.left;
            const y = e.clientY - Game.rect.top;
            const clickedNode = GameMap.nodes.find(node => Math.hypot(node.x - x, node.y - y) < 7 * Resolution.circleRadius);       // touch-area is larger than visuals

            if (GameMap.graph.getNeighborEdges(Game.currentNode).find(edge => edge.to == clickedNode)) {

                Game.count += GameMap.graph.getWeight(Game.currentNode, clickedNode) * Resolution.SCALE;
                Game.drawLine(Game.currentNode, clickedNode, '#F00');

                Game.moveTruck(clickedNode.x, clickedNode.y);

                Game.currentNode = clickedNode
                
                const i = GameMap.nodes.indexOf(clickedNode);
                let wasVisitedBefore = Game.visited[i];
                Game.visited[i] = true;
                
                if (!wasVisitedBefore && Game.visited[i]) {
                    
                    for (const [node, img] of Game.targets) {
                        if (node == clickedNode.name) {
                            // trash was just visited: change img to empty trash can
                            img.src = "./src/css/trash_empty.svg";
                            break;
                        }
                    }
                }

                if (Game.currentNode == Game.startNode && Game.garbageCollected()){
                    Game.gameOver = true;
                    document.getElementById("count").innerHTML = "Du kom tillbaka på " + parseInt(Game.count) + " meter! Med alla sopor 😱"
                } else {
                    document.getElementById("count").innerHTML = "Du har åkt " + parseInt(Game.count) + " meter"
                }
            }           

            console.log(Game.count);

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

    static moveTruck(x, y) {
        Game.truck.style.left = Game.rect.left + x - Game.truckWidth/2 + "px";
        Game.truck.style.top = Game.rect.top + y - Game.truckHeight/2 + "px";
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
        

        for (let i = 0; i < amount; i++) {
            
            // TODO: prevent duplicate trash
            const randomIndex = Math.floor(Math.random() * (GameMap.nodes.length - 1) + 1)
            
            const img = Game.createImg("./src/css/trash_full.svg", 100);

            const x = GameMap.nodes[randomIndex].x;
            const y = GameMap.nodes[randomIndex].y;

            img.style.left = Game.rect.left + x - parseInt(img.style.width)/2 + "px";
            img.style.top = Game.rect.top + y - parseInt(img.style.height)/2 + "px";

            Game.targets.push([randomIndex, img]);

            Game.drawNode(GameMap.nodes[randomIndex], "#0003");

        }
    }

    static garbageCollected() {
        for (let i = 0; i < Game.targets.length; i++) {
            if (Game.visited[Game.targets[i][0]] == false){
                return false
            }
        }
        return true
        
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
