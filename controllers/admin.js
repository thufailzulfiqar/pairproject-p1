const {Category, Item, Profile, User, Transaction} = require('../models')
const {Op, where} = require('sequelize')
const bcrypt = require('bcryptjs')
const formatRP = require('../helpers/formatRP')

class Admin {
    static async showAllMenu(req, res) {
        try {
            let session = req.session
            let {search} = req.query
            let data = await Item.findAll({
                order: [
                    ["CategoryId", "ASC"]
                ],
                include: {
                    model: Category
                }
            }) 

            let dataCategory = await Category.findAll({
                order: [
                    ["id", "ASC"]
                ]
            })

            if (search) {
                data = await Item.findAll({
                    where: {
                        nameItem: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    include: {
                        model: Category,
                        
                    }
                }) 
            }
            res.render('allMenu', {data, dataCategory, session, formatRP, search})
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }

    static async showAddForm(req, res) {
        try {
            let session = req.session
            let {error} = req.query
            let data = await Category.findAll()
            res.render('addMenu', {data, error, session})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async postAddForm(req, res) {
        try {
            await Item.create(req.body)
            res.redirect('/allMenu')
            
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let msg = error.errors.map(el => el.message)
                res.redirect(`/allMenu/addItem?error=${msg}`)
            }
        }
    }

    static async editMenu(req, res) {
        try {
            let session = req.session
            let {error} = req.query
            let {id} = req.params
            let data = await Item.findOne({
                where: {id: `${id}`},
                include: {
                    model: Category,
                }
            })
            let dataCat = await Category.findAll({
                include: {
                    model: Item,
                }
            })
            
            res.render('editMenu', {data, dataCat, error, session})
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditMenu(req, res) {
        try {
            let {id} = req.params

            await Item.update(req.body, {
                where: {id}
            })
            // console.log(req.body)
            res.redirect('/allMenu')
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let msg = error.errors.map(el => el.message)
                res.redirect(`/menu/allMenu/${id}/edit?error=${msg}`)
            }
        }
    }

    static async deleteMenu(req, res) {
        try {
            let {id} = req.params
            await Item.destroy({where: {id}})
            res.redirect('/allMenu')
        } catch (error) {
            res.send(error)
        }
    }

}

module.exports = Admin