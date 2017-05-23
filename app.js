const express = require('express')
const mongoose = require('mongoose')

mongoose.Promise = Promise

const app = express()

const urlDB = 'mongodb://localhost:27017/test'
const PORT = 3000

const Restaurant = require('./models/Restaurant')

mongoose.connect(urlDB)

app.use( (req,res,next) => {

  const { show, hide, limit=20, page } = req.query
  const projection = {}

  if (show) {
    const fieldsToShow = show.split(',')
    fieldsToShow.forEach( field => projection[field] = 1 )
  }

  if (hide) {
    const fieldsToShow = hide.split(',')
    fieldsToShow.forEach( field => projection[field] = 0 )
  }

  req.projection = projection
  req.limit = +limit
  req.skip = (page-1) * limit

  next()

})


app.get('/restaurants', (req,res) => {

  const { projection, limit, skip } = req

  Restaurant
    .find( {}, projection )
    .limit(limit)
    .skip(skip)
    .then( restaurants => {
      res.json(restaurants)
    })

})

app.get('/restaurants/borough/:borough', (req,res) => {

  const { borough } = req.params
  const { projection, limit, skip } = req

  Restaurant
    .find( { borough }, projection )
    .limit(limit)
    .skip(skip)
    .then( restaurants => {
      res.json(restaurants)
    })

})

app.get('/restaurants/cuisine/:cuisine', (req,res) => {

  const { cuisine } = req.params
  const { projection, limit, skip } = req

  Restaurant
    .find( { cuisine }, projection )
    .limit(limit)
    .skip(skip)
    .then( restaurants => {
      res.json(restaurants)
    })

})

app.get('/restaurants/cuisine/not/:cuisine', (req,res) => {

  const { cuisine } = req.params
  const { projection, limit, skip } = req

  Restaurant
    .find( { cuisine: { $ne: cuisine } }, projection )
    .limit(limit)
    .skip(skip)
    .then( restaurants => {
      res.json(restaurants)
    })

})

app.get('/restaurant/:id', (req,res) => {

  const { id } = req.params
  const { projection } = req

  Restaurant
    .findById(id , projection)
    .then( restaurant => {
      res.json(restaurant)
    })


})

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`);

