const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');

//LOAD EMAIL SERVICE AND TEMPLATES
const helpers = require('../helpers/email');
const email_template = require('../helpers/email_template');

const refreshTokens = {};

//Config
const config = require('../config');

// AuthController responsibility is login, logout, generate a new token, delete a token from the server

/**
 * this is used to authenticate employee to our api using email and password
 * POST api/v1/employee/login
 * @param req
 * @param res
 */

exports.login = function (req, res, next) {

    const { email, password } = req.body;
    /**
     * this is param checking if they are provided
     */
    if (!password || !email) {
        return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Provide email and password!' }] });
    }

    /**
     * check if the username matches any email
     */

    User.findOne({ email }).populate({ path: 'role' }).then((user, err) => {
        if (err) throw new Error("Unable to find user with the email " + email);

        if (!user) {
            const error = new Error("User not found, please sign up.");
            error.statusCode = 401;
            throw error
        }
        //check if the entered password is correct
        bcrypt.compare(password, user.password, function (error, matched) {
            if (error) return next(error);

            if (!matched) {
                const error = new Error("Invalid password.");
                error.statusCode = 400;
                return next(error)
            }

            //save the date the token was generated for already inside toJSON()
            const userData = user.toJSON();

            delete userData.surveys;
            delete userData.password;
            delete userData.clients;
            delete userData.links;

            //Generate refresh token
            let refreshToken = uuidv4();
            refreshTokens[refreshToken] = email;

            //save the refreshToken inside the userData
            userData.refreshToken = refreshToken;
            userData.login_type = "client"

            let token = jwt.sign(userData, config.SECRET, {
                expiresIn: '7d'
            });

            //return the token here
            res.json({ token });
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
        User.findOne({ email }).then((user, err) => {
            if (err) return next(err);
            if (!user) {
                const error = new Error("User not found, please sign up.");
                error.statusCode = 401;
                return next(error);
            }

            const userData = user.toJSON();
            userData.refreshToken = refreshToken;

            delete userData.surveys;
            delete userData.password;
            delete userData.clients;
            delete userData.links;
            userData.login_type = "client"

            const token = jwt.sign(userData, config.SECRET, {
                expiresIn: '7d'
            });
            return res.json({ token });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
    } else {
        const error = new Error("User not found, please sign up.");
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
    return res.status(200).json({ success: true })
};

/**
 * this is used to send reset password link
 * GET api/v1/auth/request-pass
 * @param req
 * @param res
 */

exports.requestPass = function (req, res, next) {

    const { email } = req.body;
    /**
     * this is param checking if they are provided
     */
    if (!email) {
        return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Provide email!' }] });
    }

    /**
     * check if the username matches any email
     */

    User.findOne({ email }).populate({ path: 'role' }).then((user, err) => {
        if (err) {
            return res.status(401).send({ data: { errors: ['Unable to find user with the email' + email] } });
        }
        if (!user) {
            return res.status(401).send({ data: { errors: ['User not found, please sign up.'] } });
        }

        const from = email_template.AdminReSetPasswordTemplate.from_address;
        let subject = email_template.AdminReSetPasswordTemplate.subject;
        let body = email_template.AdminReSetPasswordTemplate.body;

        const userData = user.toJSON();

        delete userData.surveys;
        delete userData.password;
        delete userData.clients;
        delete userData.links;
        userData.login_type = "reset-pass"

        let token = jwt.sign(userData, config.SECRET, {
            expiresIn: '7d'
        });

        helpers.SendNormalEmail({
            from,
            to: email,
            subject,
            body: body.replace('[token]', token),
        })

        return res.json({
            "success": true,
            "email": email,
        })
    }).catch(err => {
        next(err)
    });
};


/**
 * this is used to send reset password
 * GET api/v1/auth/request-pass
 * @param req
 * @param res
 */

exports.resetPass = function (req, res, next) {

    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
        return res.status(403).send({ data: { errors: ['Password does not match the confirm password.'] } });
    }

    if (typeof token !== 'undefined') {
        //verify if this token was from us or not
        jwt.verify(token, config.SECRET, function (err, decoded) {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).send({ data: { errors: ['Token is expired.'] } });
                } else {
                    throw err
                }
            }
            let id = mongoose.Types.ObjectId(decoded._id);
            if (decoded.login_type == "reset-pass") {
                User.findOne(id).then(async (user, error) => {
                    if (error) throw error;
                    if (!user) {
                        return res.status(401).send({ data: { errors: ['User not found.'] } });
                    }
                    await bcrypt.genSalt(10, function (err, salt) {
                        if (err) return next(err);
                        bcrypt.hash(password, salt, async function (err, hash) {
                            if (err) return next(err);
                            // Store hash in your password DB.
                            // Update the password of the data
                            user.password = hash
                            user.save((err) => {
                                if (err) return next(err);
                                return res.status(200).send({
                                    "success": true,
                                    "message": "Password successfully changed",
                                    user
                                })
                            });
                        })
                    })
                }).catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err)
                })
            } else {
                const error = new Error("Token is invalid");
                error.statusCode = 422;
                throw error
            }

        });
    } else {
        return res.status(403).send({ data: { errors: ['No token provided.'] } });
    }
};