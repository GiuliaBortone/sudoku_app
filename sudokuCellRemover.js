const difficulties = {
    easy: {minClues: 36},
    medium: {minClues: 32},
    hard: {minClues: 28}
}

function removeCells(chosenDifficulty) {
    const minClues = difficulties[chosenDifficulty].minClues
    let remainingClues = 81
    let modifiedMatrix = [...fullMatrix]

    while (remainingClues > minClues) {
        const randomRow = Math.floor(Math.random() * 9);
        const randomColumn = Math.floor(Math.random() * 9);
        const savedValue = modifiedMatrix[randomRow][randomColumn]

        if (savedValue === 0) {
            continue
        }

        modifiedMatrix[randomRow][randomColumn] = 0
        remainingClues--

        // TODO check uniqueness
        // if (!hasUniqueSolution([...modifiedMatrix])) {
        //     modifiedMatrix[randomRow][randomColumn] = savedValue
        //     remainingClues++
        // }
    }

    playableMatrix = modifiedMatrix
}

