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
    let mistakesCount = 0

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