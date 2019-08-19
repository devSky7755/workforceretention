const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
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
    subject: {
        type: String
    },
    message: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);