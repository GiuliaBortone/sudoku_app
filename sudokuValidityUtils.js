function canBeAdded(matrix, value, row, column) {
    function isNotInRow() {
        for (let column = 0; column < 9; column++) {
            if (matrix[row][column] === value) {
                return false
            }
        }
        return true
    }

    function isNotInColumn() {
        for (let row = 0; row < 9; row++) {
            if (matrix[row][column] === value) {
                return false
            }
        }
        return true
    }

    function isNotInBox() {
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

    return isNotInRow() && isNotInColumn() && isNotInBox()
}