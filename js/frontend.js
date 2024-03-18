/* frontend.js
 * Original code by Roger Chen
 * From then on co-authored with Christofer Gärtner
 */

// For creating and tracking nodes
// I don't understand the below comment, but I assume that the plan is to
// replace with enums?

// Later replaced with difficulty and case-statements
const numberOfNodes = 10;
var nodesCreated = 0;
var nodesTraversed = 0;
var pathDistance = 0;

// Table structure for the map
function createTable(rows, columns) {
    const table = new Array(rows);
    for (let i = 0; i < rows; i++) {
        table[i] = new Array(columns).fill(0);
    }
    return table;
}

/* clickLogic
 *
 * Implements functionality for left and right mouse clicks
 */
function clickLogic(cell) {
    const LEFT_MOUSE = 'click';
    const RIGHT_MOUSE = 'contextmenu';

    cell.addEventListener(LEFT_MOUSE, function(event) {
        if (!cell.classList.contains('traversed')) {
            // Add the 'traversed' class
            cell.classList.add('traversed');
            pathDistance++;
            if (cell.classList.contains('node')) {
                nodesTraversed++;
            }
        }
        winLogic();
    });
    
    cell.addEventListener(RIGHT_MOUSE, function(event) {
        if (cell.classList.contains('traversed')) {
            cell.classList.remove('traversed');          // Remove the 'traversed' class
            pathDistance--;
            if (cell.classList.contains('node')) {
                nodesTraversed--;
            }
        }
    });
}

// TODO: not have a function purely relying on side effects
function winLogic() {
    console.log('winLogic function called.'); // Log to check if winLogic is being called
    if (nodesTraversed >= numberOfNodes) {
        console.log('nodesTraversed >= numberOfNodes passed'); // Log to check if winLogic is being called
        const result = window.confirm(`Congratulations! You have traversed all nodes. Path distance: ${pathDistance}. Do you want to play again?`);
        if (result) {
            resetGame();
        }
    }
}

// Resets game state
function resetGame() {
    // Remove the traversed class from all tds
    const traversedCells = document.querySelectorAll('.traversed');
    traversedCells.forEach(cell => {
        cell.classList.remove('traversed');
    });

    // Set variables to default value
    nodesCreated = 0;
    nodesTraversed = 0;
    pathDistance = 0;
}

function renderTable(table) {
    const body = document.body;
    const tableElement = document.createElement('table');

    tableElement.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent default right-click pop-up
    });

    for (let i = 0; i < table.length; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < table[i].length; j++) {
            const cell = document.createElement('td');
            cell.textContent = table[i][j];

            clickLogic(cell);

            // We are hard coding nodes/maps later so this is not relevant, purely for testing
            if (Math.random() < 0.1 && nodesCreated < numberOfNodes) {
                cell.classList.add('node');
                nodesCreated++;
            }

            row.appendChild(cell);
        }
        tableElement.appendChild(row);
    }
    body.appendChild(tableElement);
}

// TODO: Difficulty enum and switch-statement
const rows = 9;
const columns = 16;
const myTable = createTable(rows, columns);
renderTable(myTable);

