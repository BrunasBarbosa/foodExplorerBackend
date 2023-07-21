const AppError = require('../../utils/AppError');
const IngredientsRepository = require('../../repositories/IngredientsRepository');

class DishShowService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(id) {
    try {
      const ingredientsRepository = new IngredientsRepository();

      const dish = await this.dishRepository.findById(id);

      if (!dish) {
        throw new AppError('Registro não localizado.');
      }
      const ingredients = await ingredientsRepository.fetchIngredientsByDishId(id);

      return {
        ...dish,
        ingredients
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

module.exports = DishShowService;