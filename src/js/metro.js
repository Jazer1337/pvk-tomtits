import { nodes, graph } from "./map.js";

const canvas = document.getElementById('metroCanvas');
const ctx = canvas.getContext('2d');

var gameOver = false;
var startNode;
var currentNode;
var count = 0;
var targets = []
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

        if (graph.getNeighborEdges(currentNode).find(edge => edge.to == clickedNode)) {

            count++;
            drawLine(currentNode, clickedNode, '#F00');
            drawNode(currentNode, '#000')
            drawNode(clickedNode, '#0F0')
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

function drawNode(node, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(node1, node2, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(node1.x, node1.y);
    ctx.lineTo(node2.x, node2.y);
    ctx.stroke();
}

function generateGarbage(amount){
    for (let i = 0; i < amount; i++) {
        
        const randomIndex = Math.floor(Math.random() * (nodes.length - 1) + 1)
        targets.push(randomIndex);
        drawNode(nodes[randomIndex], '#00F')

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
    for (let node of nodes) {
        drawNode(node, '#000');
    }
    startNode = nodes[0];
    visited = new Array(nodes.length)
}

function initialDraw() {

    for (let u of graph.getNodes()) {
        for (let edge of graph.getNeighborEdges(u)) {
            drawLine(u, edge.to, '#000');
        }
    }

    drawNode(startNode, '#0F0')
    currentNode = startNode;

    for (let i = 0; i < visited.length; i++) {
        visited[i] = false;
    }
}
