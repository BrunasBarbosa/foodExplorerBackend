const { Router } = require('express');

const DishesController = require('../controllers/DishesController');

const ensureAdminAuthenticated = require('../middlewares/EnsureAdminAuthenticated');

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.use(ensureAdminAuthenticated);
dishesRoutes.post('/', dishesController.create);

module.exports = dishesRoutes;