const Joi = require('joi')

// taking body resposne from postman /server(FE)
const registeruser = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    password:Joi.string().required(),
    phone: Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    isDisabled: Joi.boolean(),
})

const validateUser = async (req, res, next) => {
    const data = req.body
    const payload = data
    const { error } = registeruser.validate(payload)
    if (error) {
        res.status(406).json({
            message: `validtion failed${error.message}`
        })
        return
    }
    next()
}
module.exports = {
    validateUser
}