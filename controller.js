const db = require('./db')

const randomstring = require('randomstring')

const validateLocation = require('./validation')

const getXlData = require('./xlParser')

const giveRouteACode = (length) => {

    return randomstring.generate({

        length: length,

        charset: "numeric",

        readable: true,

    })
}

const renderForm = (req, res) => {

    const messageBag = {

        success: req.consumeFlash('success'),

        error: req.consumeFlash('error')
    }

    Promise.all(Object.values(messageBag)).then(message => {

    return res.render('form', { title: 'Locations Registration Form',
    
    success: message[0], error: message[1] })

    })
}

const addLocation = async (req, res) => {

    try {

        const bodyData = req.body

        const { error } = validateLocation(bodyData)

        if(error) {

            req.flash('error', error.details[0].message)

            return res.redirect('/')
        }

        const data = {

            districts: [],

            routes: []
        }

        for (let i = 0; i < bodyData.latitude.length; i++) {

            data.districts.push({

                districtName: bodyData.district,

                boundaries: [{

                    latitude: bodyData.latitude[i],

                    longitude: bodyData.longitude[i]
                }]
            })

            data.routes.push({

                districtName: bodyData.district,

                routeName: bodyData.routes[i],

                from: bodyData.from[i],

                to: bodyData.to[i],

                via: bodyData.via[i],

                routeCode: giveRouteACode(7)
            })
        }

        await db.collection('regions').doc(bodyData.region).set(data, { merge: true })

            .then(() => {

                req.flash('success', 'Location added successfully')

                return res.redirect('/')

            }).catch((error) => {

                req.flash('success', error.message)
                
                return res.redirect('/')

        })

    } catch (error) {

        req.flash('success', error.message)

        return res.redirect('/')
    }

}


const getData = async (req, res) => {

    await getXlData('dar').then(data => {

    const keys = Object.keys(data)

    console.log(keys)

     keys.forEach((value) => {

        console.log(value)

        db.collection('regions').doc('Dar').set({

            districtName: value,

            coordinates: data.value
        })

     })
     
    return res.status(200).json({message: 'Success'})

    }).catch(error => {

        return res.status(500).json(error.message)
    })

}

module.exports = {

    renderForm,

    addLocation,

    getData
}