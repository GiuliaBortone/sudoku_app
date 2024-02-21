let mistakesLeft = 3

window.onload = function () {
    showMistakes()
    generateValidSudokuGrid()
    createGrid()
}

function showMistakes() {
    document.getElementById("mistakes").innerText = mistakesLeft.toString()
}

function createGrid() {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            let newTile = document.createElement("div")
            newTile.classList.add("tile")
            newTile.id = "tile-" + row + '-' + column

            if (column === 2 || column === 5) {
                newTile.classList.add("right-border")
            }

            if (row === 2 || row === 5) {
                newTile.classList.add("bottom-border")
            }

            document.getElementById("board").append(newTile)
            fillTile(newTile, fullMatrix[row][column])
        }
    }
}

function fillTile(tile, value) {
    if (value !== 0) {
        tile.innerText = value
    }
}