const express = require('express')

const router = express.Router()

const filtersMiddleware = require('../middlewares/filters')

const getAllRestaurants = require('./handlers/getAll')
const getByBorough = require('./handlers/byBorough')
const getByCuisine = require('./handlers/byCuisine')
const getByNotCuisine = require('./handlers/byNotCuisine')

router.use( filtersMiddleware )

router.get('/restaurants', getAllRestaurants)
router.get('/restaurants/borough/:borough', getByBorough)
router.get('/restaurants/cuisine/:cuisine', getByCuisine)
router.get('/restaurants/cuisine/not/:cuisine', getByNotCuisine)

module.exports = router