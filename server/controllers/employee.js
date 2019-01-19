const Employee = require('../models/employee');

//RELATIONAL MODEL
const Client = require('../models/client');
const Organization = require('../models/organization');
const Division = require('../models/division');
const Department = require('../models/department');

//Validation Library
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const jwt = require("jsonwebtoken");

//Config
const config = require('../config');

//JSON FILE PARSING LIBRARY
let csvToJson = require('convert-csv-to-json');


//Validation SCHEMA
const employeeSchema = require('../validation/employee');

// PASSWORD GENERATOR LIBRARY
const generator = require('generate-password');

//LOAD EMAIL TEMPLATES
const email_template = require('../helpers/email_template');
const helpers = require('../helpers/email');
const refreshTokens = {};


exports.Upload = function (req, res, next) {
    let file = req.file;
    const employees = [];
    const clientId = req.params.clientId;
    //read file data
    //first find the client by it's clientId
    Client.findById(clientId, (err, client) => {
        if (err) return next(err);
        if (!client) {
            return res.status(404).json({status: false, message: 'Client not found!'})
        }
        let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(file.path);
        //here get all the organization and organization division and division department
        Organization.find()
            .populate([{
                path: 'divisions',
                model: 'Division',
                populate: {
                    path: 'departments',
                    model: 'Department'
                }
            }])
            .exec(async function (err, organizations) {
                if (err) return next(err);
                for (let i = 0; i < json.length; i++) {
                    //here find the organization by name
                    const employeeOrganization = findOrganizationByName(json[i].organization, organizations);
                    json[i].organization = employeeOrganization ? employeeOrganization : null;
                    //here find the division by name
                    const employeeDivision = findDivisionByName(json[i].division, organizations);
                    json[i].division = employeeDivision ? employeeDivision : null;
                    //here find the department by name
                    const employeeDepartment = findDepartmentByName(json[i].department, organizations);
                    json[i].department = employeeDepartment ? employeeDepartment : null;

                    // here before push the json object check if the employee client has assign surveys. if so then assign that surveys to the employee
                    let clientSurveys = [];
                    client.surveys.forEach((survey) => {
                        let employeeSurvey = {survey: survey, completed: false};
                        clientSurveys.push(employeeSurvey);
                    });
                    json[i].surveys = clientSurveys;
                    employees.push(json[i]);
                }
                //before generating password we need to checkout if employee exist with the given email
                let allEmployees = await Employee.find();
                let finalEmployeesArray = checkDuplicateEmployees(allEmployees, employees);

                await passwordGenerator(finalEmployeesArray, client).then((employeesToUpload) => {
                    // Save the employees into the database
                    Employee.insertMany(employeesToUpload, (err, docs) => {
                        if (err) {
                            if (err.name === 'BulkWriteError' && err.code === 11000) {
                                return next(new Error(`Employee with the email ${err.op.email} already exist`));
                            } else {
                                return next(err);
                            }
                        }
                        //After saving the employees insert all the employees id to the
                        //client employees array
                        docs.forEach((employee) => {
                            client.employees.push(employee);
                        });
                        //Finally save the client
                        client.save().then(() => {
                            return res.status(200).json({
                                employees: docs,
                                success: true,
                                message: `From ${employees.length} employees ${employeesToUpload.length} uploaded and ${employees.length - employeesToUpload.length} skip`
                            });
                        })
                    });
                })
            });
    });
};

const checkDuplicateEmployees = function (employees, employeesToUpload) {

    let finalEmployeesToUpload = employeesToUpload;
    //for each employees to upload check if the employee exist in the employees array or not
    employeesToUpload.forEach((employee) => {
        //this line of code is checking if the employee exist with the email
        let checkedEmployee = employees.find(e => e.email === employee.email);
        if (!isNullOrEmpty(checkedEmployee)) {
            // if the employee exist with the email then it's eliminating from the final employees to upload array
            finalEmployeesToUpload = finalEmployeesToUpload.filter(fe => fe.email !== employee.email)
        }
    });
    return finalEmployeesToUpload;
    // if exist in the employees array then eliminate that employee
};


const isNullOrEmpty = function (obj) {
    return typeof obj === "undefined" || obj === null;
};


