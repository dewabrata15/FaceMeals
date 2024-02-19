const express = require('express');
const router = express.Router();
const MealsRouter = require('./MealsRouter')
const UserController = require('../controllers/UserController');
const errorHandler = require('../middlewares/errorHandler');
const MealsController = require('../controllers/MealController');
const authentication = require('../middlewares/authentication')


router.get('/', (req, res) => {
    res.send('HOME')
})

router.post('/register', UserController.addUser)
router.post('/login', UserController.login)
router.post('/login/google', UserController.google)
router.post('/midtrans', UserController.midtrans)

router.get('/profiles', authentication, MealsController.getMyMeals)
router.post('/profiles/upgrade', authentication, UserController.upgrade)
router.use('/meals', MealsRouter)

router.use(errorHandler)

module.exports = router