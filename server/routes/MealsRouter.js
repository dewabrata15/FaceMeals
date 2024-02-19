const express = require('express');
const MealsController = require('../controllers/MealController');
const router = express.Router();
const authentication = require('../middlewares/authentication')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/', MealsController.productList)
router.use(authentication)
router.get('/:id', MealsController.getMealsById)
router.post('/', MealsController.createMeals)
router.put('/:id', MealsController.updateMealsById)
router.delete('/:id', MealsController.deleteMealsById)
router.patch('/:id', upload.single('imgUrl'), MealsController.uploadMealsImage)



module.exports = router


