const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Role = mongoose.model('Role', schema);

module.exports = Role;