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
