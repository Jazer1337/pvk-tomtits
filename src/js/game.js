import { Resolution } from "./resolution.js";
import { GameMap } from "./map.js";
import { FindShortestPathAll } from "./solve.js";
import { Sprite } from "./sprite.js";
import { UI } from "./ui.js";


export class Game {
    
    static SRC_TRASH_EMPTY = "./src/img/trash_empty.svg";
    static SRC_TRASH_FULL = "./src/img/trash_full.svg";

    static canvas = document.getElementById('canvas');
    static canvasRect;
    static ctx = canvas.getContext('2d');

    static gameOver = false;
    static startNode;
    static trash = [];        // list of [node, Sprite]
    static numTrashLevels = [3, 5, 8];
    static level = 0;
    static allTrashSprites = [];       // 8 sprites. No more are created, only reused
    
    static ignoreClicks = false;        // due to resetting

    static PLAYER_LINE_WIDTH = 2;
    static PLAYER_PATH_COLOR = "rgba(255, 0, 0, 0.5)";
    static playerTrashCollected = [];       // nodes corresponding to those in `allTrashSprites`
    static playerScore = 0;
    static playerCurrentNode;
    static player;      // Sprite
    static playerScoreElem;
    
    static ROBOT_LINE_WIDTH = 5;
    static ROBOT_PATH_COLOR = "rgba(0, 0, 255, 0.5)";
    static robotScore = 0;
    static robot;       // Sprite
    static robotPath;   // Path
    static robotIdx;    // int
    static robotUndrawnRoads;       // list of [node1, node2]
    static robotVisited = [];        // list of node indices
    static robotScoreElem;

    static scoreCompareElem;

    static drawNodeNumber = false;

    static setup() {

        // NOTE: temp
        document.addEventListener("keydown", event => {
            if (event.key === "1") {
                Game.drawNodeNumber = !Game.drawNodeNumber;
                Game.reset();
            }
            else if (event.key === "2") {
                Game.drawAISolution();
            }
            else if (event.key === "ArrowUp") {
                Resolution.setFontSize(Resolution.fontSize+2);
                Game.updateImagesPosition();
            }
            else if (event.key === "ArrowDown") {
                Resolution.setFontSize(Resolution.fontSize-2);
                Game.updateImagesPosition();
            }
        });

        Game.startNode = GameMap.nodes[0];

        Game.playerScoreElem = document.getElementById("score-player").getElementsByTagName("div")[0];
        Game.robotScoreElem = document.getElementById("score-robot").getElementsByTagName("div")[0];
        Game.scoreCompareElem = document.getElementById("score-compare");

        Game.canvasRect = Game.canvas.getBoundingClientRect();

        const x = Game.startNode.x;
        const y = Game.startNode.y;

        Game.startNodeSprite = new Sprite("./src/img/starting_node.svg", 100, x, y);

        // setup truck
        Game.player = new Sprite("./src/img/garbage_truck.svg", 150, x, y);
        Game.player.img.style.zIndex = 1;                                        // show on top of trash cans

        // setup robot
        Game.robot = new Sprite("./src/img/ai_robot.png", 100, x, y, false);
        Game.robot.img.style.zIndex = 1;
        
        // create sprites and save (they will be reused)
        const lastLevelNumTrash = Game.numTrashLevels[Game.numTrashLevels.length-1];
        for (let i=0; i<lastLevelNumTrash; i++) {
            Game.allTrashSprites[i] = new Sprite(Game.SRC_TRASH_FULL, 100, 0, 0, false);
        }
        Game.generateTrash(Game.numTrashLevels[Game.level]);
        
        // wait for all sprites to be loaded before moving trash
        const iId = setInterval(() => {
            let allLoaded = true;
            for (const sprite of Game.allTrashSprites) {
                if (!sprite.isLoaded) {
                    allLoaded = false;
                    break;
                }
            }
            if (allLoaded) {
                clearInterval(iId);
                Game.reset();
            }            
        }, 100);
        
        Game.canvas.addEventListener('click', Game.onClick);
    }

