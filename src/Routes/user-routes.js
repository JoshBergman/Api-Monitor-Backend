const express = require('express');
const router = express.Router();

const authController = require('../Controllers/user-auth-controller'); //logins in user, manages session ID, and manages user API data
const userManagementController = require('../Controllers/user-management-controller'); //for users to manage their account information, change password, delete account, etc...
const signupController = require('../Controllers/signup-controller'); //for new users to signup

//? .../api/users/

//!delete test call
router.get('/', authController.test);

// //*login & api list fetch
// router.get('/api-list/:sid', authController); //fetches list of API's given the user session ID is valid

// router.post('/'); //login to existing account returns session id to store in local storage

// router.get('/validate/:sid'); //validates current session id

// //*acount managing


// //*new user signup
// router.post('/signup', signupController); //makes new account given email isn't already used

module.exports = router;