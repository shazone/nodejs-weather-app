const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a822a230ff05e048a2c628bb077218de&query=' + latitude + ',' + longitude
    console.log('forecast ------------');
    console.log(latitude);
    console.log(longitude);
    console.log(url);
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,{
                cityname    :response.body.location.name,
                weather_desc:response.body.current.weather_descriptions,
                temperature :response.body.current.temperature,
                precip      :response.body.current.precip,
                weather_icons_url: response.body.current.weather_icons
             })
        }
    })
}

module.exports = forecast