    static onClick(event) {
        if (Game.gameOver || Game.ignoreClicks) {
            return;
        }

        const radius = 7 * Resolution.circleRadius;     // not necessary to press exactly on the circle (outside is ok)
        
        const x = event.clientX - Game.canvasRect.x;
        const y = event.clientY - Game.canvasRect.y;
        const clickedNode = GameMap.nodes.find(node => Math.hypot(node.x-x, node.y-y) < radius);

        // if neighbor
        if (GameMap.graph.getNeighborEdges(Game.playerCurrentNode).find(edge => edge.to == clickedNode)) {

            const oldPlayerScore = Game.playerScore;
            const edgeWeight = GameMap.graph.getWeight(Game.playerCurrentNode, clickedNode) * Resolution.SCALE;

            Game.player.setHorizontalFlip(clickedNode.x < Game.playerCurrentNode.x)


            Game.drawLine(Game.playerCurrentNode, clickedNode, Game.PLAYER_PATH_COLOR, Game.PLAYER_LINE_WIDTH);
            Game.playerCurrentNode = clickedNode;

            function onFinish() {

                if (!Game.playerTrashCollected.includes(clickedNode) && Game.emptyTrash(clickedNode)) {
                    Game.playerTrashCollected.push(clickedNode);

                    // start blinking for startNode
                    if (Game.playerTrashCollected.length == Game.trash.length) {
                        Game.startNodeSprite.setClass("zoom-animation", true);
                    }
                };

                if (Game.playerCurrentNode == Game.startNode && Game.playerTrashCollected.length == Game.trash.length){
                    Game.gameOver = true;

                    Game.updatePlayerScoreText(true);
                    Game.drawAISolution();
                    Game.startNodeSprite.setClass("zoom-animation", false);
                }
                else {
                    Game.playerScore = oldPlayerScore + edgeWeight;
                    Game.updatePlayerScoreText();
                }

                Game.ignoreClicks = false;
            }

            function onNewFrame(progress) {
                Game.playerScore = oldPlayerScore + edgeWeight * progress;
                Game.updatePlayerScoreText();
            }

            Game.ignoreClicks = true;
            Game.player.moveToAnim(clickedNode.x, clickedNode.y, onFinish, onNewFrame);
        } 
    }

    // after resizing window or font
    static updateImagesPosition() {
        Game.canvasRect = Game.canvas.getBoundingClientRect();
        Game.player.moveTo(Game.playerCurrentNode.x, Game.playerCurrentNode.y);
        
        // Game.robot.moveTo(Game.robotCurrentNode);
        
        for (const sprite of Game.allTrashSprites) {
            for (const [node, spr] of Game.trash) {
                if (spr === sprite) {
                    sprite.moveTo(node.x, node.y);
                    break;
                }
            }
        }

        Game.startNodeSprite.moveTo(Game.startNode.x, Game.startNode.y);
    }

    static reset() {

        Game.ignoreClicks = true;

        const lastNode = Game.playerCurrentNode;

        // reset stats
        Game.gameOver = false;
        Game.playerScore = 0;
        Game.playerCurrentNode = Game.startNode;
        Game.playerMoving = false;
        Game.playerTrashCollected = [];

        Game.robotScore = 0;
        Game.updatePlayerScoreText();
        Game.updateRobotScoreText();

        // reset visuals
        Game.ctx.clearRect(0, 0, Game.canvasRect.width, Game.canvasRect.height);

        const elemCompare = document.getElementById("score-compare");
        elemCompare.style.backgroundColor = "lightgray";
        elemCompare.innerHTML = "Är du klurigare än en AI?";

        Game.drawNode(Game.startNode, '#0F0')

        for (const node of GameMap.nodes) {
            Game.drawNode(node, '#0003');
        }

        Game.player.reset(lastNode !== Game.startNode);
        Game.robot.reset();
        
        for (const sprite of Game.allTrashSprites) {
            sprite.reset()
        }

        for (const [node, sprite] of Game.trash) {
            sprite.moveTo(node.x, node.y);
            sprite.setVisibleAnim(true, () => {
                Game.ignoreClicks = false;
            });
        }

        document.getElementById("buttons").classList.remove("blinking-bg");
        
        Game.startNodeSprite.setClass("zoom-animation", false);
        
        for (const sprite of Game.allTrashSprites) {
            
            sprite.setClass("zoom-animation", false);

            // must wait for class to be removed
            const iId = setTimeout(() => {
                if (!sprite.img.classList.contains("zoom-animation")) {
                    sprite.setClass("zoom-animation", true);
                    clearInterval(iId);
                };
            }, 1000);
        }

    }

    static nextLevel(step) {
        Game.level += step;
        
        clearInterval(Game.player.intervalId);
        clearInterval(Game.robot.intervalId);
        for (const [_, sprite] of Game.trash) {
            clearInterval(sprite.intervalId);
        }

        Game.trash = [];
        Game.generateTrash();
        Game.reset();           // to redraw new trash
    }

    static updatePlayerScoreText(finished=false) {
        if (finished) {
            this.playerScoreElem.innerHTML = "✅ " + Math.floor(Game.playerScore) + " meter";
        }
        else {
            this.playerScoreElem.innerHTML = Math.floor(Game.playerScore) + " meter";
        }
    }
    
    static updateRobotScoreText(finished=false) {
        if (finished) {
            this.robotScoreElem.innerHTML = "✅ " + Math.floor(Game.robotScore) + " meter";
        }
        else {
            this.robotScoreElem.innerHTML = Math.floor(Game.robotScore) + " meter";
        }
    }

