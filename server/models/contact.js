const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    subject: {
        type: String
    },
    message: {
        type: String,
        required: 'Message is required'
    },
    organization: {
        type: String,
        required: 'Organization is required'
    },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);