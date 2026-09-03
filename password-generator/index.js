
const characters =["A","B","C","D","E","F","G","H","I",
    "J","K","L","M","N","O","P","Q","R","S","T","U","V",
    "W","X","Y","Z","a","b","c","d","e","f","g","h","i",
    "j","k","l","m","n","o","p","q","r","s","t","u","v",
    "w","x","y","z", "0", "1", "2", "3", "4", "5", "6", 
    "7", "8", "9","~","`","!","@","#","$","%","^","&","*",
    "(",")","_","-","+","=","{","[","}","]",",","|",":",";",
    "<",">",".","?","/"];

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

function getRandomChar() {
        let randomIndex = Math.floor( Math.random() * characters.length)
        return characters[randomIndex]
    
}
function changeTheme(event){ 
    document.body.setAttribute("data-theme", event.target.value)
}
function setLengthText() {
    textlength.textContent = "Length: "  + lengthSlider.value
}
