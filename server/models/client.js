const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    country: {
        type: Number
    },
    workforce: {
        type: Number
    },
    //Aggregate data only, Individual + Aggregate Data
    org_mgt: {
        type: Number,
    },
    div_mgt: {
        type: Number
    },
    dept_mgt: {
        type: Number
    },
    product: {
        type: Number
    },
    turnover: {
        type: Number,
        required: true
    },
    aggregate_reports: {
        type: Number,
    },
    image: {
        type: String
    },
    surveys: [{type: Schema.Types.ObjectId, ref: 'Survey'}],

    industry: {type: Schema.Types.ObjectId, ref: 'Industry'},

    employees: [{type: Schema.Types.ObjectId, ref: 'Employee'}],

    organizations: [{type: Schema.Types.ObjectId, ref: 'Organization'}],

    emails: [{type: Schema.Types.ObjectId, ref: 'email'}]

}, {timestamps: true});

module.exports = mongoose.model('Client', clientSchema);