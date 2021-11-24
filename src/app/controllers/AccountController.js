const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const TOKEN_KEY = "password"
const multiparty = require('multiparty');
const fs = require('fs')
const Post = require('../models/Post')
const Account = require('../models/Account')

class AccountController {
    // GET '/login'
    renderLogin(req, res, next) {
        delete req.session.user_id;
        res.render("./login");
    }

    // GET '/login-google-failure'
    loginGoogleFailure(req, res, next) {
        res.redirect("./login");
    }

    //
    googleCallBack(req, res, next) {
        res.redirect("/check-login-google");
    }

    async loginGoogle(req, res, next) {
        let account = await Account.findOne({ email: req.user.emails[0].value });
        if (account) {
            req.session.user_id = account._id;
            res.redirect("/home");
        } else {
            next();
        }
    }

    async createAccountStudent(req, res, next) {
        let email = req.user.emails[0].value;
        let familyName = req.user.name.familyName;
        let firstName = req.user.name.givenName;
        let avatar = req.user.photos[0].value;
        const data = {
            email,
            username: firstName + familyName,
            avatar,
            role: "student",
        };
        const account = new Account(data);
        await account.save();
        req.session.user_id = account._id;
        res.redirect("/home");
    }

    async loginByAccount(req, res, next) {
        let password = req.body.password;
        let username = req.body.username;
        let account = await Account.findOne({ username });
        if (account) {
            if (bcrypt.compareSync(password, account.password)) {
                req.session.user_id = account._id;
                if (account.role === "admin") {
                    res.redirect("/admin/home");
                } else {
                    res.redirect("/department/home");
                }
            } else {
                res.redirect("/login");
            }
        } else {
            res.redirect("/login");
        }
    }

    // GET 'log-out'
    logOut(req, res, next) {
        delete req.session.user_id;
        res.redirect("/login");
    }

    async updateAccount(req, res, next) {
        let id = req.account._id;
        let account = await Account.findById(id);
        if (account) {
            let data = req.body;
            account.name = data.name;
            account.avatar = data.avatar;
            await account.save();
            res.redirect("/home");
        } else {
            next();
        }
    }

    async renderUserProfile(req, res, next) {
        const account = req.account;
        const user_id = req.params.id;
        const user = await Account.findOne({ _id: user_id }).lean();
        const first_10_post = await Post.find({ user_id: user_id })
            .sort({ created_at: -1 })
            .limit(10)
            .lean();
        res.render("./user/profile", { account, user, first_10_post });
    }

    async changePassword(req, res, next) {
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;
        if (newPassword !== confirmPassword) {
            res.send("Mật khẩu không khớp");
        } else {
            const hash = await bcrypt.hash(newPassword, 10);
            await Account.findOneAndUpdate(
                { _id: req.session.user_id },
                { password: hash }
            );
            res.redirect("/logout");
        }
    }
}

module.exports = new AccountController();
