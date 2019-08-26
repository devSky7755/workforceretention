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

    const from = to = email_template.ContactEmailTemplate.to_address;
    let subject = email_template.ContactEmailTemplate.subject;
    let body = email_template.ContactEmailTemplate.body;

    const reply_from = email_template.ReplyContactEmailTemplate.from_address;
    let reply_subject = email_template.ReplyContactEmailTemplate.subject;
    let reply_body = email_template.ReplyContactEmailTemplate.body;
    let reply_to = data.email;

    Joi.validate(data, contactSchema, (err, value) => {
        if (err) return next(err);

        const contact = new Contact(data);
        contact.save().then((contact) => {
            reply_body = reply_body.replace('[name]', contact.name);
            helpers.SendNormalEmail({ 'from': reply_from, 'to': reply_to, 'subject': reply_subject, 'body': reply_body })
        }).then(() => {
            body = body.replace('[name]', data.name);
            body = body.replace('[email]', data.email);
            body = body.replace('[organization]', data.organization);
            body = body.replace('[phone]', data.phone || "");
            body = body.replace('[message]', data.message);
            helpers.SendNormalEmail({ from, to, subject, body })
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
