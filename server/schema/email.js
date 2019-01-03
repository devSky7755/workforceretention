const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    from_address: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        lowercase: true,
        required: 'From address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    //Initial Exit Email - Non-Confidential
    email_type: {
        type: String
    },
    //This is the initial email that is sent to the employee inviting them to complete an on-line exit interview. For Self-Administered systems.
    description: {
      type: String
    },
    subject: {
        type: String,
        min: [4, 'Too short, min is 4 characters']
    },
    body: {
        type: String,
        min: [100, 'Too short, min is 4 characters']
    }
});


module.exports =  emailSchema;
