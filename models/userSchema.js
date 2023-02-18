const mongoose = require('mongoose-migrate')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)