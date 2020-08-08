const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


//Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,"../template/partials")

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name : 'Abhishek Chawda',
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help',
        name : 'Abhishek Chawda',
        helpText: 'This page details help'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Abhishek Chawda'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'})
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
        if(error) {
            return res.send({
                error: "Unable to find the location"
            })
        }
        forecast(latitude, longitude, (error, {weather_description,temp,feelslike}={}) => {            
            if(error){
                return res.send({
                    error: "Unable to find the lati long"
                })
            }      
            res.send({
                location,
                weather_description,
                temp,
                feelslike
            })  
        })
    })
})

app.get('/products',(req,res) => {
    if (!req.query.search) {
         return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: "404",
        name: 'Abhishek Chawda',
        errorMsg: "Help article not found"
    })
})


//should be always at last
app.get('*',(req,res) => {
    res.render('404',{
        title: "404",
        errorMsg: "Page not found"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})