import {selection} from "./globalVariables.js";

export function insertDigitsPad() {
    for (let digit = 1; digit <= 9; digit++) {
        let number = document.createElement("div")
        number.id = digit.toString()
        number.innerText = digit.toString()
        number.classList.add("number")

        document.getElementById("digits").appendChild(number)

        number.addEventListener('click', selectDigitToInsert)
    }
}

export function selectDigitToInsert() {
    if (selection.selectedNumber != null) {
        selection.selectedNumber.classList.remove("selected-digit")
    }

    selection.selectedNumber = this
    selection.selectedNumber.classList.add("selected-digit")
}
