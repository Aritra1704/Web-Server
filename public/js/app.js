
console.log('Clientside javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    // console.log(location)

    messageOne.textContent = 'Loading, please wait...'
    messageTwo.textContent = ''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log('temperature >>  ',data.temperature)
                console.log('feellike >>  ',data.feellike)
                console.log('forecast >>  ',data.forecast)

                messageOne.textContent = 'You searched for ' + data.location
                                
                messageTwo.textContent =  'Temperature here is ' + fahToCel(data.forecast.temperature) + ' degrees Celsius ' + 
                                ' but feels like ' + fahToCel(data.forecast.feellike) + ' degrees Celsius.' + 
                                ' Today\'s high is ' + fahToCel(data.forecast.temperatureHigh) + 
                                ' and lowest is ' + fahToCel(data.forecast.temperatureLow) +
                                '. The Windspeed is ' + data.forecast.windSpeed + 
                                ' and humidity is ' + data.forecast.humidity + 
                                ' over all summary\n' + data.forecast.summary

            }
        })
    })
})

function fahToCel(temp) {
    console.log('temp >>  ', temp)
    return parseFloat((temp - 32) * 5 / 9).toFixed(2)
}

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

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