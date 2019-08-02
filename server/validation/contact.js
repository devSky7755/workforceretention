const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// define the validation schema
const schema = Joi.object().keys({

    // name is required
    name: Joi.string().required(),

    // email is required
    // email must be a valid email string
    email: Joi.string().email().min(4).max(60).required(),

    // name is required
    message: Joi.string().required(),

    // name is required
    organization: Joi.string().required(),

    subject: Joi.string().allow(''),
});
module.exports = schema;
