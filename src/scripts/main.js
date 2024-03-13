import "../styles/style.scss"

const button = document.querySelector("button")
const form = document.querySelector("form")
let displayedAdvices = []

document.addEventListener("DOMContentLoaded", () => {
    let id = getRandomId(1, 224)
    fetchAdvice(id)
})

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    let id = getRandomId(1, 224)
    fetchAdvice(id)
})

const getRandomId = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    let id = Math.floor(Math.random() * (max - min) + min)

    while (displayedAdvices.includes(id)) {
        id = Math.floor(Math.random() * (max - min) + min)
    }

    displayedAdvices.push(id)

    return id
}

const fetchAdvice = (id) => {
    button.classList.add("loading")

    fetch(`https://api.adviceslip.com/advice/${id}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setAdvice(data)
        })
        .catch((error) => {
            console.error("Wystąpił błąd", error.message)
        })
        .finally(() => {
            button.classList.remove('loading')
        })
}

const setAdvice = (data) => {
    const span = document.querySelector("h1 > span")
    const p = document.querySelector("p")

    span.innerHTML = data.slip.id
    p.innerHTML = data.slip.advice
}