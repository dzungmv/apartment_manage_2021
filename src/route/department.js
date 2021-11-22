const express = require('express');
const router = express.Router()
const checkDepartment = require('../app/middlewares/checkDepartment');
const DepartmentController = require('../app/controllers/DepartmentController');

router.get('/home', checkDepartment, DepartmentController.renderHome)
router.get('/notify/:id', checkDepartment, DepartmentController.renderDetailNotify)
router.get('/notify', checkDepartment, DepartmentController.renderNotifyPage)
router.get('/accounts', checkDepartment, DepartmentController.renderAccountPage)
router.post('/createNotify', checkDepartment, DepartmentController.createNotify)
router.post('/notify/:id', checkDepartment, DepartmentController.updateNotify)
router.delete('/notify/:id', checkDepartment, DepartmentController.deleteNotify)
router.post('/changePassword', checkDepartment, DepartmentController.changePassword)
module.exports = router;
