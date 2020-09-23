const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=140246ab3af107d28b12bbecd3c79306&query=' + 
    latitude + ',' + longitude //+ '&units=f'; //farenheit
    
    //request({url: url,  json: true}, (error, response) => {
    request({url,  json: true}, (error, {body}) => { //No necesario igualar url valor = name, solo usamos response.body
        if (error) {  //Cuando no se puede conectar a internet o ese tipo de errores
             callback('Unable to connect to weather service!', undefined) //si ponemos valor en error y nada en data
        } else if (body.error) {  
            callback('Unable to find location.', undefined)
            //console.log('url-->' + url)
        } else {
           // console.log(body.current)
            callback(undefined, 
                body.current.weather_descriptions[0] +
                 '. It is currently ' + body.current.temperature +
                 ' degrees out. It feels like  ' + body.current.feelslike + ' degrees out. The humidity is ' + 
                 body.current.humidity + '%.'
            )
         }    
    })
}
 

module.exports = forecast;
