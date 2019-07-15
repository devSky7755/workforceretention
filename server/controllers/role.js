const Role = require('../models/role');
const User = require('../models/user')
//Validation Library
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//Validation SCHEMA
const roleSchema = require('../validation/role');

exports.Create = function (req, res, next) {
    const data = req.body;
    Joi.validate(data, roleSchema, (err, value) => {
        if (err) return next(err);
        //First find the employee by id
        //now push this newPost to the employee clients array === employee.clients.push(newPost)
        //now save the employee. this will automatically creates the relationship
        //and the newPost will be added into the C
        const role = new Role(data);
        role.save(function (err) {
            if (err) next(err);
            return res.status(200).send({
                "success": true,
                "message": "Role successfully created",
                role
            })
        })
    })
}

exports.Find = (req, res, next) => {
    let currentPage = Number(req.query.page || 1); //staticPage number
    const perPage = Number(req.query.perPage || 10); //total items display per staticPage
    let totalItems; //how many items in the database

    Role.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            //This will return a new promise with the posts.
            return Role.find()
                .skip((currentPage) * perPage)
                .limit(perPage);
        }).then(roles => {
            return res.status(200).json({ success: true, roles, totalItems })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        });
};

exports.FindById = (req, res, next) => {
    let id = req.params.id;

    Role.findById(id, (err, role) => {
        if (err) return next(err);
        if (!role) {
            const error = new Error('Role not found');
            error.statusCode = 404;
            return next(error);
        }
        // role.permissions = role.permissions.filter(permission => {
        //     return !['Products', 'Articles', 'Links'].includes(permission.table_name)
        // });
        return res.status(200).send({
            "success": true,
            "message": "Data successfully retrieve",
            role
        })
    });
};

exports.FindByUserId = (req, res, next) => {
    let id = req.params.id;

    User.findById(id).populate({ path: 'role', model: 'Role' }).then((user, err) => {
        if (err) throw new Error("Unable to find user");
        if (!user) {
            const error = new Error("User not found, please sign up.");
            error.statusCode = 401;
            throw error
        }

        if (!user.role) {
            const error = new Error("User not found, please sign up.");
            error.statusCode = 401;
            throw error
            // return res.status(200).send({
            //     "success": true,
            //     "message": "Data successfully retrieve",
            //     "role": "super_admin"
            // })
        }

        user.role.permissions = user.role.permissions.filter(permission => {
            return permission.has_access
        });
        return res.status(200).send({
            "success": true,
            "message": "Data successfully retrieve",
            "role": user.role
        })
    }).catch(err => {
        next(err)
    });
};

exports.Update = (req, res, next) => {
    // fetch the request data
    const data = req.body;
    let id = req.params.id;

    //Update the employee

    // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
    // Find the existing resource by ID
    Role.findByIdAndUpdate(
        // the id of the item to find
        id,
        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        data,
        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, role) => {
            // Handle any possible database errors
            if (err) return next(err);
            if (!role) {
                const error = new Error('Role not found');
                error.statusCode = 404;
                return next(error);
            }
            // role.permissions = role.permissions.filter(permission => {
            //     return !['Products', 'Articles', 'Links'].includes(permission.table_name)
            // });
            return res.send({
                "success": true,
                "message": "Record updated successfully",
                role
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
            return res.status(422).json({
                success: false,
                message: 'Invalid request data',
                err
            });
        }
        // The "todo" in this callback function represents the document that was found.
        // It allows you to pass a reference back to the staticPage in case they need a reference for some reason.
        Role.findByIdAndRemove(id, (err, role) => {
            // As always, handle any potential errors:
            if (err) return next(err);
            if (!role) {
                const error = new Error('Role not found');
                error.statusCode = 404;
                return next(error);
            }
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            return res.send({
                "success": true,
                "message": "Record deleted successfully",
                role
            });
        });
    });
};

