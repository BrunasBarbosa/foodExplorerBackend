const { Router } = require('express');

const uploadConfig = require('../configs/upload');
const multer = require('multer');

const DishesController = require('../controllers/DishesController');

const ensureAdminAuthenticated = require('../middlewares/EnsureAdminAuthenticated');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();

// dishesRoutes.use(ensureAdminAuthenticated);
dishesRoutes.post('/', ensureAdminAuthenticated, upload.single('image'), dishesController.create);
dishesRoutes.put('/:id', ensureAdminAuthenticated, upload.single('image'), dishesController.update);
dishesRoutes.delete('/:id', ensureAdminAuthenticated, dishesController.delete);
dishesRoutes.get('/:id', ensureAuthenticated, dishesController.show)

module.exports = dishesRoutes;