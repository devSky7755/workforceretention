const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSurveySchema = new Schema({
    survey: {
        type: Schema.Types.ObjectId,
        ref: 'Survey'
    },
    // status true means that survey is completed
    // status false means that survey is not completed
    status: {
        type: Boolean,
        default: false
    }
});


module.exports = employeeSurveySchema;
