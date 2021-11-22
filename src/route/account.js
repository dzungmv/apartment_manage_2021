const express = require('express');
const router = express.Router()
const passport = require('passport');
require('../config/passport');
const checkMail = require('../app/middlewares/checkMail')
const AccountController = require('../app/controllers/AccountController');
const flash = require('../app/middlewares/flashMessage');
const checkUser = require('../app/middlewares/checkUser');

router.use(passport.initialize());
router.use(passport.session());

router.get('/login', flash, AccountController.renderLogin)
router.get('/login-google-failure', AccountController.loginGoogleFailure)
router.get('/login-google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login-google-failure' }), AccountController.googleCallBack);
router.get('/check-login-google', checkMail, AccountController.loginGoogle, AccountController.createAccountStudent)
router.get('/', AccountController.renderLogin)
router.post('/loginByAccount', AccountController.loginByAccount)
router.post('/update', checkUser, AccountController.updateAccount)
router.get('/logout', AccountController.logOut)
module.exports = router;
