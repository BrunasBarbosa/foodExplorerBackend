const DishCreateService = require('../services/dishe/DishCreateService');
const DishRepository = require('../repositories/DishRepository');

const IngredientsInsertService = require('../services/ingredients/IngredientsInsertService');
const IngredientsRepository = require('../repositories/IngredientsRepository');

const ingredientsRepository = new IngredientsRepository();
const ingredientsInsertService = new IngredientsInsertService(ingredientsRepository);

const dishRepository = new DishRepository();

class DishesController {
  async create(request, response) {
    const { name, description, price, category, ingredients } = request.body;
    const userId = request.user.id;

    const dishCreateService = new DishCreateService(dishRepository);

    const dishId = await dishCreateService.execute({ name, description, price, category, id: userId });

    if (ingredients.length !== 0) {
      await ingredientsInsertService.execute({ dishId, ingredients });
    }

    return response.json();
  }
}

module.exports = DishesController;