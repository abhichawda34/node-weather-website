const request = require('request')

const forecast = (lat, long, callback) => {
    const url= "http://api.weatherstack.com/current?access_key=2a101c66004b2bcf383e4c8fca1fff1d&query="+lat+","+long
    request({url: url,json: true}, (error,{body}={}) => {
        if(error) {
            callback('Unable to connect weather service',undefined)
        } else if(!body.current) {
            callback("Unable to locate the coordnates, Please try another coordinates",undefined)
        } else {
            callback(undefined,{
                weather_description: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            })
        }        
    })
}

module.exports= forecast