// This function will generate password as well as send email to employee
const passwordGenerator = function (employees, client) {
    const employeePromises = [];
    employees.map((employee) => {
        employeePromises.push(new Promise((resolve, reject) => {
            //generate salt
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    console.log('Something Wrong In Salt Generating');
                    reject(new Error('Something Wrong In Salt Generating'));
                }
                //GENERATE THE PASSWORD HERE
                const password = generator.generate({
                    length: 10,
                    numbers: true
                });
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) {
                        console.log('password generating error');
                        reject(new Error("Password can't generate"));
                    } else {
                        // send the password to the employee email
                        // step-1 : first get the email template from the client for creating an employee
                        const from = email_template.InitialExitNonConfidentialEmailTemplate.from_address;
                        let subject = email_template.InitialExitNonConfidentialEmailTemplate.subject;
                        let body = email_template.InitialExitNonConfidentialEmailTemplate.body;
                        let to = employee.email;

                        // step-2 : replace the [client_name] by the client.username
                        body = body.replace('[client_name]', client.name);
                        subject = subject.replace('[client_name]', client.name);
                        body = body.replace('[employee_firstname]', employee.first_name);

                        // step-3 : [employee_username] set the employee email
                        body = body.replace('[employee_username]', to);

                        // step-4 : [employee_password] set the employee plain password.
                        body = body.replace('[employee_password]', password);

                        helpers.SendEmailToEmployee({from, to, subject, body}).then(
                            () => {
                                // if the promise full fill this block of code will execute
                                // assign the hash password to the employee
                                employee.password = hash;
                                resolve(employee)
                            },
                            //if the promise rejected this code will execute
                            () => {
                                // assign the hash password to the employee
                                employee.password = hash;
                                resolve(employee)
                            }
                        ); // End of Send Email To Employee
                    }

                })//----end of password hashing----
            }) //---end of salt generation----
        }))
    });
    return Promise.all(employeePromises);
};
const findOrganizationByName = function (name, organizations) {
    if (organizations !== null) {
        organizations.map((organization) => {
            if (organization.name.toUpperCase() === name.toUpperCase()) {
                return organization._id;
            }
        })
    }
    return null;
};
const findDivisionByName = function (name, organizations) {
    organizations.map((organization) => {
        if (organization.divisions !== null && typeof organization.divisions !== 'undefined') {
            organization.divisions.map((division) => {
                if (division.name.toUpperCase() === name.toUpperCase()) {
                    return division._id;
                }
            })
        }
    });
    return null;
};

const findDepartmentByName = function (name, organizations) {
    organizations.map((organization) => {
        if (organization.divisions !== null && typeof organization.divisions !== 'undefined') {
            organization.divisions.map((division) => {
                if (division.departments !== null && typeof division.departments !== 'undefined') {
                    division.departments.map((department) => {
                        if (department.name.toUpperCase() === name.toUpperCase()) {
                            return department._id;
                        }
                    })
                }
            })
        }
    });
    return null;
};
exports.Create = function (req, res, next) {
    const data = req.body;
    const {email} = req.body;
    const clientId = req.params.clientId;

    if (!email) {
        return res.status(422).send({success: false, message: 'Email address is required!'});
    }

    Employee.findOne({email}, async (err, existingUser) => {
        if (err) return next(err);
        if (existingUser) {
            if (existingUser.username === data.username) {
                return res.status(422).send({
                    success: false,
                    message: 'Employee with this username already exist!'

                });
            }
            return res.status(422).send({
                success: false,
                message: 'Employee with this email already exist!'

            });
        }
        //before saving the employee to the database. hash password
        await bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            //GENERATE THE PASSWORD HERE
            const password = generator.generate({
                length: 10,
                numbers: true
            });
            data.password = password;
            bcrypt.hash(data.password, salt, async function (err, hash) {
                if (err) return next(err);
                //First find the employee by id
                //now push this newClient to the employee clients array === employee.clients.push(newPost)
                //now save the employee. this will automatically creates the relationship
                //and the newClient will be added into the staticPage table
                Client.findById(clientId, (err, client) => {
                    if (err) return next(err);
                    if (!client) {
                        return res.status(404).json({status: false, message: 'Client not found!'})
                    }
                    // here before create the employee check if the employee client has assign surveys. if so then assign that surveys to the employee
                    let clientSurveys = [];
                    client.surveys.forEach((survey) => {
                        let employeeSurvey = {survey: survey, completed: false};
                        clientSurveys.push(employeeSurvey);
                    });
                    data.surveys = clientSurveys;
                    data.password = hash;
                    const employee = new Employee(data);
                    employee.save().then(employee => {
                        client.employees.push(employee);
                        client.save();
                    }).then(() => {
                        //Now send the email to the employee here
                        // step-1 : first get the email template from the client for creating an employee
                        const from = email_template.InitialExitConfidentialEmailTemplate.from_address;
                        let subject = email_template.InitialExitConfidentialEmailTemplate.subject;
                        let body = email_template.InitialExitConfidentialEmailTemplate.body;
                        let to = employee.email;

                        // step-2 : replace the [client_name] by the client.username
                        body = body.replace('[client_name]', client.name);
                        subject = subject.replace('[client_name]', client.name);
                        body = body.replace('[employee_firstname]', employee.first_name);

                        // step-3 : [employee_username] set the employee email
                        body = body.replace('[employee_username]', to);

                        // step-4 : [employee_password] set the employee plain password.
                        body = body.replace('[employee_password]', password);
                        return helpers.SendEmailToEmployee({from, to, subject, body});
                    }).then(() => {
                        return res.status(200).send({
                            "success": true,
                            "message": "Employee successfully created",
                            employee
                        })
                    }).catch(err => {
                        next(err)
                    });
                })
            })
        })
    })
};

