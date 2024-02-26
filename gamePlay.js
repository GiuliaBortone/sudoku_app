import {selectDigitToInsert} from "./digitsPad.js";
import {isNotADouble} from "./sudokuValidityUtils.js";
import {selection} from "./globalVariables.js";

export function selectTileToInsertNumber(tile, matrixInPlay, startingMatrix) {
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
        let mistakesCount = 0

        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {
                if (startingMatrix[row][column] !== 0) {
                    continue
                }

                if (isNotADouble(matrixInPlay, row, column)) {
                    document.getElementById(row + "-" + column).classList.add("undo-mistake")
                    continue
                }

                document.getElementById(row + "-" + column).classList.add("mistake")
                document.getElementById(row + "-" + column).classList.remove("undo-mistake")
                mistakesCount++
            }
        }

        if (mistakesCount === 0) {
            wonGame()
        }
    }

    function wonGame() {
        document.querySelector('.win').classList.add("show-win")
        document.querySelectorAll('.number').forEach(digit =>
            digit.removeEventListener('click', selectDigitToInsert)
        )

        document.querySelectorAll('.tile').forEach(tile =>
            tile.removeEventListener('click', selectTileToInsertNumber)
        )
    }

    if (selection.selectedNumber === null) {
        return
    }

    tile.innerText = selection.selectedNumber.id

    const coordinates = tile.id.split("-")
    const row = parseInt(coordinates[0])
    const column = parseInt(coordinates[1])

    matrixInPlay[row][column] = parseInt(tile.innerText)
    document.getElementById(row + "-" + column).classList.remove("mistake")

    checkEndGame()
}
