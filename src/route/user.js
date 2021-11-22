const express = require('express');
const router = express.Router()
const UserController = require('../app/controllers/UserController');
const checkUser = require('../app/middlewares/checkUser')

router.get('/home', checkUser, UserController.renderHome)
router.get('/nofify/:id', checkUser, UserController.renderDetailNotify)
router.get('/notify', checkUser, UserController.renderNotifyPage)
router.get('/notify-departments', checkUser, UserController.renderNotifyDepartmentPage)
router.get('/my-profile', checkUser, UserController.renderMyProfile)
module.exports = router;
