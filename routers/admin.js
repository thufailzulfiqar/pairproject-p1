const admin = require('express').Router()
const Controller = require('../controllers/controller')
const Admin = require('../controllers/admin')
//buat semua access admin

let checkRole = function access(req, res, next) {
    if(!req.session.userId) {
        const error = "Please login first!"
        res.redirect(`/login?error=${error}`)
    } else if(req.session.userId && req.session.role !== "admin") {
        const error = "You don't have access to the page"
        res.redirect(`/?error=${error}`)
    } else {
        next()
    }
}

admin.get('/', checkRole, Admin.showAllMenu)
admin.get('/addItem', Admin.showAddForm)
admin.post('/addItem', Admin.postAddForm)
admin.get('/:id/edit', Admin.editMenu)
admin.post('/:id/edit', Admin.postEditMenu)
admin.get('/:id/delete', Admin.deleteMenu)

module.exports = admin