
document.getElementById("getcolor-btn").addEventListener('click', renderColors)


function renderColors() {
   const color = document.getElementById("color-picker").value.replace('#','')
   
   const mode = document.getElementById("scheme-picker").value
   fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`, {method: "GET"})
    .then(res => res.json())
    .then(data => {
        const hexValues = data.colors.map(colorObj => colorObj.hex.value)
        hexValues.forEach((hex,index) => {
            const colorDiv = document.getElementById(`color-${index + 1}`)
            colorDiv.style.backgroundColor = hex
            colorDiv.dataset.hex = hex
            const hexP = document.getElementById(`hex-${index + 1}`)
            hexP.textContent = hex
            hexP.dataset.hex = hex
        }) 

    });
    
}

document.body.addEventListener("click", e => {
    if(e.target.dataset.hex) {
        const targetHex = e.target.dataset.hex
        navigator.clipboard.writeText(targetHex)
        const targetText = document.querySelector(`.hex-values[data-hex="${targetHex}"]`)
        targetText.textContent = "Copied!"
        setTimeout(() => targetText.textContent = targetHex, 1000)
    }
})

document.getElementById("theme-select").addEventListener("change", changeTheme)

function changeTheme(event){ 
    document.body.setAttribute("data-theme", event.target.value)
}

renderColors()