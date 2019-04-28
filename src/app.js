const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

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
        name: 'Aritra',
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

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Aritra',
        errorMessage: 'Help article not found'
    })
})

// This has to created last no route should be created after this
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Aritra',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })





