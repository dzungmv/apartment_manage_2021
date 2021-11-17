const express = require('express');
const router = express.Router()
const checkLogin = require('../app/middlewares/checkLogin');
const DepartmentController = require('../app/controllers/DepartmentController');

router.get('/home', checkLogin, DepartmentController.renderHome)
router.get('/nofify/:id', checkLogin, DepartmentController.renderDetailNotify)
router.get('/notify', checkLogin, DepartmentController.renderNotyfyPage)
// router.get('/notify-departments', checkLogin, DepartmentController.renderNotyfyDepartmentPage)
router.get('/accounts', checkLogin, DepartmentController.renderAccountPage)
router.post('/createNotify', checkLogin, DepartmentController.createNotify)
router.post('/:id/update', checkLogin, DepartmentController.updateNotify)
router.delete('/:id/delete', checkLogin, DepartmentController.deleteNotify)

module.exports = router;
