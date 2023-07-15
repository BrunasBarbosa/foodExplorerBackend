const DishCreateService = require('../services/dishe/DishCreateService');
const DishRepository = require('../repositories/DishRepository');

const MenuInsertService = require('../services/menu/MenuInsertService');
const MenuRepository = require('../repositories/MenuRepository');

const IngredientsInsertService = require('../services/ingredients/IngredientsInsertService');
const IngredientsRepository = require('../repositories/IngredientsRepository');

const ingredientsRepository = new IngredientsRepository();
const ingredientsInsertService = new IngredientsInsertService(ingredientsRepository);

const dishRepository = new DishRepository();

class DishesController {
  async create(request, response) {
    const menuRepository = new MenuRepository();
    const menuInsertService = new MenuInsertService(menuRepository);

    const { name, description, price, category, ingredients } = request.body;
    const userId = request.user.id;

    const dishCreateService = new DishCreateService(dishRepository);

    const dishId = await dishCreateService.execute({ name, description, price, category, id: userId });

    const insertDishMenu = await menuInsertService.execute({ dishId, name, description, price, category });

    if (ingredients.length !== 0) {
      await ingredientsInsertService.execute({ dishId, ingredients });
    }

    return response.json();
  }
}

module.exports = DishesController;