exports.Find = (req, res, next) => {
    const currentPage = Number(req.query.page || 1); //staticPage number
    const perPage = Number(req.query.perPage || 10); //total items display per staticPage
    let totalItems; //how many items in the database

    Employee.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            //This will return a new promise with the posts.
            return Employee.find()
                .skip((currentPage) * perPage)
                .limit(perPage);
        }).then(employees => {
        return res.status(200).json({success: true, employees, totalItems})
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
};

exports.FindById = (req, res, next) => {
    let id = req.params.id;

    Employee.findById(id, (err, employee) => {
        if (err) return next(err);
        if (!employee) {
            return res.status(404).json({
                "success": false,
                "message": "Employee not found"
            })
        }
        return res.status(200).send({
            "success": true,
            "message": "Data successfully retrieve",
            employee
        })
    });
};

//Login, Logout and Refresh Token Feature for employee
/**
 * this is used to authenticate employee to our api using email and password
 * POST api/v1/employee/login
 * @param req
 * @param res
 */

exports.login = function (req, res, next) {

    const {email, password} = req.body;
    /**
     * this is param checking if they are provided
     */
    if (!password || !email) {
        return next(new Error('Email and password is required'))
    }

    /**
     * check if the username matches any email
     */

    Employee.findOne({email}, 'username email password').then((employee, err) => {
        if (err) return (new Error("Unable to find employee with the email " + email));

        if (!employee) {
            const error = new Error("Employee not found, please sign up.");
            error.statusCode = 401;
            return next(error)
        }
        //check if the entered password is correct
        bcrypt.compare(password, employee.password, function (error, matched) {
            if (error) return next(error);

            if (!matched) {
                const error = new Error("Invalid email or password.");
                error.statusCode = 400;
                return next(error)
            }

            //save the date the token was generated for already inside toJSON()
            const employeeData = employee.toJSON();

            delete employeeData.password;

            //Generate refresh token
            let refreshToken = uuidv4();
            refreshTokens[refreshToken] = email;

            let token = jwt.sign(employeeData, config.SECRET, {
                expiresIn: '30m'
            });

            //return the token here
            res.json({access_token: token, refresh_token: refreshToken, employee_id: employee._id});
        });
    }).catch(err => {
        next(err)
    });
};

/**
 * this is used to request for another token when the other token is about
 * expiring so for next request call the token can be validated as true
 * GET /api/v1/employee/token
 * @param req
 * @param res
 */

exports.token = function (req, res, next) {
    let email = req.body.email;
    let refreshToken = req.body.refreshToken;

    if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] === email)) {
        Employee.findOne({email}, 'username email').then((employee, err) => {
            if (err) return next(err);
            if (!employee) {
                const error = new Error("Employee not found, please sign up.");
                error.statusCode = 401;
                return next(error);
            }

            // on employee we only need to set employee username, password and email
            const employeeData = employee.toJSON();

            const token = jwt.sign(employeeData, config.SECRET, {
                expiresIn: '30m'
            });
            return res.json({access_token: token, refresh_token: refreshToken, employee_id: employee._id});
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
    } else {
        const error = new Error("Employee not found, please sign up.");
        error.statusCode = 401;
        return next(error)
    }
};

/**
 * this is used to request for another token when the other token is about
 * expiring so for next request call the token can be validated as true
 * GET /api/v1/employee/logout
 * @param req
 * @param res
 */
exports.logout = function (req, res) {
    let refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens) {
        delete refreshTokens[refreshToken]
    }
    return res.status(200).json({success: true})
};

