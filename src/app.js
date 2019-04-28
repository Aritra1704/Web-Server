const path = require('path')
const express = require('express')

const app = express()

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')

app.get('', (req, res)=> {
    res.render('index')
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

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Aritra',
//         age: 30
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About title</h1>')
// })

