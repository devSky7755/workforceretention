const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// define the validation schema
const schema = Joi.object().keys({

    // name is required
    name: Joi.string().required(),

    // position is required
    position: Joi.string().required(),

    // org_name is required
    org_name: Joi.string().required(),

    // email is required
    // email must be a valid email string
    email: Joi.string().email().min(4).max(72).required(),

    // contact_number is required
    contact_number: Joi.string().required(),

    // workforce_size is required
    workforce_size: Joi.string().required(),

    // cur_employee_turnover is required
    cur_employee_turnover: Joi.number().required(),

    // confidential is required
    confidential: Joi.number().required(),

    // license_required_status is required
    license_required_status: Joi.number().required(),

    // phone_interview_with_platform_status is required
    phone_interview_with_platform_status: Joi.number().required(),

    // phone_interview_without_platform_status is required
    phone_interview_without_platform_status: Joi.number().required(),

    // exit_report_status is required
    exit_report_status: Joi.number().required(),
});
module.exports = schema;
