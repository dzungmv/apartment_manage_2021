const Account = require('./account')
const User = require('./user')
const Admin = require('./admin')
const Department = require('./department')

function route(app) {
    app.use('/department', Department)
    app.use('/admin', Admin)
    app.use('/', User)
    app.use('/', Account)
}
module.exports = route;