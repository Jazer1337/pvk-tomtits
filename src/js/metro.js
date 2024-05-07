import { nodes, graph } from "./map.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var gameOver = false;
var startNode;
var currentNode;
var count = 0;
var targets = []
var visited = []

// set **internal** size for canvas. Can be set in the element in html (or here in js) but not in css.
const dispWidth = 1920;
const dispHeight = 1080;

canvas.width = dispWidth;
canvas.height = dispHeight;


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
        const clickedNode = nodes.find(node => Math.hypot(node.x*dispWidth - x, node.y*dispHeight - y) < 10);

        if (graph.getNeighborEdges(currentNode).find(edge => edge.to == clickedNode)) {

            count += graph.getWeight(currentNode, clickedNode);
            drawLine(currentNode, clickedNode, '#F00');
            drawNode(currentNode, '#000')
            drawNode(clickedNode, '#0F0')
            currentNode = clickedNode
            
            visited[nodes.indexOf(clickedNode)] = true;

            if (currentNode == startNode && garbageCollected()){
                gameOver = true;
                document.getElementById("count").innerHTML = "Du kom tillbaka på " + (count * 100).toFixed(2) + " meter! Med alla sopor 😱"
            } else {
                document.getElementById("count").innerHTML = "Du har åkt " + (count * 100).toFixed(2) + " meter"
            }
        }
        

        console.log(count)
        
    });
}

function drawNode(node, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.x*dispWidth, node.y*dispHeight, 10, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(node1, node2, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(node1.x*dispWidth, node1.y*dispHeight);
    ctx.lineTo(node2.x*dispWidth, node2.y*dispHeight);
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
        drawNode(node, '#0003');
    }
    startNode = nodes[0];
    visited = new Array(nodes.length)
}

function initialDraw() {

    drawNode(startNode, '#0F0')
    currentNode = startNode;

    for (let i = 0; i < visited.length; i++) {
        visited[i] = false;
    }
}
