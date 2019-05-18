const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error)
            return res.send({
                error: error
            })
        
           console.log(latitude, longitude)
           forecast(latitude, longitude, (error, {temperature, rain, summary} = {}) => {
            if(error)
                return res,send({
                    error: error
                })
            
            console.log(req.query.address)
            console.log(location)
            console.log('temperature: ' + temperature)
            console.log('rain: ' + rain)
            console.log('summary: ' + summary)

            res.send({
                coordinates: {latitude: latitude, longitude: longitude},
                location,
                forecast: {temperature, rain, summary}
                // temperature: temperature,
                // rain: rain,
                // summary: summary
            })
        })
        
       
    })
    // res.send({
    //     location: {
    //         latitude: 17.32456,
    //         longitude: 78.235659,
    //         address: req.query.address
    //     },
    //     weather: {
    //         temperature: 38,
    //         rain: 30,
    //         forecast: 'Sunny day'
    //     }
    // })
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

// Start the server from terminal with this
// nodemon src/app.js -e js,hbs





