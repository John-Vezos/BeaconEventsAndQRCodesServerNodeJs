const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');
const Authentication_controller = require('../controllers/Authentication.controller');


// a simple test url to check that all of our files are communicating correctly.

router.post('/user_Login', user_controller.UserLogin);
router.post('/user_Register', [user_controller.checkIfUserExists , user_controller.UserRegister]);
router.get('/refresh', Authentication_controller.refreshToken);

module.exports = router;