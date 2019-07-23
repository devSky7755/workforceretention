const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    table_name: {
        type: String,
        required: true,
    },
    has_access: {
        type: Boolean,
        required: true
    },
    // is_read: {
    //     type: Boolean,
    //     required: true
    // },
    is_update: {
        type: Boolean,
        required: true
    },
    is_add: {
        type: Boolean,
        required: true
    },
    is_delete: {
        type: Boolean,
        required: true
    }

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

});

module.exports = permissionSchema;
