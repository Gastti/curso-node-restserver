const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        requried: [true, 'El rol es obligatorio']
    }
})

module.exports = model('Role', RoleSchema)