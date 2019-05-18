
console.log('Clientside javascript is loaded')

// fetch('http://localhost:3000/weather?address=hyderabad').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.coordinates)
//             console.log(data.location)
//             console.log(data.forecast)
//         }
        
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)

    messageOne.textContent = 'Loading, please wait...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
        } else {
            console.log(data.coordinates)
            console.log(data.location)
            console.log(data.forecast)

            messageOne.textContent = data.location
            messageTwo.textContent = 'Temperature: ' + data.forecast.temperature + '\nSummary: ' + data.forecast.summary
        }
        
    })
})
})

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })