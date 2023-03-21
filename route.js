const express = require('express')

const router = express.Router()

const {

    addLocation,

    renderForm,

    getData

} = require('./controller')

router.get('/', renderForm)

router.get('/data', getData)

router.post('/add', addLocation)

module.exports = router