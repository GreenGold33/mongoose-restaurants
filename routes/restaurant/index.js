const express = require('express')

const router = express.Router()

const filtersMiddleware = require('../middlewares/filters')
const getById = require('./handlers/byId')

router.use( filtersMiddleware )
router.get('/restaurant/:id', getById)

module.exports = router