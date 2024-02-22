window.onload = function () {
    newGame("easy")
}

function resetGame() {
    deleteGrid()
    selectedNumber = null;
    selectedTile = null;
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
    insertDigitsPad()
}

document.getElementById("easy").addEventListener('click', function() {
    resetGame()
    newGame("easy")
})

document.getElementById("medium").addEventListener('click', function() {
    resetGame()
    newGame("medium")
})

document.getElementById("hard").addEventListener('click', function() {
    resetGame()
    newGame("hard")
})

function createGrid() {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            let newTile = document.createElement("div")
            newTile.classList.add("tile")
            newTile.id = row + "-" + column

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
        tile.classList.add("beginning-tile")
        return
    }

    tile.addEventListener('click', selectTileToInsertNumber)
}

function insertDigitsPad() {
    for (let digit = 1; digit <= 9; digit++) {
        let number = document.createElement("div")
        number.id = digit.toString()
        number.innerText = digit.toString()
        number.classList.add("number")

        document.getElementById("digits").appendChild(number)

        number.addEventListener('click', selectDigitToInsert)
    }
}

function selectDigitToInsert() {
    if (selectedNumber != null) {
        selectedNumber.classList.remove("selected-digit")
    }

    selectedNumber = this
    selectedNumber.classList.add("selected-digit")
}

function selectTileToInsertNumber() {
    if (selectedNumber === null) {
        return
    }

    this.innerText = selectedNumber.id

    const coordinates = this.id.split("-")
    const row = parseInt(coordinates[0])
    const column = parseInt(coordinates[1])

    matrixInPlay[row][column] = parseInt(this.innerText)
    document.getElementById(row + "-" + column).classList.remove("mistake")
    document.getElementById(row + "-" + column).classList.add("undo-mistake")

    checkEndGame()
}

function checkEndGame() {
    if (hasZerosLeft()) {
        return
    }

    checkSolutionValidity()
}

function hasZerosLeft() {
    return matrixInPlay.flatMap(row => row).some(element => element === 0)
}

function checkSolutionValidity() {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (playableMatrix[row][column] !== 0) {
                continue
            }

            if (isNotADouble(row, column)) {
                document.getElementById(row + "-" + column).classList.add("undo-mistake")
                continue
            }

            document.getElementById(row + "-" + column).classList.add("mistake")
            document.getElementById(row + "-" + column).classList.remove("undo-mistake")
        }
    }
}