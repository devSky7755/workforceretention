const Requestaquote = require('../models/requestaquote');

//Validation Library
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//Validation SCHEMA
const requestaquoteSchema = require('../validation/requestaquote');

//LOAD EMAIL TEMPLATES
const helpers = require('../helpers/email');
const email_template = require('../helpers/email_template');

exports.Create = function (req, res, next) {
    const data = req.body;

    const from = to = email_template.QuotationEmailTemplate.to_address;
    let subject = email_template.QuotationEmailTemplate.subject;
    let body = email_template.QuotationEmailTemplate.body;

    Joi.validate(data, requestaquoteSchema, (err, value) => {
        if (err) return next(err);
        const raq = new Requestaquote(data);
        raq.save()
            .then((raq) => {
                body = body.replace('[name-val]', raq.name);
                body = body.replace('[position-val]', raq.position);
                body = body.replace('[org_name-val]', raq.org_name);
                body = body.replace('[email-val]', raq.email);
                body = body.replace('[contact_number-val]', raq.contact_number);
                body = body.replace('[workforce_size-val]', raq.workforce_size);
                body = body.replace('[cur_employee_turnover-val]', raq.cur_employee_turnover);
                body = body.replace('[confidential]', radioTemplate(raq.confidential, 'Confidential Program', 1));
                body = body.replace('[license_required_status]', radioTemplate(raq.license_required_status, 'License to Workforce Retentions Exit Interview Platform'));
                body = body.replace('[phone_interview_with_platform_status]', radioTemplate(raq.phone_interview_with_platform_status, 'Expert Phone Interviews'));
                body = body.replace('[phone_interview_without_platform_status]', radioTemplate(raq.phone_interview_without_platform_status, 'Expert Phone Interviews WITHOUT Platform'));
                body = body.replace('[exit_report_status]', radioTemplate(raq.exit_report_status, 'Comprehensive Exit Reports'));
                helpers.RequestAQuoteEmail({ from, to, subject, body })
            })
            .then(() => {
                return res.status(200).send({
                    "success": true,
                    "message": "Quotation successfully created",
                    raq
                })
            }).catch(err => {
                next(err)
            });
    })
}

const radioTemplate = function (value, name, templateType = 0) {
    if (templateType == 0)
        return value == 1 ? `
            <div style="margin-bottom: 10px; clear: both; height: 20px;">
                <div style="width:60%; float:left;">
                    <b>${name}</b>:
                </div> 
                <div style="width: 40%; text-align: center; float:left;">
                    <input type="radio" checked> YES &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio"> NO
                </div> 
            </div>` : `
            <div style="margin-bottom: 10px; clear: both; height: 20px;">
                <div style="width:60%; float:left;">
                    <b>${name}</b>:
                </div> 
                <div style="width: 40%; text-align: center; float:left;">
                    <input type="radio"> YES &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="radio" checked> NO
                </div> 
            </div>
        `
    else
        return value == 1 ?
            `${name}: <input type="radio" checked> YES &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio"> NO ` :
            `${name}: <input type="radio"> YES &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="radio checked"> NO `
};