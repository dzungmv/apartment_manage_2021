const Account = require('../models/Account');
const Notification = require('../models/Notification');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

class DepartmentController {
   
    async renderHome(req, res, next) {
        const account = req.account;
        const first_5_posts = await Post.find({})
          .sort({ date: -1 })
          .limit(10)
          .lean();
        res.render('./department/home', { account, first_5_posts });
    }

    async renderNotifyPage(req, res, next) {
        const account = req.account;
        const my_notifications = await Notification.find({ userId: account._id }).lean();
        res.render('./department/notifications', {account, my_notifications});
    }

    async renderDetailNotify(req, res, next) {
        const account = req.account;
        const id = req.params.id;
        const notification = await Notification.findOne({ _id: id }).lean();
        res.render('./department/detailNotification', {account, notification});
    }

    async createNotify(req, res, next) {
        const account = req.account;
        const notification = new Notification({
            userId: account._id,
            username: account.username,
            category: req.body.category,
            title: req.body.title,
            content: req.body.content,
        });
        await notification.save();
        res.status(200).send({ notification });
    }

    async updateNotify(req, res, next) {
        const id = req.params.id;
        const notification = await Notification.findOne({ _id: id });
        notification.category = req.body.category;
        notification.title = req.body.title;
        notification.date = req.body.date;
        notification.content = req.body.content;
        await notification.save();
        res.redirect("/department/notify");
    }

    async deleteNotify(req, res, next) {
        const id = req.params.id;
        const notification = await Notification.findOne({ _id: id });
        await notification.remove();
        res.redirect("/department/notify");
    }
}

module.exports = new DepartmentController();
