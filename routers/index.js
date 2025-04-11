const router = require('express').Router()
const Controller = require('../controllers/controller')


router.get('/', Controller.showHomepage)

router.get('/login', Controller.loginPage)
router.post('/login', Controller.postLogin)

let loggedIn = function login(req, res, next) {
    if(!req.session.userId) {
        const error = "Please login first!"
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
}

router.use('/allMenu', require('./admin'))
router.get('/menu', Controller.showCategories)
router.get('/contact', Controller.showContact)
router.get('/logout', Controller.toLogout)
router.get('/cart/payment', Controller.paymentCart)
router.get('/cart/payment/finish', Controller.donePayment)
router.get('/menu/:id', Controller.showMenuByCat)
router.get('/menu/:id/buy/:menuId', loggedIn, Controller.buyItem)
router.get('/cart', loggedIn, Controller.showCart)
router.get('/cart/:id/removeItem', Controller.removeItemFromCart)
router.post('/register', Controller.postRegister)
// router.post('/categories/:id/addItem')
// router.get('/register', Controller.toRegister)


module.exports = router