 const request = require('request')

//  const API_dark_sky = 'DARK_SKY_API' 
 const API_dark_sky = '62a0bdddff6d2306187480b1af18b9c7' 
 

 const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + API_dark_sky + '/' + latitude + ',' + longitude
    console.log(url)

    request({url, json: true}, (error, {body}) => {
    
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            const {currently, daily} = body
            callback(undefined, {
                temperature: currently.temperature,
                rain: currently.precipProbability,
                summary: daily.data[0].summary
            })

            // const body = response.body
            // callback(undefined, {
            //     temperature: body.currently.temperature,
            //     rain: body.currently.precipProbability,
            //     summary: body.daily.data[0].summary
            // })
        }
     })
 }

 module.exports = forecast