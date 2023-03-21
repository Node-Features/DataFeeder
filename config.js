
require('dotenv').config()

const credentials = {

    apiKey: process.env.API_KEY,

    authDomain: process.env.AUTH_DOMAIN,

    projectId: process.env.PROJECT_ID,

    storageBucket: process.env.STORAGE_BUCKET,

    messagingSenderId: process.env.MESSAGING_SENDER_ID,

    appId: process.env.APP_ID,

    measurementId: process.env.MEASUREMENT_ID
}

const sessionConfig = {

    secret: process.env.SECRET_KEY,

    resave: false,

    saveUninitialized: true,

    cookie: {

      maxAge: 864000 // 1 week
      
    },
  }

module.exports = {

    credentials,

    sessionConfig
}