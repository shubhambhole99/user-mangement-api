// importing the define schema and modules
const user = require('../models/userSchema')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
// const bcrypt = require('bcrypt')
const logger = require("../utlis/logger")



exports.hello = async (req, res) => {
    console.log("hi")
    return res.status(200).json({
        success: true,
        message: "user registered succesfully",
        data: "Hit Success"

    })
}



//registring the user
exports.registeruser = catchAsyncErrors(async (req, res) => {
    try {
        // validating the proper body
        const {
            firstName, lastName, email, phone, isDisabled, password
        } = req.body

        const finduser = await user.findOne({ email: email })
        if (finduser) {
            res.status(400).json({
                success: false,
                message: "user already exist ! with same email id"
            })
            return
        }
        const createUser = await user.create({
            firstName, lastName, email, phone, isDisabled, password
        })

        if (!createUser) {
            res.status(400).json({
                success: false,
                message: 'cannot create user',
            })
        }

        if (createUser) {
            // const token = createUser.getJwtToken()
            // const salt = await bcrypt.genSalt(10);
            // createUser.password = await bcrypt.hash(createUser.password, salt);

            await createUser.save()
            logger.info('User registered successfully');
            return res.status(200).json({
                success: true,
                message: "user register succesfully",
                data: createUser,
                // token: token
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "validation failled in catch",
        });
    }
})

// login the user
// exports.login = catchAsyncErrors(async (req, res) => {
//     try {
//         const { email, password, phone } = req.body

//         const finduser = await user.find({
//             $or: [{
//                 email: email
//             },
//             {
//                 phone: phone
//             }
//             ]
//         })
//         console.log(finduser, '68')
//         if (!finduser[0] && !phone) {
//             res.status(400).json({
//                 success: false,
//                 message: "Incorrect credential",
//             });
//             return
//         }

//         if (!finduser[0] && !email) {
//             res.status(400).json({
//                 success: false,
//                 message: "Incorrect credential",
//             });
//             return
//         }
//         // if user is insactive then dont login
//         // console.log(finduser)
//         console.log(finduser[0].isDisabled, "isactive")
//         if (finduser[0].isDisabled === true) {
//             res.status(400).json({
//                 success: false,
//                 message: "User Is not active So You Cannot Login"
//             })
//             return
//         }

//         let passwordData
//         let data1
//         finduser && finduser.map((i) => {
//             passwordData = i.password
//             data1 = i
//         })
//         const token = data1.getJwtToken()
//         console.log(token, "token")
//         if (finduser) {
//             let ismatch = await bcrypt.compare(password, passwordData)
//             // let ismatch = finduser.comparePassword(password)
//             console.log(ismatch, "ismatch")
//             if (!ismatch) {
//                 res.status(400).json({
//                     success: false,
//                     message: "Incorrect Password",
//                 });
//                 return
//             }
//             if (ismatch) {
//                 data1.token = token
//                 const token1 = Object.assign(data1, { token })
//                 if (token1) {
//                     logger.info('User logged in successfully');
//                     res.status(200).json({
//                         success: true,
//                         message: "Login succesfully ",
//                         data: data1,
//                         // userRole: userRoleData,
//                         token: token
//                     });
//                     return
//                 } else {
//                     res.status(400).json({
//                         success: false,
//                         message: "Login Unsuccesfully ",
//                     });
//                 }
//             }

//         }

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "something went wrong",
//             data: error
//         })
//     }
// })

// //get user by using id
// exports.getbyId = catchAsyncErrors(async (req, res) => {
//     try {
//         const finduser = await user.findById(req.params.id)
//         if (!finduser) {
//             res.status(400).json({
//                 message: "cannot find user !, please check the id",
//                 success: false
//             })
//             return
//         }
//         if (finduser) {
//             logger.info(`User ${req.params.id} retrieved successfully`);

//             res.status(200).json({
//                 success: true,
//                 message: "user found with objectid",
//                 data: finduser,
//             })
//             return
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "getUsersById failled in catch",
//         });
//     }
// })

// // update user data & user can be disable from here also
// exports.updateUser = catchAsyncErrors(async (req, res) => {
//     try {
//         // intiliazing req.body so not to rewite the code and maintain time complextity
//         let data = req.body
//         // directly using token and then verfying the user and updating it
//         const updateUser = await user.findByIdAndUpdate(req.user._id, data, {
//             new: true
//         })
//         if (!updateUser) {
//             return res.status(400).json({
//                 message: "cannot update user",
//                 success: false
//             })
//             return
//         }

//         if (updateUser) {
//             logger.info(`User ${req.params.id} updated successfully`);

//             return res.status(200).json({
//                 messagae: "data found",
//                 success: true,
//                 data: updateUser
//             })
//             return
//         }

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "something went wrong !"
//         })
//     }
// })

// // route to delete
// exports.deleteUser = catchAsyncErrors(async (req, res) => {
//     try {

//         const finduser = await user.findById(req.params.id)
//         if (!finduser) {
//             return res.status(201).json({
//                 success: false,
//                 messagae: "user doesnot exsit"
//             })
//         }
//         if (finduser) {
//             const deleteuser = await user.findByIdAndDelete(req.params.id)
//             if (!deleteuser) {
//                 res.status(400).json({
//                     success: false,
//                     messagae: "unable to delete user"
//                 })
//                 return
//             }
//             if (deleteuser) {
//                 logger.info(`User ${req.params.id} deleted successfully`);

//                 res.status(200).json({
//                     success: true,
//                     messagae: "user delete successfully",
//                     data: deleteuser
//                 })
//                 return
//             }

//             return
//         }

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "something went wrong !"
//         })
//     }
// })


// // specfic route to disable user
// exports.disableUser = catchAsyncErrors(async (req, res) => {
//     try {
//         const finduser = await user.findById(req.user._id)
//         if (finduser) {
//             console.log(finduser.isDisabled)

//         }
//         user.isDisabled = !user.isDisabled;

//         const disableUserData = await user.findByIdAndUpdate(req.user._id, {
//             isDisabled: req.body.isDisabled
//         }, {
//             new: true
//         })
//         console.log(disableUserData, '236')
//         if (!disableUserData) {
//             return res.status(400).json({
//                 success: "false",
//                 messagae: "unable to disable user"
//             })
//         }
//         if (disableUserData) {
//             logger.info('user disable successfully');

//             return res.status(200).json({
//                 success: true,
//                 messagae: "user update sucessfulyy",
//                 data: disableUserData
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "something went wrong !"
//         })
//     }
// })

// // Get all users with filters

// exports.getAllUser = catchAsyncErrors(async (req, res) => {
//     try {
//         const filters = {};
//         if (req.query.firstName) {
//             filters.firstName = new RegExp(req.query.firstName, 'i');
//         }
//         if (req.query.lastName) {
//             filters.lastName = new RegExp(req.query.lastName, 'i');
//         }
//         if (req.query.email) {
//             filters.email = new RegExp(req.query.email, 'i');
//         }
//         if (req.query.phone) {
//             filters.phone = new RegExp(req.query.phone, 'i');
//         }
//         if (req.query.isDisabled) {
//             filters.isDisabled = req.query.isDisabled === 'true';
//         }
//         try {
//             const users = await user.find(filters);
//             if (!users) {
//                 res.status(400).json({
//                     success: false,
//                     messagae: "unable to find user"
//                 })
//                 return
//             }
//             if (users) {
//                 logger.info('All users retrieved successfully');

//                 return res.status(200).json({
//                     success: true,
//                     messagae: "user data found",
//                     count: users.length,
//                     data: users,
//                 })
//             }
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             messagae: "something went wrong"
//         })
//     }
// })