exports.Update = (req, res, next) => {
    // fetch the request data
    const data = req.body;
    let id = req.param('id');

    //Update the employee

    // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
    // Find the existing resource by ID
    Employee.findByIdAndUpdate(
        // the id of the item to find
        id,
        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        data,
        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        {new: true},

        // the callback function
        (err, employee) => {
            // Handle any possible database errors
            if (err) return next(err);
            if (!employee) return res.status(404).json({success: false, message: "Employee not found."});
            return res.send({
                "success": true,
                "message": "Record updated successfully",
                employee
            });
        }
    );
};

exports.Delete = (req, res, next) => {
    let id = req.param('id');

    const schema = Joi.object({
        id: Joi.objectId()
    });

    Joi.validate({id}, schema, (err, value) => {
        if (err) {
            // send a 422 error response if validation fails
            return res.status(422).json({
                success: false,
                message: 'Invalid request data',
                err
            });
        }
        // The "todo" in this callback function represents the document that was found.
        // It allows you to pass a reference back to the staticPage in case they need a reference for some reason.
        Employee.findByIdAndRemove(id, (err, employee) => {
            // As always, handle any potential errors:
            if (err) return next(err);
            if (!employee) return res.status(404).json({success: false, message: "Employee not found."});
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            return res.send({
                "success": true,
                "message": "Record deleted successfully",
                employee
            });
        });
    });
};

//RELATIONAL DATA FIND FUNCTIONS
exports.FindSurveys = (req, res, next) => {

    const employeeId = req.params.employeeId;

    Employee.findById(employeeId)
        .populate({
            path: 'surveys.survey',
        })
        .exec(function (err, employee) {
            if (err) return next(err);
            return res.status(200).json({success: true, surveys: employee.surveys})
        });
};

// exports.FindEmployeeDetails = (req, res, next) => {
//     const employeeId = req.params.employeeId;
//
//     Employee.findById(employeeId, (err, employee) => {
//         if (err) return next(err);
//         console.log(employee);
//         // check if the employee organization is null or not
//         findOrganization(employee.organization).then((organization) => {
//             employee.organization = organization;
//             findDivision(employee.division)
//         }).then((division) => {
//             employee.division = division;
//             findDepartment(employee.department)
//         }).then((department) => {
//             employee.department = department;
//             return res.status(200).json({success: true, employee})
//         }).catch((err) => next(err))
//         // check if the employee division is null or not
//         // check if the employee department is null or not
//     })
// };
//
// const findOrganization = (organizationId) => {
//     return new Promise((resolve, reject) => {
//         if (organizationId) {
//             Organization.findById(organizationId, (err, organization) => {
//                 console.log(organization);
//                 if (err) {
//                     reject(err)
//                 } else {
//                     if (organization) {
//                         resolve(organization.name)
//                     } else {
//                         resolve(null)
//                     }
//                 }
//             })
//         } else {
//             resolve(null);
//         }
//     })
// };
//
// const findDivision = (divisionId) => {
//     return new Promise((resolve, reject) => {
//         if (divisionId) {
//             Division.findById(divisionId, (err, division) => {
//                 console.log(division);
//                 if (err) {
//                     reject(err)
//                 } else {
//                     if (division) {
//                         resolve(division.name)
//                     } else {
//                         resolve(null)
//                     }
//                 }
//             })
//         } else {
//             resolve(null);
//         }
//     })
// };
//
// const findDepartment = (departmentId) => {
//     return new Promise((resolve, reject) => {
//         if (departmentId) {
//             Division.findById(departmentId, (err, department) => {
//                 console.log(department);
//                 if (err) {
//                     reject(err)
//                 } else {
//                     if (department) {
//                         resolve(department.name)
//                     } else {
//                         resolve(null)
//                     }
//                 }
//             })
//         } else {
//             resolve(null);
//         }
//     })
// };

