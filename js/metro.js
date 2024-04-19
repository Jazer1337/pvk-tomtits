const canvas = document.getElementById('metroCanvas');
const ctx = canvas.getContext('2d');
const nodes = [];
var gameOver = false;
var startNode = null;
var currentNode;
var count = 0;
var targets = []
var adjacencyMatrix = []
var visited = []

export function setup() {
    document.getElementById("count").innerHTML = "Hämta sopor i alla blåa noder och ta dig sedan tillbaka till sopstation längst upp till vänster";
    
    generateMap()
    initialDraw()
    generateGarbage(3)

    canvas.addEventListener('click', function(e) {
        if (gameOver) {
            return
        }
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const clickedNode = nodes.find(node => Math.hypot(node.x - x, node.y - y) < 10);
        
    

        if (adjacencyMatrix[nodes.indexOf(currentNode)][nodes.indexOf(clickedNode)] == 1){
            count++;
            drawLine(currentNode.x, currentNode.y, clickedNode.x, clickedNode.y, '#F00');
            drawNode(currentNode.x, currentNode.y, '#000')
            drawNode(clickedNode.x, clickedNode.y, '#0F0')
            currentNode = clickedNode
            
            visited[nodes.indexOf(clickedNode)] = true;

            if (currentNode == startNode && garbageCollected()){
                gameOver = true;
                document.getElementById("count").innerHTML = "Du kom tillbaka på " + count + " steg! Med alla sopor 😱"
            } else {
                document.getElementById("count").innerHTML = "Du har åkt " + count + " steg"
            }
        }
        

        console.log(count)
        
    });
}


function makeNode(x, y){
    drawNode(x, y, '#000')
    nodes.push({x, y})
}

function drawNode(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(x1, y1, x2, y2, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function generateGarbage(amount){
    for (let i = 0; i < amount; i++) {
        
        const randomIndex = Math.floor(Math.random() * (nodes.length - 1) + 1)
        targets.push(randomIndex);
        drawNode(nodes[randomIndex].x, nodes[randomIndex].y, '#00F')

    }
}

function garbageCollected() {
    for (let i = 0; i < targets.length; i++) {
        if (visited[targets[i]] == false){
            return false
        }
    }
    return true
    
}

function generateMap() {
    makeNode(100, 100)
    makeNode(200, 100)
    makeNode(300, 100)
    makeNode(200, 300)
    makeNode(100, 300)
    makeNode(150, 100)
    makeNode(100, 200)
    makeNode(150, 200)

    startNode = nodes[0]
    visited = new Array(nodes.length)


    adjacencyMatrix = [
        [0, 0, 0, 0, 0, 1, 1 ,0],
        [0, 0, 1, 1, 0, 1, 0 ,0],
        [0, 1, 0, 0, 0, 0, 0 ,0],
        [0, 1, 0, 0, 1, 0, 0 ,0],
        [0, 0, 0, 1, 0, 0, 1 ,0],
        [1, 1, 0, 0, 0, 0, 0 ,0],
        [1, 0, 0, 0, 1, 0, 0 ,1],
        [0, 0, 0, 0, 0, 0, 1 ,0],
      ];

}

function initialDraw() {
    for (let i = 0; i < adjacencyMatrix.length; i++) {
        for (let u = i; u < adjacencyMatrix.length; u++) {
            if (adjacencyMatrix[i][u] == 1) {
                drawLine(nodes[i].x, nodes[i].y, nodes[u].x, nodes[u].y, '#000')
            }
        } 
    }


    drawNode(startNode.x, startNode.y, '#0F0')
    currentNode = startNode;

    for (let i = 0; i < visited.length; i++) {
        visited[i] = false;
    }
}
