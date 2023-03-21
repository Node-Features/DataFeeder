const { credentials } = require('./config')

const firebase = require("firebase")

require("firebase/firestore")

let db = ''

try {
    
    firebase.initializeApp(credentials)

   db  = firebase.firestore()

   console.log('Connected to Firebase')

} catch (error) {

    console.log(error.message)

    return {

        "message": "Someting went wrong, " + error.message   
    }
    
}

module.exports = db