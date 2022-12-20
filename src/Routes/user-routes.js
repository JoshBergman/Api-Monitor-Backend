const express = require('express');
const router = express.Router();

const authController = require('../Controllers/user-auth-controller');
const userManagementController = require('../Controllers/user-management-controller');
const signupController = require('../Controllers/signup-controller');
const APIController = require('../Controllers/API-Manage-Controller');


//*current route: .../api/users/new path here

//API operations
router.put('/list/new/:sid', APIController.addOne); //adds an API to list

router.delete('/list/delete/:sid', APIController.deleteOne); //deletes an API to list

router.get('/list/:sid', APIController.getAPIList); //returns API List

//acount management
router.get('/login/:loginString', authController.login); //returns API List + SID

router.delete('/list/reset/:sid', userManagementController.resetAPIList); //resets API List

router.put('/update/auth/:sid', authController.updatePassword); //updates password given SID and old password

router.post('/signup', signupController.newUser); //creates new user

router.delete('/delete/:sid', userManagementController.deleteAccount); //deletes user



module.exports = router;