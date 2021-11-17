const express = require('express');
const router = express.Router()
const AdminController = require('../app/controllers/AdminController');
const checkLogin = require('../app/middlewares/checkLogin');

router.get('/home', checkLogin, AdminController.renderHome)
// router.get('/nofify/:id', AdminController.renderDetailNotify)
// router.get('/notify', AdminController.renderNotyfyPage)
// router.get('/notify-departments', AdminController.renderNotyfyDepartmentPage)
router.get('/departments', checkLogin, AdminController.renderDepartmentPage)
router.get('/accounts', checkLogin, AdminController.renderMyAccount)
router.post('/createDepartmentAccount', checkLogin, AdminController.createDepartmentAccount)

module.exports = router;
