const Employee = require('../models/employee');
const Client = require('../models/client');
const Survey = require('../models/survey');
const Answer = require('../models/answer');

exports.ManagerReportDetails = (req, res, next) => {

    let employeeId = req.params.id;
    // here we will get the information
    // how many employees under this employee client
    // how many people completed the survey

    // find the employee from the database

    // get the client employees under the manager organization
    Employee.findById(employeeId)
        .populate([{
            path: 'organization',
            model: 'Organization',
            populate: {
                path: 'divisions',
                model: 'Division',
                populate: {
                    path: 'departments',
                    model: 'Department'
                }
            }
        }])
        .exec(function (err, employee) {
            if (err) return next(err);
            if (!employee) {
                return res.status(404).json({
                    "success": false,
                    "message": "Employee not found"
                })
            }

            // get the client employees under the manager organization
            Client.findById(employee.client)
                .populate([{
                    path: 'employees',
                    model: 'Employee',
                    match: {organization: employee.organization}
                }])
                .exec(function (err, client) {
                    // client.employees contains all the employees
                    // client.employees.length will be the total length of the
                    // now foreach employees check who have completed the survey or not
                    // if completed survey then count that employee
                    let completedSurveys = 0;
                    client.employees.forEach((employee) => {
                        employee.surveys.map((survey) => {
                            if (survey.completed) {
                                completedSurveys++;
                            }
                        });
                    });
                    if (err) return next(err);
                    return res.status(200).json({
                        success: true,
                        name: employee.first_name,
                        organization: employee.organization,
                        employees: client.employees.length,
                        completedSurveys
                    })
                });
        });

};

exports.ManagerReport = (req, res, next) => {

    const {start_date, end_date, level, occupational_group, gender, tenure} = req.body;
    let employeeId = req.params.id;
    console.log(occupational_group);

    // we need to filter employee first by occupational_group, gender, tenure and organization level
    // after getting the employees we will checkout the survey start_date and end_date

    // here in the request body we will get the filterObject
    // filterObject will contain view_level (filter the employee by organization level, division level and department level),
    // start_date, end_date, gender, tenure, occ

    // ********* we need to filter data foreach filterObject *************

    // first we need to find the manager by his/her id
    // then we need to checkout if the manager is set to full report or not
    // if employee is set to full reporting then we need to find all the employees from the organization who have completed this survey
    // if employee is not access to full reporting then we need to find all the employee under the manager organization who have completed this survey

    Employee.findById(employeeId, (err, employee) => {
        if (err) return next(err);
        if (!employee) {
            return res.status(404).json({
                "success": false,
                "message": "Employee not found"
            })
        }

        // get the client employees under the manager organization
        Client.findById(employee.client)
            .populate([{
                path: 'employees',
                model: 'Employee',
                match: {organization: employee.organization}
            }])
            .exec(function (err, client) {
                // client.employees contains all the employees
                // client.employees.length will be the total length of the
                // now foreach employees check who have completed the survey or not
                // if completed survey then count that employee
                if (err) return next(err);
                // first get the survey questions
                const surveyId = employee.surveys[0].survey;
                Survey.findById(surveyId)
                    .populate([{
                        path: 'questions',
                        model: 'Question',
                    }])
                    .exec(function (err, survey) {
                        if (err) return next(err);

                        // filter the employees who have completed the survey first
                        // here we have got the survey questions
                        survey.questions.forEach((question) => {
                            //here check the employees under this organization answered this question
                            // foreach option check how many employee selected an option
                            // for example option 1 - Not Like (count how many employees selected this option)
                            // option 2 - Not Like at All (count how many employees selected this option)

                            // we need to find the answers for the question category

                            // {id: 1, value: 'Career Opportunities'},
                            // {id: 2, value: 'Meaningful Work'},
                            // {id: 3, value: 'Communication'},
                            // {id: 4, value: 'Effective Leadership'},
                            // {id: 5, value: 'Induction'},
                            // {id: 6, value: 'Learning & Development'},
                            // {id: 7, value: 'Manager'},
                            // {id: 8, value: 'Pay & Benefits'},
                            // {id: 9, value: 'Work Conditions'},
                            // {id: 10, value: 'Being Valued'},
                            // {id: 11, value: 'Operational'},
                            // {id: 12, value: 'Restructure'},
                            //  exit_reason 13 means this is the final question
                            employeeQuestionAnswers(client.employees, question._id).then(
                                (docs) => {
                                    // now here we are getting answers for the question
                                    // here we need to check if the question is the final question
                                    // foreach question options we need to do two things how many employees selected an option
                                    // 2nd thing calculate the percentage

                                    // check the question type as well
                                    console.log(docs);
                                    console.log(`**************** question_id ${question._id} ******************`)
                                }
                            )
                        });
                        return res.status(200).json({success: true, survey, client})
                    });
            });
    });

    // ************** After Filtering Data **************
    // for final question check which employee select which option
    // for example Career Opportunities 1st choice(10 Employee) and 2nd choice (2 employee)
    // Pay & Benefits 1st choice (8 Employee) and 2nd choice (2 employee)

    // we can do this way foreach question we should find out how many employee selected which option
    // so our data will be look something like this
    // {question_id: 1, which category this question is for example being valued category, options:[{id:1, how many employees selected this option}]}


    // *************** RULES ***************
    // first find the top 3 reasons for leaving the exit interview
    // calculation
    // Reason                1st choice     2nd choice   total points     percentage
    // Career Opportunities    10               2            12
    // Pay & Benefits          8                2            10
    // Work Conditions         4                5            9
    // Operational             2                2            4
    // Learning & Development  2                2            4
    // Manager                 2                1            3
    // Meaningful Work         2                0            2
    // Effective Leadership    0                1            1

    // Percentage Calculation
    // total points = 45
    // Career Opportunities Percentage = (12 /45) * 100 = 26.66 %

    // for all Question under Career Opportunities for each question there will be a bar in the chart
    // For example there are 4 questions in the Career Opportunities Category So there will be 4 bar in the chart
    // Now calculate how many people Agree, Neutral and Disagree (Need to calculate percentage as well)
    // Agree and Strongly Agree --------------------- 11
    // Disagree and Strongly Disagree --------------- 4
    // Neutral -------------------------------------- 0

    // Percentage of Agree and Strongly Agree ------ (11 / 15) * 100 = 73.33 %
    // Percentage of Disagree and Strongly Disagree -(4/15) * 100 = 26.66 %
    // Percentage of Neutral ------------------------(0/15) * 100 = 0 %


    // response will be something like this
    // top_reasons (Array of objects) {label: Career Opportunities, percentage: 26.66 }
    // answers (Array of objects) {question_id : 1, category_label: Career Opportunities, answers : [{label:Agree and Strongly Agree, percentage: 73.33}]}

    // re-arrange the answers by the category label (highest leaving reason)
};

const employeeQuestionAnswers = (employees, question_id) => {
    // since An employee will have only one survey
    // so we can find the employee answer directly by employee id
    return new Promise((resolve, reject) => {
        let employee_ids = [];
        employees.forEach((employee) => {
            employee_ids.push(employee._id);
        });
        Answer.find({employee: {$in: employee_ids}}, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                // filter the docs by question id
                const filtered_docs = docs.filter(d => d.question.equals(question_id));
                resolve(filtered_docs);
            }
        });
    })

};

const IsNullOrEmpty = (obj) => {
    return typeof obj === 'undefined' || obj == null;
};
