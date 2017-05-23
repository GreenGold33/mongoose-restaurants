const express = require('express')
const mongoose = require('mongoose')

mongoose.Promise = Promise

const app = express()

const urlDB = 'mongodb://localhost:27017/test'
const PORT = 3000

const Restaurant = require('./models/Restaurant')

mongoose.connect(urlDB)

app.get('/restaurants', (req,res) => {

  Restaurant
    .find()
    .limit(20)
    .then( restaurants => {
      res.json(restaurants)
    })

})

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`);

