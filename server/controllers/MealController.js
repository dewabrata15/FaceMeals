const { Meals, User } = require('../models/index')
const { Op } = require("sequelize");
const cloudinary = require('cloudinary')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});

class MealsController {
    static async productList(req, res, next) {
        try {
            const { search } = req.query
            const data = await Meals.findAll({
                include: {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                order: [
                    ["id", "DESC"]
                ],
                where: {
                    strMeal: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            })
            res.status(200).json({ message: `Successfully get the data`, data })
        } catch (error) {
            next(error)
        }
    }

    static async createMeals(req, res, next) {
        try {
            const product = req.body
            product.authorId = req.user.id
            const data = await Meals.create(product)
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async getMealsById(req, res, next) {
        const { id } = req.params
        const { license } = req.user
        try {
            const data = await Meals.findAll({
                include: {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                where : {
                    id
                }
            })
            if (!data[0]) {
                throw { name: "ErrorNotFound" }
            }
            if(license === false && data[0].license === true) {
                throw { name: "ForbiddenAccess" }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async getMyMeals(req, res, next) {
        const { id, license } = req.user
        try {
            const { search } = req.query
            const data = await Meals.findAll({
                include: {
                    model: User,
                    attributes: {
                        exclude: ['password']
                    }
                },
                order: [
                    ["id", "DESC"]
                ],
                where: {
                    authorId: id,
                    strMeal: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            })
            res.status(200).json({ message: `Successfully get the data`, data, licenseUser: license })
        } catch (error) {
            next(error)
        }
    }
    static async updateMealsById(req, res, next) {
        const { id } = req.params
        try {
            const data = await Meals.findByPk(id)
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            await Meals.update(req.body, {
                where: {
                    id: id
                }
            })
            
            res.status(200).json({ message: `Successfully Update Meal with Id ${id}`, data })
        } catch (error) {
            next(error)
        }
    }
    static async deleteMealsById(req, res, next) {
        const { id } = req.params
        try {
            const data = await Meals.findByPk(id)
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            await Meals.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({ message: `Successfully Deleted Meal with Id ${id}` })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async uploadMealsImage(req, res, next) {
        try {
            const { id } = req.params
            const data = await Meals.findByPk(id)
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            const bufferStr = req.file.buffer.toString("base64");
            const uploadData = `data:${req.file.mimetype};base64,${bufferStr}`;

            const uploadToCloud = await cloudinary.uploader.upload(uploadData, {
                public_id: req.file.originalname,
                folder: `testing1`,
                resource_type: "auto"
            })
            await Meals.update({ strMealThumb: uploadToCloud.url }, {
                where: {
                    id: id
                }
            })
            res.status(200).json({ message: "Successfully Upload Image" })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = MealsController