    static updateCompareScoreText() {
        Game.robotScore = Math.floor(Game.robotScore);
        Game.playerScore = Math.floor(Game.playerScore);
        
        const diff = Math.abs(Game.playerScore - Game.robotScore);
        let str;
        let color;

        if (Game.playerScore == Game.robotScore) {
            color = "lightgreen";
            str = `Du är lika klurig som en AI! <br>
                Du hittade en resväg som är lika kort som en AI:s.`;
        }
        else if (Game.playerScore < Game.robotScore) {
            color = "lightgreen";
            str = `Du är klurigare än en AI! <br>
                Du hittade en resväg som var ${diff} meter kortare än en AI:s.`;
        }
        else {
            color = "orange";
            str =
                `Bra försök! <br>
                Du hittade en resväg som var ${diff} meter längre än en AI:s.`;
        }

        Game.scoreCompareElem.style.backgroundColor = color;
        Game.scoreCompareElem.innerHTML = str;
        Game.scoreCompareElem.style.visibility = "visible";
    }

    static drawNode(node, color) {
        Game.ctx.fillStyle = color;
        Game.ctx.beginPath();
        Game.ctx.arc(node.x, node.y, Resolution.circleRadius, 0, Math.PI * 2);
        Game.ctx.fill();

        if (Game.drawNodeNumber) {
            Game.ctx.font = '30px Arial';             // Set font size and family
            Game.ctx.fillStyle = 'blue';              // Set text color
            Game.ctx.textAlign = 'center';            // Set text alignment
            Game.ctx.textBaseline = 'middle';         // Set text baseline
            Game.ctx.fillText(node.name, node.x+40, node.y);
        }

    }

    static drawLine(node1, node2, color, width) {
        Game.ctx.strokeStyle = color;
        Game.ctx.lineWidth = width;
        Game.ctx.beginPath();
        Game.ctx.moveTo(node1.x, node1.y);
        Game.ctx.lineTo(node2.x, node2.y);
        Game.ctx.stroke();
    }

    static generateTrash() {
        
        let nodesLeft = [...GameMap.nodes];

        for (let i=0; i<Game.numTrashLevels[Game.level]; i++) {
            
            // pick random trash
            const randIdx = Math.floor(Math.random() * (nodesLeft.length - 1) + 1);
            const node = nodesLeft.splice(randIdx, 1)[0];

            Game.trash[i] = [node, Game.allTrashSprites[i]];
            
        }
    }

    static drawAISolution() {
        
        UI.setButtonsEnabled(false);

        const robotThinkingTime = 500;     // delay before making next turn (in ms)

        Game.robot.setVisibleAnim(true, (totalDur) => {
            setTimeout(moveToNextNode, totalDur+robotThinkingTime);
            // wait for trash to be refilled (first they are minimized, then maximized; i.e. 2 anim cycles)
        });

        // find solution
        const start = GameMap.nodes[0];
        
        let nodeTargets = [];
        for (const [node, _] of Game.trash) {
            nodeTargets.push(node);
        }     

        let robotPath = FindShortestPathAll(GameMap.graph, start, nodeTargets);

        let robotIdx = 0;      // first idx of `path`

        // refill trash
        for (const [_, sprite] of Game.trash) {
            sprite.setVisibleAnim(false, () => {
                sprite.img.src = Game.SRC_TRASH_FULL;
                sprite.setVisibleAnim(true);
                sprite.setClass("zoom-animation", true);
            });
        }

        Game.ctx.setLineDash([10, 10]);

        let oldRobotScore;
        let edgeWeight;
        let newNode;
        let robotTrashCollected = [];

        function moveToNextNode() {
            robotIdx++;

            if (robotIdx == robotPath.nodes.length) {
                Game.updateRobotScoreText(true);
                Game.updateCompareScoreText();
                Game.ctx.setLineDash([]);

                document.getElementById("buttons").classList.add("blinking-bg");
                Game.startNodeSprite.setClass("zoom-animation", false);
                UI.setButtonsEnabled(true);
                return;
            }

            newNode = robotPath.nodes[robotIdx];
            const oldNode = robotPath.nodes[robotIdx-1];

            Game.drawLine(oldNode, newNode, Game.ROBOT_PATH_COLOR, Game.ROBOT_LINE_WIDTH);

            oldRobotScore = Game.robotScore;
            edgeWeight = GameMap.graph.getWeight(oldNode, newNode) * Resolution.SCALE;
            Game.robot.moveToAnim(newNode.x, newNode.y, onFinish, onNewFrame);

        }

        function onFinish() {
            
            if (robotTrashCollected.length < Game.trash.length) {
                
                if (!robotTrashCollected.includes(newNode) && Game.emptyTrash(newNode)) {
                    robotTrashCollected.push(newNode);
                };
                
                if (robotTrashCollected.length == Game.trash.length) {
                    Game.startNodeSprite.setClass("zoom-animation", true);
                }
            }

            Game.robotScore = oldRobotScore + edgeWeight;
            Game.updateRobotScoreText();

            setTimeout(() => {
                moveToNextNode();       // wait before moving to next trash
            }, robotThinkingTime);
        }

        function onNewFrame(progress) {
            Game.robotScore = oldRobotScore + edgeWeight * progress;
            Game.updateRobotScoreText();
        }
    }

    static emptyTrash(node) {
        for (const [n, sprite] of Game.trash) {
            if (n == node) {
                sprite.img.src = Game.SRC_TRASH_EMPTY;
                sprite.setClass("zoom-animation", false);
                return true;
            }
        }
        return false;
    }

}
