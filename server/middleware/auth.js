const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = require('../models/user');
const Employee = require('../models/employee')
//Config
const config = require('../config');

module.exports = {
    validateToken: function (req, res, next) {
        let bearerToken;
        let bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            let bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];

            if (bearer[0] !== "Bearer" || !bearerToken) {
                const error = new Error("bearer not understood");
                error.statusCode = 401;
                throw error
            }

            //verify if this token was from us or not
            jwt.verify(bearerToken, config.SECRET, function (err, decoded) {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        const error = new Error("Session timed out, please login again");
                        error.statusCode = 401;
                        throw error
                    } else {
                        throw err
                    }
                }
                let id = mongoose.Types.ObjectId(decoded._id);
                if (decoded.login_type == "client") {
                    User.findOne(id).then((user, error) => {
                        if (error) throw error;

                        if (!user) {
                            const error = new Error("User not found, please sign up.");
                            error.statusCode = 422;
                            throw error
                        }
                        //Here check the employee permission with the request.
                        //needs to populate role than populate role permission
                        req.user = user;
                        next()
                    }).catch(err => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err)
                    })
                } else {
                    Employee.findOne(id).then((employee, error) => {
                        if (error) throw error;

                        if (!employee) {
                            const error = new Error("Employee not found, please sign up.");
                            error.statusCode = 422;
                            throw error
                        }
                        //Here check the employee permission with the request.
                        //needs to populate role than populate role permission
                        req.employee = employee;
                        next()
                    }).catch(err => {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err)
                    })
                }

            });

        } else {
            const error = new Error("No token provided");
            error.statusCode = 403;
            next(error)
        }
    }
}
