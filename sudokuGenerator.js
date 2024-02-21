function generateValidSudokuGrid() {
    let matrix = initialiseEmptyMatrix()
    fillMainDiagonalBoxes(matrix)
    fillRemainingCells(matrix, 0, 3)

    return matrix
}

function initialiseEmptyMatrix() {
    let matrix = []

    for (let i = 0; i < 9; i++) {
        let row = []

        for (let j = 0; j < 9; j++) {
            row.push(0)
        }

        matrix.push(row)
    }

    return matrix
}

function fillMainDiagonalBoxes(matrix) {
    for (let start = 0; start < 9; start += 3) {
        const boxContent = createArrayWithRandomlyOrderedOneToNineNumbers()
        let current = 0

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                matrix[start + i][start + j] = boxContent[current]
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

function fillRemainingCells(matrix, startingRow, startingColumn) {
    if (startingColumn >= 9) {
        startingRow += 1
        startingColumn = 0
    }

    if (startingRow >= 9) {
        return true
    }

    if (matrix[startingRow][startingColumn] !== 0) {
        return fillRemainingCells(matrix, startingRow, startingColumn + 1)
    }

    for (let newValue = 1; newValue <= 9; newValue++) {
        if (canBeAdded(newValue, matrix, startingRow, startingColumn)) {
            matrix[startingRow][startingColumn] = newValue

            if (fillRemainingCells(matrix, startingRow, startingColumn + 1)) {
                return true
            }
            matrix[startingRow][startingColumn] = 0
        }
    }

    return false
}

function canBeAdded(newValue, matrix, startingRow, startingColumn) {
    return isNotInRow(newValue, matrix, startingRow) &&
        isNotInColumn(newValue, matrix, startingColumn) &&
        isNotInBox(newValue, matrix, startingRow, startingColumn)
}

function isNotInRow(value, matrix, row) {
    for (let column = 0; column < 9; column++) {
        if (matrix[row][column] === value) {
            return false
        }
    }
    return true
}

function isNotInColumn(value, matrix, column) {
    for (let row = 0; row < 9; row++) {
        if (matrix[row][column] === value) {
            return false
        }
    }
    return true
}

function isNotInBox(value, matrix, row, column) {
    const startingRow = row - (row % 3)
    const startingColumn = column - (column % 3)

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[startingRow + i][startingColumn + j] === value) {
                return false
            }
        }
    }
    return true
}
