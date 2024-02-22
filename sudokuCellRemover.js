const difficulties = {
    easy: {minClues: 36},
    medium: {minClues: 32},
    hard: {minClues: 28}
}

function removeCells(chosenDifficulty) {
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

    playableMatrix = modifiedMatrix
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

function deepCopy(matrix) {
    return JSON.parse(JSON.stringify(matrix))
}