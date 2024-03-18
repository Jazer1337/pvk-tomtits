    /* For creating and tracking nodes*/
    const numberOfNodes = 10; // Later replaced with difficulty and case-statements
    var nodesCreated = 0;
    var nodesTraversed = 0;
    var pathDistance = 0;

    /* Table structure for the map*/
    function createTable(rows, columns) {
        const table = new Array(rows);
        for (let i = 0; i < rows; i++) {
            table[i] = new Array(columns).fill(0);
        }
        return table;
    }

    // Helper function for adding left + right click
    function clickLogic(cell) {
        // Left click
        cell.addEventListener('click', function(event) {
            if (!cell.classList.contains('traversed')) {
                cell.classList.add('traversed');         
                pathDistance++;                          
                if (cell.classList.contains('node')) {
                    nodesTraversed++;                       
                }
            }
            winLogic();
        });
        
        // Right click
        cell.addEventListener('contextmenu', function(event) {
            if (cell.classList.contains('traversed')) {
                cell.classList.remove('traversed');         
                pathDistance--;                              
                if (cell.classList.contains('node')) {
                    nodesTraversed--;                        
                }
            }
        });
    }

    function winLogic() {
        console.log('winLogic function called.');
        if (nodesTraversed >= numberOfNodes) {
            console.log('nodesTraversed >= numberOfNodes passed');
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
            event.preventDefault();
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

    // Will later be replaced with difficulty and case-statements
    const rows = 9;
    const columns = 16;
    const myTable = createTable(rows, columns);
    renderTable(myTable);