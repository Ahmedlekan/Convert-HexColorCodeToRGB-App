const hexInput = document.getElementById("hexInput")
const inputColor = document.getElementById("inputColor")
const alteredColor = document.getElementById("alteredColor")
const alteredColorText = document.getElementById("alteredColorText")
const sliderText = document.getElementById("sliderText")
const slider = document.getElementById("slider")
const lightenText = document.getElementById("lightenText")
const darkenText = document.getElementById("darkenText")
const toggleBtn = document.getElementById("toggleBtn")
const bgBtn = document.getElementById("bg-btn")

// The backgroun color

const color = ["#255c31", "#0f135c", "#b30761", "#ffa600", "#8d9009", "#162f0f", "#02061a", "#832f5d"]

let i = 0
bgBtn.addEventListener("click", ()=>{
    i = i < color.length ? ++i : 0
    document.querySelector("body").style.backgroundColor = color[i] 
})

// Display Color from User Input 

hexInput.addEventListener("keyup", ()=>{
    const hex = hexInput.value
    if (!isValidHex(hex)) return;

    const strippedHex = hex.replace("#", "")
    inputColor.style.background =  "#" + strippedHex

    reset()
})

// Checking for valid Hex color

const isValidHex = (hex)=>{
    if (!hex) return false

    const strippedHex = hex.replace("#", "")
    return strippedHex.length === 3 || strippedHex.length ===6
}

// Convert hex to rgb

const convertHexToRgb = (hex) =>{
    if (!isValidHex(hex)) return null;

    let strippedHex = hex.replace("#", '')

    if (strippedHex.length === 3){
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2]
    }
    
    const r = parseInt(strippedHex.substring(0, 2), 16)
    const g = parseInt(strippedHex.substring(2, 4), 16)
    const b = parseInt(strippedHex.substring(4, 6), 16)

    return {r, g, b}
}

// Converting rgb to hex

function convertRgbToHex (r,g,b){
    const firstPair = ("0" + r.toString(16)).slice(-2)
    const secondPair = ("0" + g.toString(16)).slice(-2)
    const thirdPair = ("0" + b.toString(16)).slice(-2)

    const hex = "#" + firstPair + secondPair + thirdPair
    return hex
}


// altering the color percentage by dividing the color percentage and updating the
// new rgb color

const alterColor = (hex, percentage) => {
    const {r,g,b} = convertHexToRgb(hex)
    const amount = Math.floor((percentage/100)* 255)

    const newR = increaseBetween255To0(r, amount)
    const newG = increaseBetween255To0(g, amount)
    const newB = increaseBetween255To0(b, amount)
    
    console.log(newR, newG, newB)
    return convertRgbToHex(newR, newG, newB)
}

// Making sure the value does not exceed 255 - 0

function increaseBetween255To0(hex, amount){
    const newHex = hex + amount

    if (newHex > 255) return 255;
    if (newHex < 0) return 0;
    return newHex
}

// getting the value of the slider input

slider.addEventListener("input", ()=>{
    // check if the input does not equal to hex value
    if(!isValidHex(hexInput.value)) return;
    sliderText.textContent = `${slider.value}%`

    // value btw postive and negative input of the color
    const valueAddition = 
    toggleBtn.classList.contains("toggled") ? -slider.value : slider.value

    //get the altered hex value
    const alteredHex = alterColor(hexInput.value, valueAddition)
    alteredColor.style.backgroundColor = alteredHex
    alteredColorText.innerText = `ALtered Color: ${alteredHex}`
})

// toggling the btn

toggleBtn.addEventListener("click", ()=>{
    if (toggleBtn.classList.contains("toggled")){
        toggleBtn.classList.remove("toggled")
        lightenText.classList.remove("unselected")
        darkenText.classList.add("unselected")
    } else{
        toggleBtn.classList.add("toggled")
        lightenText.classList.add("unselected")
        darkenText.classList.remove("unselected")
    }
    reset()
})

// reset the color value

const reset = () => {
    slider.value = 0
    sliderText.innerText = "0%"
    alteredColor.style.backgroundColor = hexInput.value
    alteredColorText.innerText = `ALtered Color: ${hexInput.value}`
}





