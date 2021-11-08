const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    payroll: {
        type: String,
        required: true
    },
    roles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Role",
        required: true
    }
});

const Manager = mongoose.model('Manager', schema);

module.exports = Manager;