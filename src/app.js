const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode.js')
const forecast = require('./Utils/forecast.js')


const app = express()
const publicDirectoryPath =path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')//handlebar setup
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Praduman Chaudhary'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About me',
        name:'Praduman Chaudhary'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        phone  : 8279717550,
        problem: 'Location not found',
        title: 'Help',
        name: 'Praduman Chaudhary'
    })
})



app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Send the address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastdata)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastdata
            })
        })
    })
    
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        product: []
    })
})


app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 ',
        errorMessage: 'Help article not found',
        name: 'Praduman Chaudhary'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 ',
        errorMessage: 'Page not found',
        name: 'Praduman Chaudhary'
    })
})
app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})