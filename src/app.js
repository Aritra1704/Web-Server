const path = require('path')
const express = require('express')

const app = express()

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Aritra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aritra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        location: {
            latitude: 17.32456,
            longitude: 78.235659
        },
        weather: {
            temperature: 38,
            rain: 30,
            forecast: 'Sunny day'
        }
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })





