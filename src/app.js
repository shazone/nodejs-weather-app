const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath  = path.join(__dirname, '../templates/views')
const partialsPath  = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//console.log(__dirname);
app.use(express.static(publicDirectoryPath))


const name = 'Shazwan Shaari'
const currentYear = new Date().getFullYear()


//get method - index page
app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather Page',
        name,
        currentYear
    })
})

//get method - weather
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address to proceed'
        })
    }

    /*res.send({
        forecast:'it will be rain',
        location: 'dummy',
        address: req.query.address
    })*/

    geocode(req.query.address,(error,{latitude, longitude, location})=>{
        //console.log('/weather ------------');
        //console.log(latitude);
        //console.log(longitude);
        if(error){
            return res.send({error})
        }else{
            forecast(latitude, longitude, (error,{cityname, weather_desc, temperature, precip ,weather_icons_url})=>{
                return res.send(
                  {
                    error,  
                    location,
                    forecast:cityname + ' is currently '+ weather_desc + ', It is currently ' + temperature + ' degress out. There is a ' + precip + '% chance of rain.',
                    weather_icons_url
                  }
                )
            })
        }
    })
})

//get method - help page
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help Page',
        name,
        currentYear,
        message:'Still Empty for now. Come back later.'
    })
})

//get method - about page
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Page',
        name,
        currentYear
    })
})

//get method - 404 page
app.get('/notfound',(req, res)=>{
    res.render('404',{
        title:'404 - Not Found',
        message:'Your requested page is not exist'
    })
})

//get method - test json page
app.get('/json',(req, res)=>{
    res.send({
                name:'martwea',
                age:20,
                city:'Kuala Lumpur',
                vaccinated:true
              })
})

//get method - test product
app.get('/product',(req, res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({products:[]})
})

app.listen(3000,()=>{
    console.log('Server is up and running ...');
})