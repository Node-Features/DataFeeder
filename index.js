const express = require('express')

const session = require('express-session')

const path = require('path')

const { flash } = require('express-flash-message')

require('dotenv').config()

require('ejs')

const app = express()

app.use(express.json())

const { sessionConfig } = require('./config')

app.use(session(sessionConfig))

app.use(flash({ sessionKeyName: process.env.SECRET_KEY }));

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname + '/'))

app.use(express.static(path.join(__dirname, '/assets')))

app.use('/css', express.static(__dirname + '/assets/css'))

app.use('/js', express.static(__dirname + '/assets/js'))

app.use('/plugins', express.static(__dirname + '/assets/plugins'))

app.use('/fonts', express.static(__dirname + '/assets/fonts'))

const webRoutes = require('./route')

app.use('/', webRoutes)

app.listen(process.env.PORT, () => {

    console.log(`Server is running on http://localhost:${process.env.PORT}`)
    
})