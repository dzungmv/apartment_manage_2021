const express = require('express');
const router = express.Router()
const UserController = require('../app/controllers/UserController');
const checkLogin = require('../app/middlewares/checkLogin')

router.get('/home', checkLogin, UserController.renderHome)
router.get('/nofify/:id', checkLogin, UserController.renderDetailNotify)
router.get('/notify', checkLogin, UserController.renderNotyfyPage)
router.get('/notify-departments', checkLogin, UserController.renderNotyfyDepartmentPage)
router.get('/my-profile', checkLogin, UserController.renderMyProfile)

module.exports = router;
