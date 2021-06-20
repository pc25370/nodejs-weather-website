const request = require('postman-request')
const forecast = (longitude, latitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=41fb31a936255c4171e2ee6754b236a2&query='+  latitude +',' + longitude 
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect waether servers.', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0]+': It is currentlty '+ body.current.temperature + ' degrees out. It feels like '+ body.current.feelslike +' degrees out.')
        }
    })
}
module.exports = forecast
