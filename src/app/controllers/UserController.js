
const Account = require('../models/Account')
const Post = require('../models/Post')
const Notification = require('../models/Notification')

class UserController {
    // GET /home
    async renderHome(req, res, next) {
        const account = req.account;
        const first_10_posts = await Post.find({}).sort({ created_at: -1 }).limit(10).lean()
        const first_10_notifications = await Notification.find({ user_id: account._id }).sort({ created_at: -1 }).limit(10).lean()
        // res.send({ account, first_10_post, first_10_notifications })
        res.render('./user/home', { account, first_10_posts, first_10_notifications })
    }
    // GET /notify
    async renderNotifyPage(req, res, next) {
        const account = req.account;
        const first_10_notifications = await Notification.find({ user_id: account._id }).sort({ created_at: -1 }).limit(10).lean()
        res.render('./user/notifications', { account, first_10_notifications })
    }
    // GET /notify/:id
    async renderDetailNotify(req, res, next) {
        const account = req.account;
        const id = req.params.id
        const notification = await Notification.findOne({ _id: id }).lean()
        res.render('./user/detailNotification', { account, notification })
    }

    // GET /notify-departments/:department_id
    async renderNotifyDepartmentPage(req, res, next) {
        const account = req.account;
        const notifications_of_department = await Notification.find({ user_id: req.params.departments_id }).lean()
        res.render('./user/notificationsClassification', { account, notifications_of_department })
    }

    // GET /my-profile
    async renderMyProfile(req, res, next) {
        const account = req.account;
        const my_first_10_post = await Post.find({ user_id: account._id }).sort({ created_at: -1 }).limit(10).lean();
        res.render('./user/profile', { account, my_first_10_post })
    }
}

module.exports = new UserController();
