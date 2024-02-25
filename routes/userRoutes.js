const express = require('express')
const router = express.Router()
const { validateUser } = require('../middleware/userValidations')
const userController = require('../controller/userController')
const { isAuthenticated } = require('../middleware/Auth')



// Test Route
router.get('/test', userController.hello)


// route to register the user
// router.post('/register/user', validateUser, userController.registeruser)
router.post('/register/user', userController.registeruser)


// // authetications routes
// router.post('/verify/auth/user', userController.login)

// // route to get user by id
// router.get('/get/user/:id', isAuthenticated, userController.getbyId)

// // route to update user 
// router.put('/update/user', isAuthenticated, userController.updateUser)

// // route to delete user by id
// router.delete('/delete/user/:id', isAuthenticated, userController.deleteUser)

// // route to disable or unable to user
// router.put('/isdsiable/user', isAuthenticated, userController.disableUser)

// //route to get all user using filter
// router.get('/users', userController.getAllUser)


module.exports = router