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

    let filter_object = {};
    // we need to split level by _. if split levels length is one that means selected organization level
    // if split levels length is two that means selected division level
    // if split levels length is three that means selected department level
    let split_levels = level.split('_');
    if (split_levels.length === 1 && split_levels[0] !== '') {
        filter_object.organization = split_levels[0];
    } else if (split_levels.length === 2) {
        filter_object.division = split_levels[1];
    } else if (split_levels.length === 3) {
        filter_object.department = split_levels[2];
    }

    if (!IsNullOrEmpty(occupational_group) && occupational_group !== '') {
        filter_object.occupational_group = occupational_group;
    }

    if (!IsNullOrEmpty(gender) && gender !== '') {
        filter_object.gender = gender
    }

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
                match: filter_object
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
                        let filtered_employees = client.employees;
                        filtered_employees = filtered_employees.filter(e => e.surveys[0].completed === true); // this will filter all the employees who have completed the survey
                        // also filter the employees by completed survey start_date and end_date
                        if (!IsNullOrEmpty(start_date) && start_date !== '') {
                            filtered_employees = filtered_employees.filter(e => e.surveys[0].start_date >= new Date(start_date));
                        }
                        if (!IsNullOrEmpty(end_date) && end_date !== '') {
                            filtered_employees = filtered_employees.filter(e => e.surveys[0].end_date <= new Date(end_date));
                        }
                        // from the filtered employees find out the below things
                        // Gender Split that means we need to find how many employee is Male and how Many is Female
                        // Age Split <25, 25-34, 35-50, 50 >
                        // Tenure Split < 1 year, 1-2 years, 3-5 years, 6-10 years, > 10 years
                        let genders = [];
                        let male = 0;
                        let female = 0;
                        filtered_employees.forEach((e) => {
                            if (e.gender === 'Male') {
                                male++
                            } else {
                                female++
                            }
                        });
                        genders.push({name: "Male", value: male});
                        genders.push(({name: 'Female', value: female}));


                        let ages = [];
                        // Calculate Age
                        let less_than_twenty_five = 0;
                        let twenty_five_to_thirty_fourth = 0;
                        let thirty_five_to_fifty = 0;
                        let greater_than_fifty = 0;
                        filtered_employees.forEach((e) => {
                            // calculate age
                            let age = getAge(e.date_of_birth);
                            if (age <= 25) {
                                less_than_twenty_five++;
                            } else if (age > 25 && age <= 34) {
                                twenty_five_to_thirty_fourth++
                            } else if (age > 34 && age <= 50) {
                                thirty_five_to_fifty++
                            } else if (age > 50) {
                                greater_than_fifty++
                            }
                        });

                        ages.push({name: "< 25", value: less_than_twenty_five});
                        ages.push({name: "25 - 34", value: twenty_five_to_thirty_fourth});
                        ages.push({name: "35 - 50", value: thirty_five_to_fifty});
                        ages.push({name: "50 >", value: greater_than_fifty});

                        const response_array = [];

                        // here get all the answers
                        employeeQuestionAnswers(filtered_employees).then(
                            (employee_answers) => {
                                survey.questions.forEach((question) => {
                                    // filter the answer by the question
                                    const answers = employee_answers.filter(d => d.question.equals(question._id));
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

                                    // question_types = [
                                    //     {id: 1, value: 'Rating Radio Buttons'},
                                    //     {id: 2, value: 'Free Text'},
                                    //     {id: 3, value: 'Exit Interview - Exit Reasons'},
                                    //     {id: 4, value: 'Yes / No Radio'},
                                    //     {id: 5, value: 'Radio Labels'},
                                    //     {id: 6, value: 'Multiple Choice'},
                                    // ];
                                    let options = [];
                                    if (question.type === '1') {
                                        //here get the ratings from the survey
                                        // survey.rating_labels
                                        survey.rating_labels.forEach((label, label_index) => {
                                            const option_object = {
                                                label,
                                                label_index,
                                                percentage: 0.0,
                                                answered: 0
                                            };// answered is used for how many employee selected
                                            // the option.
                                            options.push(option_object)
                                        })
                                    } else if (question.type === '3' || question.type === '5' || question.type === '6') {
                                        // Exit Interview -  Exit Reasons Question
                                        question.options.forEach((label, label_index) => {
                                            // only we should insert which one is checked
                                            const option_object = {
                                                label,
                                                label_index,
                                                percentage: 0.0,
                                                answered: 0
                                            };// answered is used for how many employee selected
                                            // the option.
                                            options.push(option_object)
                                        })
                                    } else if (question.type === '4') {
                                        // Yes / No Radio Question
                                        // we need to push two thing yes and no
                                        const option_yes_object = {
                                            label: 'Yes',
                                            label_index: 1,
                                            percentage: 0.0,
                                            answered: 0
                                        };// answered is used for how many employee selected
                                        const option_no_object = {
                                            label: 'No',
                                            label_index: 0,
                                            percentage: 0.0,
                                            answered: 0
                                        };
                                        options.push(option_yes_object, option_no_object);
                                    }
                                    const question_object = {
                                        id: question._id,
                                        options: options,
                                        question_type: question.type,
                                        exit_reason: question.exit_reason,
                                        exit_reporting_label: question.exit_reporting_label
                                    };
                                    // now here we are getting answers for the question
                                    // here we need to check if the question is the final question
                                    // foreach question options we need to do two things how many employees selected an option
                                    // 2nd thing calculate the percentage
                                    // check the question type as well

                                    // here check answer for multiple choice and also check answer for radio buttons
                                    // for multiple choice answer user can select multiple answer
                                    answers.forEach((answer) => {
                                        // check which option is selected.
                                        // get the question options by label_index and increase the answered
                                        if (answer.question_type === '1' || answer.question_type === '4' || answer.question_type === '5') {
                                            // this means question is radio type. so there will be only one answer
                                            // this means answer.options array has only one element
                                            question_object.options.forEach((option) => {
                                                if (JSON.parse(answer.options[0]) === JSON.parse(option.label_index)) {
                                                    // this means selected the option. so we need to increase the answered by one
                                                    option.answered = option.answered + 1;
                                                }
                                            })

                                        } else if (answer.question_type === '3' || answer.question_type === '6') {
                                            // this is the multiple choice question
                                            question_object.options.forEach((option) => {
                                                let question_index = '' + option.label_index;
                                                // check the answer array contains the label_index or not
                                                if (answer.options.includes(question_index)) {
                                                    option.answered = option.answered + 1;
                                                }
                                            })
                                        } else if (answer.question_type === '7') {
                                            // This is the final and special question
                                            question_object.options.forEach((option) => {
                                                // we have to increase label_index by 1 because when question is answered
                                                // it inputs the exit_reason id which is 1 increased than it's index
                                                let first_choice_index = '1st-choice-' + (option.label_index + 1);
                                                let second_choice_index = '2nd-choice-' + (option.label_index + 1);

                                                if (answer.options.includes(first_choice_index) || answer.options.includes(second_choice_index)) {
                                                    option.answered = option.answered + 1;
                                                }
                                            });
                                            // for final question we need both first choice ans also second choice
                                            // how many employee selected first choice and how many employee selected 2nd choice
                                        }
                                    });

                                    response_array.push(question_object);
                                });
                                return res.status(200).json({
                                    success: true,
                                    survey,
                                    client,
                                    response_array,
                                    genders,
                                    ages,
                                    completed: filtered_employees.length
                                })
                            });

                    });
            });
    });

    // ************** After Filtering Data **************
    // for final question check which employee select which option
    // for example Career Opportunities 1st choice(10 Employee) and 2nd choice (2 employee)
    // Pay & Benefits 1st choice (8 Employee) and 2nd choice (2 employee)

    // we can do this way foreach question we should find out how many employee selected which option
    // so our data will be look something like this
    // {question_id: 1, which category this question is for example being valued category, options:[{id:1, how many employees selected this option}],
    // charting_label (exit_reporting_label)}


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

const employeeQuestionAnswers = (employees) => {
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
                resolve(docs);
            }
        });
    })

};

const IsNullOrEmpty = (obj) => {
    return typeof obj === 'undefined' || obj == null;
};
const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);

