const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const any = Joi.any();

// define the validation schema
const schema = Joi.object().keys({

    // name is required
    title: Joi.string().required(),

    subtitle: Joi.string().required(),

    author: Joi.string().required(),

    keywords: Joi.string().required(),

    description: Joi.string().required(),

    publish_date: Joi.date().allow(''),

    image: any,

    user: Joi.objectId(),
});
module.exports = schema;
