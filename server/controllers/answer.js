const mongoose = require('mongoose');
const Answer = require('../models/answer');

//RELATIONAL MODEL
const Question = require('../models/question');
const Employee = require('../models/employee');

//Validation Library
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//Validation SCHEMA
const answerSchema = require('../validation/answer');

exports.Create = function (req, res, next) {
    const data = req.body;

    const questionId = req.params.questionId;

    Joi.validate(data, answerSchema, (err, value) => {
        if (err) return next(err);
        //First find the employee by id
        //now push this newClient to the employee clients array === employee.clients.push(newPost)
        //now save the employee. this will automatically creates the relationship
        //and the newClient will be added into the staticPage table
        Question.findById(questionId, (err, question) => {
            if (err) return next(err);
            if (!question) {
                return res.status(404).json({ status: false, message: 'No employee found!' })
            }
            const answer = new Answer(data);
            answer.save().then(answer => {
                question.answers.push(answer);
                question.save(); //This will return another promise
            }).then(() => {
                return res.status(200).send({
                    "success": true,
                    "message": "Data successfully retrieve",
                    answer
                })
            }).catch(err => {
                next(err)
            });
        })
    })
};

exports.CreateMany = (req, res, next) => {
    let data = req.body;
    let surveyId = req.query.surveyId;
    let employeeId = req.query.employeeId;
    let isComplete = req.query.isComplete;
    let exit_reason_id = req.query.exit_reason_id
    // after save the answer
    // mark the survey as complete
    let questions = [];
    data.answers.forEach((answer) => {
        questions.push(answer.question);
    });
    console.log(data.answers);
    Employee.findById(employeeId, (err, employee) => {

        if (err) return next(err);

        Answer.insertMany(data.answers, (err, docs) => {
            let answers = [];

            // get all the question
            // from the docs extract the answer _id
            if (err) return next(err);
            docs.forEach((answer) => {
                answers.push(answer._id)
            });

            Question.find({ '_id': { $in: questions } }, function (err, question_docs) {
                if (err) return next(err);

                question_docs.forEach((question, index) => {
                    question.answers.push(answers[index]);
                    question.save();
                });

                //finally mark the employee survey as complete
                employee.surveys.forEach((employee_survey) => {
                    surveyId = mongoose.Types.ObjectId(surveyId);
                    if (employee_survey.survey.equals(surveyId)) {
                        employee_survey.completed = isComplete == 1 ? true : false;
                        // here we also need to update the employee survey end_date
                        // var aestTime = new Date().toLocaleString("en-US", { timeZone: "Australia/Brisbane" });
                        employee_survey.end_date = isComplete == 1 ? new Date() : null;
                        if (exit_reason_id) {
                            employee_survey.exit_reason_cur_step = exit_reason_id
                        }
                        employee_survey.completed_online = isComplete == 1 ? data.completed_online : 'No';
                        employee_survey.completed_admin = isComplete == 1 ? data.completed_admin : 'No';
                    }
                });
                employee.save().then(() => {
                    res.json({ message: "Exit Interview submitted successfully", success: true })
                })
            })
        });
    });
};

exports.UpdateAnswers = (req, res, next) => {
    let surveyId = req.query.surveyId;
    let isComplete = req.query.isComplete;
    let employeeId = req.query.employeeId;
    let isOnline = req.query.isOnline;
    let isAdmin = req.query.isAdmin;
    let exit_reason_id = req.query.exit_reason_id
    let data = req.body;
    let answer_ids = [];
    let new_answers = [];
    data.forEach((answer) => {
        if (answer.new) {
            if (answer.employee) {
                new_answers.push(answer);
            }
        } else answer_ids.push(answer._id);
    });
    // find out the answers by the answer ids
    updateNewAnswers(new_answers).then(() => {
        Answer.find({ '_id': { $in: answer_ids } }, function (err, answers) {
            if (err) return next(err);
            answers.forEach((answer) => {
                answer.options = data.find(a => mongoose.Types.ObjectId(a.question).equals(answer.question)).options;
                answer.save();
            });
            Employee.findById(employeeId, (err, employee) => {
                if (err) return next(err);
                employee.surveys.forEach((employee_survey) => {
                    surveyId = mongoose.Types.ObjectId(surveyId);
                    if (employee_survey.survey.equals(surveyId)) {
                        employee_survey.completed = isComplete == 1 ? true : false;
                        // here we also need to update the employee survey end_date
                        // var aestTime = new Date().toLocaleString("en-US", { timeZone: "Australia/Brisbane" });
                        employee_survey.end_date = isComplete == 1 ? new Date() : null;
                        if (exit_reason_id) {
                            employee_survey.exit_reason_cur_step = exit_reason_id
                        }
                        if (isOnline == 'Yes') {
                            employee_survey.completed_online = isComplete == 1 ? isOnline : 'No';
                        }
                        if (isAdmin == 'Yes') {
                            employee_survey.completed_admin = isComplete == 1 ? isAdmin : 'No';
                        }
                    }
                });
                employee.save().then(() => {
                    res.json({ success: true, message: "Exit Interview Updated" });
                })
            });
        });
    });
};

