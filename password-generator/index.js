
let letters = ["A","B","C","D","E","F","G","H","I",
    "J","K","L","M","N","O","P","Q","R","S","T","U","V",
    "W","X","Y","Z","a","b","c","d","e","f","g","h","i",
    "j","k","l","m","n","o","p","q","r","s","t","u","v",
    "w","x","y","z"];

let numbers = ["0", "1", "2", "3", "4", "5", "6", 
    "7", "8", "9"];

let symbols = ["~","`","!","@","#","$","%","^","&","*",
    "(",")","_","-","+","=","{","[","}","]",",","|",":",";",
    "<",">",".","?","/"];
let characters = []

let passwordEls = document.querySelectorAll(".password-el")



let lengthSlider = document.getElementById("length-slider")
let textlength = document.getElementById("length-label")

document.getElementById("theme-select").addEventListener("change", changeTheme)
document.getElementById("length-slider").addEventListener("input", setLengthText)
setLengthText()

function generatePasswords() {
    for (let j=0; j<passwordEls.length; j++) {
        let password = ""
    for (let i=0; i<parseInt(lengthSlider.value); i++) {
        password += getRandomChar()
        }
        passwordEls[j].textContent = password
    }
}

function isNumbersChecked() {
    numCheck = document.getElementById("num-check").checked
    return 
}

function isSymbolsChecked() {
    symbolCheck = document.getElementById("symbol-check").checked
    return 
}

function setCharacters() {
    isNumbersChecked()
    isSymbolsChecked()
    if (numCheck && symbolCheck) {
        let characters = letters.concat(numbers, symbols)
        return characters
    } else if (numCheck) {
        let characters = letters.concat(numbers)
        return characters
    } else if (symbolCheck) {
        let characters = letters.concat(symbols)
        return characters
    } else {
        let characters = letters
        return characters
    }
}

function getRandomChar() {
        characters = setCharacters()
        let randomIndex = Math.floor( Math.random() * characters.length)
        return characters[randomIndex]
    }

function changeTheme(event){ 
    document.body.setAttribute("data-theme", event.target.value)
}
function setLengthText() {
    textlength.textContent = "Length: "  + lengthSlider.value
}


function copyToClipboard (btn) {
    let pEl = btn.parentElement.querySelector("p")
    let newClip = pEl.textContent
    navigator.clipboard.writeText(newClip)

    let tooltip = btn.querySelector(".copy-tooltip")
    tooltip.classList.add("show")
    setTimeout(() => tooltip.classList.remove("show"), 1500)
}


/*function copyToClipboard (btn) {
    let pEl = btn.parentElement.querySelector("p")
    let newClip = pEl.textContent
    navigator.clipboard.writeText(newClip)
    alert("Copied to clipboard.")
} */