const mongoose = require('mongoose')
// const config = require('../config/config')
// const crypto = require('crypto')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    phone: {
        type: String,
        // required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
)

// code to generated jwt token 
JWT = "BARBADTESTALFATESTQWESTSAGARINGHSSOMAMJAH"

// userSchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this._id }, config.JWT, {
//         expiresIn: '7d'
//     })
// }
// userSchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this._id }, JWT, {
//         expiresIn: '7d'
//     })
// }

module.exports = mongoose.model('User', userSchema)