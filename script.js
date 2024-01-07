// "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/inr/jpy.json"
const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdown = document.querySelectorAll(".dropdown select")
const btn = document.getElementById("btn")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const conversion = document.getElementById("conversion")
const exchange = document.getElementById("exchange")

window.addEventListener("load", () => {
    exchangeRate()
})

const exchangeRate = async () => {
    let amount = document.querySelector("input")
    let amtVal = amount.value
    if (amtVal == "" || amtVal < 1) {
        amtVal = 1
        amount.value = "1"
    }
    // console.log(amtVal)

    // console.log(fromCurr.value.toLowerCase(), toCurr.value.toLowerCase())
    let fromCurrLowerCase = fromCurr.value.toLowerCase()
    let toCurrLowerCase = toCurr.value.toLowerCase()
    const url = `${baseUrl}/${fromCurrLowerCase}/${toCurrLowerCase}.json`
    // console.log(url)

    let response = await fetch(url)
    let data = await response.json()
    // console.log(data[toCurrLowerCase])

    conversion.innerText = `${amtVal} ${fromCurr.value} = ${amtVal * data[toCurrLowerCase]} ${toCurr.value}`
}

// for (code in countryList) {
//     console.log(code, countryList[code])
// }

for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if (select.name == "from" && currCode == "USD") {
            newOption.selected = "selected"
        }
        else if (select.name == "to" && currCode == "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}


const updateFlag = (element) => {
    // console.log(element.value)
    let currCode = element.value
    let countryCode = countryList[currCode];
    // console.log(currCode)
    let newSrcLink = `https://flagsapi.com/${countryCode}/flat/64.png`
    // console.log(countryCode)
    let img = element.parentElement.querySelector("img")
    img.src = newSrcLink
}


// Under developement ................
// exchange.addEventListener("click", () => {
//     let fromCountryCode = countryList[fromCurr.value]
//     let toCountryCode = countryList[toCurr.value]
//     let x = fromCurr.value
//     fromCurr.value = toCurr.value
//     toCurr.value = x
//     let fromNewLink = `https://flagsapi.com/${fromCountryCode}/flat/64.png`
//     let fromImg = fromCurr.parentElement.querySelector("img")
//     fromImg.src = fromNewLink

//     let toNewLink = `https://flagsapi.com/${toCountryCode}/flat/64.png`
//     let toImg = toCurr.parentElement.querySelector("img")
//     toImg.src = toNewLink

// })

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    // console.log("clicked")
    exchangeRate()
})