// make a new function for saving the new answers and return a promise when all the answers is save
const updateNewAnswers = (new_answers) => {
    return new Promise((resolve) => {
        if (new_answers.length > 0) {
            // this means new question answer available
            // we need to insert the question answer into the database

            // first insert all the answers into the database
            // then it will return an an array of answers which is inserted into the database
            // now from that inserted answers we need to find out the questions id
            // now by that question_ids we need to find out all the questions
            // now in the question array we need to push the new answer and save that question
            Answer.insertMany(new_answers, (err, docs) => {
                let answers = [];
                let questions = [];

                docs.forEach((answer) => {
                    answers.push({ id: answer._id, question: answer.question });
                    questions.push(answer.question);
                });

                Question.find({ '_id': { $in: questions } }, function (err, question_docs) {
                    if (err) return next(err);
                    question_docs.forEach((question) => {
                        question.answers.push(answers.find(a => mongoose.Types.ObjectId(a.question).equals(question._id)).id);
                        question.save();
                    });
                    resolve();
                })
            });

        } else {
            // this means no new question answer available
            resolve();
        }
    })
};

exports.Find = (req, res, next) => {
    const currentPage = req.query.page || 1; //staticPage number
    const perPage = req.query.perPage || 10; //total items display per staticPage
    let totalItems; //how many items in the database

    Answer.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            //This will return a new promise with the posts.
            return Answer.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage);
        }).then(answers => {
            return res.status(200).json({ success: true, answers, totalItems })
        }).catch(err => {
            next(err)
        });
};

exports.FindById = (req, res, next) => {
    let id = req.params.id;

    Answer.findById(id, (err, answer) => {
        if (err) return next(err);
        if (!answer) {
            return res.status(404).json({
                "success": false,
                "message": "Question not found"
            })
        }
        return res.status(200).send({
            "success": true,
            "message": "Data successfully retrieve",
            answer
        })
    });
};

exports.Update = (req, res, next) => {
    // fetch the request data
    const data = req.body;
    let id = req.params.id;

    //Update the employee

    // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
    // Find the existing resource by ID
    Answer.findByIdAndUpdate(
        // the id of the item to find
        id,
        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        data,
        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, answer) => {
            // Handle any possible database errors
            if (err) return next(err);
            if (!answer) return res.status(404).json({ success: false, message: "Answer not found." });
            return res.send({
                "success": true,
                "message": "Record updated successfully",
                answer
            });
        }
    );
};

exports.Delete = (req, res, next) => {
    let id = req.params.id;

    const schema = Joi.object({
        id: Joi.objectId()
    });

    Joi.validate({ id }, schema, (err, value) => {
        if (err) {
            // send a 422 error response if validation fails
            res.status(422).json({
                success: false,
                message: 'Invalid request data',
                err
            });
        }
        // The "todo" in this callback function represents the document that was found.
        // It allows you to pass a reference back to the staticPage in case they need a reference for some reason.
        Answer.findByIdAndRemove(id, (err, answer) => {
            // As always, handle any potential errors:
            if (err) return next(err);
            if (!answer) return res.status(404).json({ success: false, message: "Answer not found." });
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            return res.send({
                "success": true,
                "message": "Record deleted successfully",
                answer
            });
        });
    });
};


// RELATIONAL FUNCTIONS
exports.FindEmployeeSurveyQuestionsAnswers = (req, res, next) => {
    let surveyId = req.query.surveyId;
    let employeeId = req.query.employeeId;
    Answer.find({ survey: surveyId, employee: employeeId }, (err, answers) => {
        if (err) return next(err);
        res.json({ answers });
    })
};

