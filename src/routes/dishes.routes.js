const { Router } = require('express');

const uploadConfig = require('../configs/upload');
const multer = require('multer');

const DishesController = require('../controllers/DishesController');

const ensureAdminAuthenticated = require('../middlewares/EnsureAdminAuthenticated');

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();

dishesRoutes.use(ensureAdminAuthenticated);
dishesRoutes.post('/', upload.single('image'), dishesController.create);
dishesRoutes.put('/:id', upload.single('image'), dishesController.update);
dishesRoutes.delete('/:id', dishesController.delete);

module.exports = dishesRoutes;