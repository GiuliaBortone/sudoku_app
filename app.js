window.onload = function () {
    newGame("easy")
}

function deleteGrid() {
    const oldTiles = document.querySelectorAll('.tile');

    oldTiles.forEach(function (tile) {
        tile.parentNode.removeChild(tile)
    })
}

function newGame(mode) {
    generateValidSudokuGrid()
    removeCells(mode)
    createGrid()
}

document.getElementById("easy").addEventListener('click', function() {
    deleteGrid()
    newGame("easy")
})

document.getElementById("medium").addEventListener('click', function() {
    deleteGrid()
    newGame("medium")
})

document.getElementById("hard").addEventListener('click', function() {
    deleteGrid()
    newGame("hard")
})

function createGrid() {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            let newTile = document.createElement("div")
            newTile.classList.add("tile")
            newTile.classList.add("beginning-tile")
            newTile.id = "tile-" + row + "-" + column

            if (column === 2 || column === 5) {
                newTile.classList.add("right-border")
            }

            if (row === 2 || row === 5) {
                newTile.classList.add("bottom-border")
            }

            document.getElementById("board").append(newTile)
            fillTile(newTile, playableMatrix[row][column])
        }
    }
}

function fillTile(tile, value) {
    if (value !== 0) {
        tile.innerText = value
    }
}

