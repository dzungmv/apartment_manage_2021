const express = require('express');
const router = express.Router()
const AdminController = require('../app/controllers/AdminController');
const checkAdmin = require('../app/middlewares/checkAdmin');

router.get('/home', checkAdmin, AdminController.renderHome)
router.get('/departments', checkAdmin, AdminController.renderDepartmentPage)
router.get('/accounts', checkAdmin, AdminController.renderMyAccount)
router.post('/createDepartmentAccount', checkAdmin, AdminController.createDepartmentAccount)

module.exports = router;
