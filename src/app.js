//Para que nodemon se reactive cuando se cambia archivos js o hbs  nodemos src/app.js -e js,hbs
// En consola:  npm init -y,      npm i express,   generamos directorio src.
// npm i hbs  //motor de plantillas para contenido dinámico,   generar directorio views ya rchivo index.hbs
const path = require('path');
const express = require('express');  //Para levantar un server (espera que los archivos estén en views)
const hsb = require('hbs')  //para usar partials
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')  //puede o no llevar .js

//Heroku: Buscar heroku cli en el browser y bajar instalador. En terminal ejectuar heroku -v. Si da error cerrar VisualStudioCode. En terminal: heroku login

//console.log(__dirname); //Directorio donde está buscando las rutas 
//console.log(__filename)

const app = express()  //generamos la aplicación
const port = process.env.PORT || 3000 //La toma de la variable de entorno y si no toma la de default 3000

//Define paths for Express config
const publicDirectoriyPath = path.join(__dirname, '../public')  //Generamos la ruta a usar (estabamos en src)
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs'); //decirle que se va a usar hbs con manejador como si fuera el razor
app.set('views', viewsPath); //para que no busque las vistas en dir views sino en templates
hsb.registerPartials(partialsPath) //Registrar el path dePartials
//Setup static directory to serve
app.use(express.static(publicDirectoriyPath))  //Para que ahi busque el contenido estático como js y css

//R U T A S
app.get('', (req, res) => {
    res.render('index', {  //no necesita extensión index.hbs
        title: 'Weather',
        name: 'Sonia Perez'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About me',
        name: 'Sonia Perez'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', { 
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sonia Perez'
    }) 
})

//Página weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({  //El return es para que se salga de la funcion
            error: 'You must provide an address!'
        })
    }

    //Only error or data va a tener un valor
    //geocode(address, (error, data)  => { //recibiendo todo el objeto
    //geocode(address, (error, {latitud, longitude, location})  => { //Haciendo destructuring
    geocode(req.query.address, (error, { latitud, longitude, location } = {})  => { //Si no mandan valor usa el valor de default{} esto es cuando haya valor en error     
        if (error) {
            return res.send({ error });
        }
        //forecast(data.latitud , data.longitude, (error, forecastData) => {
        forecast(latitud , longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            
        })
    })
})



app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({  //El return es para que se salga de la funcion
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//Las no encontradas despues de help/
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sonia Perez',
        errorMessage: 'Help article not found.' 
    })
   
})

//Páginas no encontradas, o sea lo que no coincide
app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        title: '404',
        name: 'Sonia Perez',
        errorMessage: 'Page not found.' 
    })
})




//Levanto el server en terminal node src/app.js    (verlo en el explorar localhost:3000) (Para terminarlo ctrl-c) 
app.listen(port, () => {   // (puerto, función)
   console.log('Server is up on port ' + port);
})