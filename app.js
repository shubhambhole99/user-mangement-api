const express = require('express')
const sls = require('serverless-http')
const app = express()
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
// check
// const config = require('./config/config')
// const bcrypt = require('bcrypt')
const user = require('./models/userSchema')

require('./database/db')

app.use(express.json())
app.use('/hi', userRoutes)

port = 3000

app.get('/hi', async (req, res, next) => {
    res.status(200).send('Hello World!')
})

app.get('/users', async (req, res) => {
    try {
        const filters = {};
        // if (req.query.firstName) {
        //     filters.firstName = new RegExp(req.query.firstName, 'i');
        // }
        // if (req.query.lastName) {
        //     filters.lastName = new RegExp(req.query.lastName, 'i');
        // }
        // if (req.query.email) {
        //     filters.email = new RegExp(req.query.email, 'i');
        // }
        // if (req.query.phone) {
        //     filters.phone = new RegExp(req.query.phone, 'i');
        // }
        // if (req.query.isDisabled) {
        //     filters.isDisabled = req.query.isDisabled === 'true';
        // }
        try {
            const users = await user.find();
            if (!users) {
                res.status(400).json({
                    success: false,
                    messagae: "unable to find user"
                })
                return
            }
            if (users) {

                return res.status(200).json({
                    success: true,
                    messagae: "user data found",
                    count: users.length,
                    data: users,
                })
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            messagae: "something went wrong"
        })
    }
})

app.listen(port, () => {
    console.table([
        {
            port: `${port}`
        }
    ])
})




module.exports.server = sls(app)