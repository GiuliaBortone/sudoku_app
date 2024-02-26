import {deepCopy} from "./utils.js";
import {canBeAdded} from "./sudokuValidityUtils.js";

const difficulties = {
    easy: {minClues: 36},
    medium: {minClues: 32},
    hard: {minClues: 28}
}

export function generateSudoku(chosenDifficulty) {
    const fullMatrix = generateValidSudoku()
    return removeCellsFromSudoku(chosenDifficulty, fullMatrix)
}

function generateValidSudoku() {
    let fullMatrix = []

    function initialiseEmptyMatrix() {
        for (let i = 0; i < 9; i++) {
            let row = []

            for (let j = 0; j < 9; j++) {
                row.push(0)
            }

            fullMatrix.push(row)
        }
    }

    function fillMainDiagonalBoxes() {
        for (let start = 0; start < 9; start += 3) {
            const boxContent = createArrayWithRandomlyOrderedOneToNineNumbers()
            let current = 0

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    fullMatrix[start + i][start + j] = boxContent[current]
                    current++
                }
            }
        }
    }

    function createArrayWithRandomlyOrderedOneToNineNumbers() {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        return shuffleFisherYatesAlgorithm(array)
    }

    function shuffleFisherYatesAlgorithm(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }

        return array;
    }

    function fillRemainingCells(startingRow, startingColumn) {
        if (startingColumn >= 9) {
            startingRow += 1
            startingColumn = 0
        }

        if (startingRow >= 9) {
            return true
        }

        if (fullMatrix[startingRow][startingColumn] !== 0) {
            return fillRemainingCells(startingRow, startingColumn + 1)
        }

        for (let newValue = 1; newValue <= 9; newValue++) {
            if (canBeAdded(fullMatrix, newValue, startingRow, startingColumn)) {
                fullMatrix[startingRow][startingColumn] = newValue

                if (fillRemainingCells(startingRow, startingColumn + 1)) {
                    return true
                }
                fullMatrix[startingRow][startingColumn] = 0
            }
        }

        return false
    }

    initialiseEmptyMatrix()
    fillMainDiagonalBoxes()
    fillRemainingCells(0, 3)

    return fullMatrix
}

function removeCellsFromSudoku(chosenDifficulty, fullMatrix) {
    function removeCells() {
        const minClues = difficulties[chosenDifficulty].minClues
        let remainingClues = 81
        let modifiedMatrix = deepCopy(fullMatrix)

        while (remainingClues > minClues) {
            const randomRow = Math.floor(Math.random() * 9);
            const randomColumn = Math.floor(Math.random() * 9);
            const savedValue = modifiedMatrix[randomRow][randomColumn]

            if (savedValue === 0) {
                continue
            }

            modifiedMatrix[randomRow][randomColumn] = 0
            if (!isSolvable(deepCopy(modifiedMatrix))) {
                modifiedMatrix[randomRow][randomColumn] = savedValue
                continue
            }

            remainingClues--
        }

        return deepCopy(modifiedMatrix)
    }

    function isSolvable(matrix) {
        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {
                if (matrix[row][column] !== 0) {
                    continue
                }

                for (let value = 1; value <= 9; value++) {
                    if (!canBeAdded(matrix, value, row, column)) {
                        continue
                    }

                    matrix[row][column] = value
                    if (isSolvable(matrix)) {
                        return true
                    }
                    matrix[row][column] = 0
                }
                return false
            }
        }
        return true
    }

    return removeCells()
}
