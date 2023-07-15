const { Router } = require('express');

const DishesController = require('../controllers/DishesController');

const ensureAdminAuthenticated = require('../middlewares/EnsureAdminAuthenticated');

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.use(ensureAdminAuthenticated);
dishesRoutes.post('/', dishesController.create);
dishesRoutes.put('/:id', dishesController.update);

module.exports = dishesRoutes;