const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestaquoteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    org_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [72, 'Too long, max is 72 characters'],
        lowercase: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    contact_number: {
        type: String,
        required: true,
    },
    workforce_size: {
        type: String,
        required: true,
    },
    cur_employee_turnover: {
        type: Number,
        required: true,
    },
    confidential: {
        type: Number,
        default: 0,
    },
    license_required_status: {
        type: Number,
        default: 0,
    },
    phone_interview_with_platform_status: {
        type: Number,
        default: 0,
    },
    phone_interview_without_platform_status: {
        type: Number,
        default: 0,
    },
    exit_report_status: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Requestaquote', requestaquoteSchema);