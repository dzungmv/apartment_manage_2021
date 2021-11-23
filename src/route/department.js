const express = require('express');
const router = express.Router()
const checkDepartment = require('../app/middlewares/checkDepartment');
const DepartmentController = require('../app/controllers/DepartmentController');

router.use(checkDepartment);
router.get('/home', DepartmentController.renderHome)
router.get('/notify/:id', DepartmentController.renderDetailNotify)
router.get('/notify', DepartmentController.renderNotifyPage)
router.get('/accounts', DepartmentController.renderAccountPage)
router.post('/createNotify', DepartmentController.createNotify)
router.post('/notify/:id', DepartmentController.updateNotify)
router.delete('/notify/:id', DepartmentController.deleteNotify)
module.exports = router;
