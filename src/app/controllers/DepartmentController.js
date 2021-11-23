const Account = require('../models/Account');
const Notification = require('../models/Notification');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

class DepartmentController {
    // GET department/home
    async renderHome(req, res, next) {
        const account = req.account;
        const first_10_post = await Post.find({ user_id: account._id })
            .sort({ created_at: -1 })
            .limit(10);
        res.send({ account, first_10_post });
        // res.render('./department/home')
    }
    // GET department/notify
    async renderNotifyPage(req, res, next) {
        const account = req.account;
        const notification = await Notification.find({ user_id: account._id });
        res.send({ account, notification });
        // res.render('./department/notification', {account, notification});
    }
    // GET department/notify/:id
    async renderDetailNotify(req, res, next) {
        const account = req.account;
        const id = req.params.id;
        const notification = await Notification.findOne({ _id: id });
        res.send({ account, notification });
        // res.render('./department/detailNotification', {account, notification});
    }

    // POST department/createNotify
    async createNotify(req, res, next) {
        const account = req.account;
        const notification = new Notification({
            userId: account._id,
            username: account.username,
            category: req.body.category,
            title: req.body.title,
            date: req.body.date,
            content: req.body.content,
        });
        await notification.save();
        res.status(200).send({ notification });
    }

    // POST notify/:id
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

    // DELETE notify/:id
    async deleteNotify(req, res, next) {
        const id = req.params.id;
        const notification = await Notification.findOne({ _id: id });
        await notification.remove();
        res.redirect("/department/notify");
    }

    // GET department//accounts
    renderAccountPage(req, res, next) {
        const account = req.account;
        res.render("./department/account", { account });
    }
}

module.exports = new DepartmentController();
