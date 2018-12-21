const Employee = require('../models/employee');

//RELATIONAL MODEL
const Client = require('../models/client');
const Organization = require('../models/organization');
//Validation Library
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const bcrypt = require('bcryptjs');

//JSON FILE PARSING LIBRARY
let csvToJson = require('convert-csv-to-json');


//Validation SCHEMA
const employeeSchema = require('../validation/employee');

// PASSWORD GENERATOR LIBRARY
const generator = require('generate-password');

//LOAD EMAIL TEMPLATES
const email_template = require('../helpers/email_template');
const helpers = require('../helpers/email');


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
            .exec(function (err, organizations) {
                if (err) return next(err);
                console.log(organizations);
                for (let i = 0; i < json.length; i++) {
                    //here find the organization by name
                    const employeeOrganization = findOrganizationByName(json[i].organization, organizations);
                    json[i].organization = employeeOrganization ? employeeOrganization: null;
                    //here find the division by name
                    const employeeDivision = findDivisionByName(json[i].division, organizations);
                    json[i].division = employeeDivision ? employeeDivision : null;
                    //here find the department by name
                    const employeeDepartment = findDepartmentByName(json[i].department, organizations);
                    json[i].department = employeeDepartment ? employeeDepartment : null;

                    employees.push(json[i]);
                }
                console.log(employees);
                //Save the employees into the database
                Employee.insertMany(employees, (err, docs) => {
                    if (err) return next(err);
                    //After saving the employees insert all the employees id to the
                    //client employees array
                    docs.forEach((employee) => {
                        client.employees.push(employee);
                    });
                    //Finally save the client
                    client.save().then(() => {
                        res.status(200).json({
                            employees: docs,
                            success: true,
                            message: 'Employees successfully uploaded'
                        });
                    });
                });
            });
    });
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

