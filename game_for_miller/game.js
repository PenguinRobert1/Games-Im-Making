// Script.js
const numRows = 16;
const numCols = 16;
const numMines = 40;

const gameBoard =
    document.getElementById(
        "gameBoard"
    );
let board = [];

function initializeBoard() {
    for (let i = 0; i < numRows; i++) {
        board[i] = [];
        for (
            let j = 0;
            j < numCols;
            j++
        ) {
            board[i][j] = {
                isMine: false,
                revealed: false,
                count: 0,
            };
        }
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        const row = Math.floor(
            Math.random() * numRows
        );
        const col = Math.floor(
            Math.random() * numCols
        );
        if (!board[row][col].isMine) {
            board[row][
                col
            ].isMine = true;
            minesPlaced++;
        }
    }

    // Calculate counts
    for (let i = 0; i < numRows; i++) {
        for (
            let j = 0;
            j < numCols;
            j++
        ) {
            if (!board[i][j].isMine) {
                let count = 0;
                for (
                    let dx = -1;
                    dx <= 1;
                    dx++
                ) {
                    for (
                        let dy = -1;
                        dy <= 1;
                        dy++
                    ) {
                        const ni =
                            i + dx;
                        const nj =
                            j + dy;
                        if (
                            ni >= 0 &&
                            ni <
                                numRows &&
                            nj >= 0 &&
                            nj <
                                numCols &&
                            board[ni][
                                nj
                            ].isMine
                        ) {
                            count++;
                        }
                    }
                }
                board[i][j].count =
                    count;
            }
        }
    }
}

function revealCell(row, col) {
    if (flagMode) {
        // Place or remove a flag only on hidden slots
        if (!board[row][col].revealed) {
            // Calculate the correct cell index in the DOM
            const cellIndex = row * numCols + col;
            const cell = gameBoard.children[cellIndex];

            if (cell.classList.contains("flag")) {
                cell.classList.remove("flag");
                cell.textContent = "";
            } else {
                cell.classList.add("flag");
                cell.textContent = "🚩";
            }
        }
        return;
    }

    if (
        row < 0 ||
        row >= numRows ||
        col < 0 ||
        col >= numCols ||
        board[row][col].revealed
    ) {
        return;
    }

    board[row][col].revealed = true;

    if (board[row][col].isMine) {
        // Handle game over
        alert("Game Over! You stepped on a mine.");
        location.reload(); // Refresh the tab
    } else if (board[row][col].count === 0) {
        // If cell has no mines nearby,
        // Reveal adjacent cells
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                revealCell(row + dx, col + dy);
            }
        }
    }

    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = "";

    for (let i = 0; i < numRows; i++) {
        for (
            let j = 0;
            j < numCols;
            j++
        ) {
            const cell =
                document.createElement(
                    "div"
                );
            cell.className = "cell";
            if (board[i][j].revealed) {
                cell.classList.add(
                    "revealed"
                );
                if (
                    board[i][j].isMine
                ) {
                    cell.classList.add(
                        "mine"
                    );
                    cell.textContent =
                        "????";
                } else if (
                    board[i][j].count >
                    0
                ) {
                    cell.textContent =
                        board[i][
                            j
                        ].count;
                }
            }
            cell.addEventListener(
                "click",
                () => revealCell(i, j)
            );
            gameBoard.appendChild(cell);
        }
        gameBoard.appendChild(
            document.createElement("br")
        );
    }
}

initializeBoard();
renderBoard();

let flagMode = false; // Default to clear mode

// Toggle flag mode
document.getElementById("toggle-mode").addEventListener("click", () => {
    flagMode = !flagMode;
    const toggleButton = document.getElementById("toggle-mode");
    toggleButton.textContent = flagMode ? "Switch to Clear Mode" : "Switch to Flag Mode";
});