const { User } = require('../models/index');
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const midtransClient = require('midtrans-client');
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: "EmailIsRequired" }
            }
            if (!password) {
                throw { name: "PasswordIsRequired" }
            }
            const user = await User.findOne({
                where: { email: email }
            })
            if (!user) {
                throw { name: 'UserNotExist' }
            }
            const isPasswordValid = comparePassword(password, user.password)
            if (!isPasswordValid) {
                throw { name: 'PasswordInvalid' }
            }
            const access_token = signToken(user)
            res.status(200).json({ access_token, user })
        } catch (error) {
            next(error)
        }
    }

    static async addUser(req, res, next) {
        try {
            const {email, password } = req.body
            const user = await User.create({email, password})

            res.status(201).json({
                id: user.id,
                password: user.password,
            })
        } catch (error) {
            next(error)
        }
    }
   
    static async upgrade(req, res, next) {
        const { id, license } = req.user
        try {
            if(license === true) {
                throw { name : "AlreadyPremium" }
            }
            const { email } = req.body

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: "SB-Mid-server-7Hb2ZvQ0V5ngN6dFDhaEwcHT"
            })
            
            const order_id = new Date().getTime()
            let parameter = {
                "transaction_details": {
                    "order_id": "FACEMEALS-" + id + "-" + order_id,
                    "gross_amount": 10000
                },
                "item_details": [
                    {
                        "price": 10000,
                        "quantity": 1,
                        "name": "Premium Account"
                    }
                ],
                "customer_details": {
                    "email": email,
                }
            }

            snap.createTransaction(parameter)
                .then(async (transaction) => {
                    let transactionToken = transaction.token
                    res.status(200).json({token: transactionToken})
                })
        } catch (error) {
            next(error)
        }
    }

    static async midtrans(req, res, next) {
        try {
            const { order_id, transaction_status } = req.body
            if(transaction_status === "settlement") {
                const userId = order_id.split('-')[1]
                await User.update({
                    license: true
                }, {
                    where: {
                        id: Number(userId)
                    }
                })
            }
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }

    static async google(req, res, next) {
        try {
            const client = new OAuth2Client()
            const ticket = await client.verifyIdToken({
                idToken: req.body.credential,
                audience: process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            const userEmail = payload["email"]

            let user = await User.findOne({
                where: {
                    email: userEmail
                }
            })
            if(!user) {
                user = await User.create({
                    email: userEmail,
                    password: userEmail,
                    license: false
                }, {
                    hooks: false
                })
            }
            const access_token = signToken(user)
            res.status(200).json({ access_token, user })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController
