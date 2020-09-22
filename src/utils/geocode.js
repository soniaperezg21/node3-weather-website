const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)  +
    '.json?access_token=pk.eyJ1Ijoic29uaWFwZXJlemcyMSIsImEiOiJja2Y4aHR5N2YwNmJnMzBtaHhwYmthMjZvIn0.1G8eliMWYEw3BTnqUOubdA&limit=1';
    //request({url: url,  json: true}, (error, response) => {
    request({url,  json: true}, (error, { body }) => {
        if (error) {  //Cuando no se puede conectar a internet o ese tipo de errores
            callback('Unable to connect to location services!', undefined) //si ponemos valor en error y nada en data
        } else if (body.features.length === 0) {  //por ejemplo cuando no mando los parametros en la liga Como el lugar
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude:  body.features[0].center[0],
                longitude: body.features[0].center[1],
                location:  body.features[0].place_name
            })
         }    
    })
}

module.exports = geocode;



