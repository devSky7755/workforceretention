const Contact = require('../models/contact');

//Validation Library
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//Validation SCHEMA
const contactSchema = require('../validation/contact');

//LOAD EMAIL TEMPLATES
const helpers = require('../helpers/email');
const email_template = require('../helpers/email_template');

exports.Create = function (req, res, next) {
    const data = req.body;

    const from = email_template.ContactEmailTemplate.from_address;
    let subject = email_template.ContactEmailTemplate.subject;
    let body = email_template.ContactEmailTemplate.body;
    let to = data.email;

    Joi.validate(data, contactSchema, (err, value) => {
        if (err) return next(err);

        const contact = new Contact(data);
        contact.save().then((contact) => {
            body = body.replace('[name]', contact.name);
            helpers.ReplyEmailForContactUs({ from, to, subject, body })
        }).then(() => {
            return res.status(200).send({
                "success": true,
                "message": "Contact successfully created",
                contact
            })
        }).catch(err => {
            next(err)
        });
    })
}
