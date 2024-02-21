function generateValidSudokuGrid() {
    let matrix = initialiseEmptyMatrix()
    fillMainDiagonalBoxes(matrix)

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
