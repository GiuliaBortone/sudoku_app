import {generateSudoku} from "./sudokuGenerator.js";
import {insertDigitsPad} from "./digitsPad.js";
import {selectTileToInsertNumber} from "./gamePlay.js";
import {deepCopy} from "./utils.js";
import {selection} from "./globalVariables.js";

window.onload = function () {
    newGame("easy")
    insertDigitsPad()
}

let matrixInPlay = []
let startingMatrix = []

function resetGame() {
    deleteGrid()
    selection.selectedNumber = null
    selection.selectedTile = null
}

function deleteGrid() {
    const oldTiles = document.querySelectorAll('.tile');

    oldTiles.forEach(function (tile) {
        tile.parentNode.removeChild(tile)
    })
}

function newGame(mode) {
    startingMatrix = generateSudoku(mode)
    matrixInPlay = deepCopy(startingMatrix)
    createGrid()
}

document.getElementById("easy").addEventListener('click', function () {
    resetGame()
    newGame("easy")
})

document.getElementById("medium").addEventListener('click', function () {
    resetGame()
    newGame("medium")
})

document.getElementById("hard").addEventListener('click', function () {
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
            fillTile(newTile, matrixInPlay[row][column])
        }
    }
}

function fillTile(tile, value) {
    if (value !== 0) {
        tile.innerText = value
        tile.classList.add("beginning-tile")
        return
    }

    tile.addEventListener('click', (event) => selectTileToInsertNumber(event.currentTarget, matrixInPlay, startingMatrix))
}