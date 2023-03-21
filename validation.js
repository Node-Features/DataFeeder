const Joi = require('joi')

const validateLocation = (data) => {
    
    const schema = Joi.object({

        region: Joi.string().min(3).required(),

        district: Joi.string().min(3).required(),

        routes: Joi.string().min(6).required(),

        to : Joi.string().min(6).required(),

        from: Joi.string().min(6).required(),

        via: Joi.string().min(6).required(),

        latitude: Joi.string().min(3).required(),

        longitude: Joi.string().min(3).required()

    })

    return schema.validate(data)

}

module.exports = validateLocation