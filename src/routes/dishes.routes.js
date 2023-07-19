const { Router } = require('express');

const uploadConfig = require('../configs/upload');
const multer = require('multer');

const DishesController = require('../controllers/DishesController');
const DishImageController = require('../controllers/DishImageController');

const ensureAdminAuthenticated = require('../middlewares/EnsureAdminAuthenticated');

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();
const dishImageController = new DishImageController();

dishesRoutes.use(ensureAdminAuthenticated);
dishesRoutes.post('/', dishesController.create);
dishesRoutes.put('/:id', dishesController.update);
dishesRoutes.patch('/image/:id', upload.single('image'), dishImageController.update);

module.exports = dishesRoutes;