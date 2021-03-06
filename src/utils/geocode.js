const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2VhLWRldi10ZXN0IiwiYSI6ImNrcG94ZTlmYjB4eDkydnVlYnNleDVicHIifQ.oBgwUnWEHcMsCz54ljvvpA&limit=1'
    
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            //console.log('geocode ------------');
            //console.log(response.body.features[0].center[0]);
            //console.log(response.body.features[0].center[1]);
            //console.log(response.body.features[0].place_name);
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

