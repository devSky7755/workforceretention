const nodemailer = require('nodemailer');
const smtpTransport = require("nodemailer-smtp-transport");
const checkEnv = require('./check_env')

const authEmail = checkEnv.isLiveServer ? process.env.EMAIL_AUTH_USERNAME : 'no-reply@workforceretention.com.au';
const authPass = checkEnv.isLiveServer ? process.env.EMAIL_AUTH_PASS : 'ZXCVasdf!@#$'

let transporter = null
if (!checkEnv.isLiveServer) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: authEmail,
            pass: authPass
        }
    });
} else {
    transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.office365.com',
        port: 587,
        auth: {
            user: authEmail,
            pass: authPass
        }
    }));
}

exports.sendEmail = function (req, res, next) {
    //Extract the from to subject and email body from the request
    const { from, to, subject, body } = req.body;

    const mailOptions = {
        from: authEmail,
        replyTo: from,
        to: to,
        subject: subject,
        html: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            next(error)
        } else {

            console.log('Email sent: ' + info.response);
            res.status(200).send({
                "success": true,
                "message": "Email successfully sent!",
            })
        }
    });
};


exports.SendEmailToEmployee = function (email) {
    const { from, to, subject, body } = email;
    const mailOptions = {
        from: authEmail,
        replyTo: from,
        to: to,
        subject: subject,
        text: body
    };
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log(info);
                resolve({
                    "success": true,
                    "message": "Email successfully sent!",
                })
            }
        });
    })
};


exports.SendNormalEmail = function (email) {
    const { from, to, subject, body } = email;
    const mailOptions = {
        from: authEmail,
        replyTo: from,
        to: to,
        subject: subject,
        html: body
    };
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log(info);
                resolve({
                    "success": true,
                    "message": "Email successfully sent!",
                })
            }
        });
    })
};