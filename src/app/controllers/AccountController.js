const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const TOKEN_KEY = "password"
const multiparty = require('multiparty');
const fs = require('fs')
const Account = require('../models/Account')

class AccountController {

    // GET '/login'
    renderLogin(req, res, next) {
        delete req.session.user_id
        res.render('./login')
    }

    // GET '/login-google-failure'
    loginGoogleFailure(req, res, next) {
        res.redirect('./login')
    }

    //
    googleCallBack(req, res, next) {
        res.redirect('/check-login-google')
    }

    async loginGoogle(req, res, next) {
        let account = await Account.findOne({ email: req.user.emails[0].value })
        if (account) {
            req.session.user_id = account._id
            res.redirect('/home')
        } else {
            next()
        }
    }

    async createAccountStudent(req, res, next) {
        let email = req.user.emails[0].value;
        let familyName = req.user.name.familyName;
        let firstName = req.user.name.givenName;
        let avatar = req.user.photos[0].value;
        const data = { email, name: firstName + familyName, avatar, role: 'student' }
        const account = new Account(data)
        await account.save();

        res.redirect('/home')
    }

    async loginByAccount(req, res, next) {
        let password = req.body.password;
        let username = req.body.username;
        let account = await Account.findOne({ username });
        if (account) {
            if (bcrypt.compareSync(password, account.password)) {
                req.session.user_id = account._id
                if (account.role === 'admin') {
                    res.redirect('/admin/home')
                } else {
                    res.redirect("/department/home");
                }
            } else {
                res.redirect('/login')
            }
        } else {
            res.redirect('/login')
        }
    }

    // GET 'log-out'
    logOut(req, res, next) {
        delete req.session.user_id
        res.redirect('/login')
    }

    async updateAccount(req, res, next) {
        let id = req.account._id
        let account = await Account.findById(id)
        if (account) {
            let data = req.body
            account.name = data.name
            account.avatar = data.avatar
            await account.save()
            res.redirect('/home')
        } else {
            next()
        }
    }

}

module.exports = new AccountController();
