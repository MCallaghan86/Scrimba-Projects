/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/


let lengthEl = document.getElementById("conversion-length")
let volumeEl = document.getElementById("conversion-volume")
let massEl = document.getElementById("conversion-mass")

let convertBtn = document.getElementById("convert-btn")

convertBtn.addEventListener("click", function() {
    let userInput = Number(document.getElementById("user-input").value)
    lengthEl.textContent = `${userInput} meters = ${(userInput * 3.281).toFixed(3)} feet | ${userInput} feet = ${(userInput/3.281).toFixed(3)} meters`
    volumeEl.textContent = `${userInput} liters = ${(userInput * 0.264).toFixed(3)} gallons | ${userInput} gallons = ${(userInput/0.264).toFixed(3)} liters`
    massEl.textContent = `${userInput} kilograms = ${(userInput * 2.204).toFixed(3)} pounds | ${userInput} pounds = ${(userInput/2.204).toFixed(3)} kilograms`
})

document.getElementById("theme-select").addEventListener("change", changeTheme)

function changeTheme(event){ 
    document.body.setAttribute("data-theme", event.target.value)
}