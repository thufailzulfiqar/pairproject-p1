const {Category, Item, Profile, User, Transaction} = require('../models')
const {Op, where} = require('sequelize')
const bcrypt = require('bcryptjs')
const formatRP = require('../helpers/formatRP')
const qr = require('qrcode')
const qrCode = require('../helpers/qrcode')
const qrPay = require('../helpers/qrcodepayment')

class Controller {
    static async loginPage(req, res) {
        try {
            let session = req.session
            let {error, msg} = req.query
            res.render('login', {error, session, msg})
        } catch (error) {
            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {
            let {email, password, role} = req.body
            let user = await User.findOne({where: {email}})
            if(user) {
                const validPassword = bcrypt.compareSync(password, user.dataValues.password)

                if(validPassword) {
                    req.session.email = user.email
                    req.session.userId = user.id
                    req.session.role = user.role
                    req.session.cart = []
                    const successLogin = "You have logged in successfully"
                    return res.redirect(`/?successLogin=${successLogin}`)
                } else {
                    const error = "invalid email/password"
                    res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = "invalid email/password"
                res.redirect(`/login?error=${error}`)
            }
            
        } catch(error) {
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            let message = "You already have an account with this email"
            let {username, phoneNumb, email, password, role} = req.body
            let data = await User.findOne({where: {email}})
            if(data) {
                res.redirect(`/login?msg=${message}`)
            }
            await User.create({
                email,
                password,
                role
            })

            await Profile.create({
                username,
                phoneNumb
            })
            message = "You have registered successfully, you can now login"
            res.redirect(`/login?msg=${message}`)
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async toLogout(req, res) {
        try {
            req.session.destroy()
            const successLogout = "You have loggged out successfully"
            res.redirect(`/?successLogout=${successLogout}`)
        } catch (error) {
            
        }
    }

    static async showHomepage(req, res) {
        try {
            let {error, successLogin, successLogout} = req.query
            let session = req.session
            res.render('homepage', {session, error, successLogin, successLogout})
        } catch (error) {
            res.send(error)
        }
    }

    static async showContact(req, res) {
        try {
            let session = req.session
            const qrcode = await qrCode()
            res.render('contactpage', {session, qr: qrcode})
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }

    static async showCategories(req, res) {
        try {
            let session = req.session
            let data = await Category.findAll()
            res.render('categories', {data, session})
        } catch (error) {
            res.send(error)
        }
    }

    static async showMenuByCat(req, res) {
        try {
            let session = req.session
            let {id} = req.params
            let {search} = req.query
            let data = await Item.findAll({
                where: {CategoryId: id},
                include: {
                    model: Category,
                    where: {id}
                }
            }) 
            if (search) {
                data = await Item.findAll({
                    where: {
                        CategoryId: id,
                        nameItem: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    include: {
                        model: Category
                        
                    }
                }) 
            }
            res.render('menu', {data, session, formatRP, search})
            } catch (error) {
                console.log(error);
                
            res.send(error)
        }
    }

    static async buyItem(req, res) {
        try {
            let {id, menuId} = req.params

            let data = await Item.findOne({
                where: {
                    "CategoryId": id,
                    "id": menuId
                }
            })
            req.session.cart.push(data.dataValues)
            console.log(req.session.cart)
            res.redirect(`/menu/${id}`)
        } catch (error) {
            res.send(error)
        }
    }

    static async showCart(req, res) {
        try {
            let session = req.session
            let cartItems = req.session.cart || []
            cartItems = cartItems.map(item => Item.build(item))
            let cartIds = cartItems.map(item => item.id)
            let totalPrice = await Item.getTotal(cartIds)
            totalPrice = +totalPrice
            
            
            res.render('cart', {cartItems, totalPrice, session, formatRP})
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }
    static async removeItemFromCart(req, res) {
        try {
            let {id} = req.params
            req.session.cart = req.session.cart.filter(el => {
                return el.id !== +id
            })
            res.redirect('/cart')
        } catch (error) {
            res.send(error)
        }
    }

    static async paymentCart(req, res) {
        try {
            let session = req.session
            const qrcode = await qrPay()
            res.render('payment', {session, qr: qrcode})
        } catch (error) {
            res.send(error)
        }
    }

    static async donePayment(req, res) {
        try {
            let session = req.session
            res.render('finishPayment', {session})
        } catch (error) {
            res.send(error)
        }
    }
}


module.exports = Controller