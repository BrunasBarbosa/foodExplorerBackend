const AppError = require('../../utils/AppError');

class IngredientsIndexService {
  constructor(ingredientesRepository) {
    this.ingredientesRepository = ingredientesRepository;
  }

  async execute(dishId) {
    try {
      const ingredients = await this.tagsRepository.fetchIngredientsByDishId(dishId);

      return ingredients;
    } catch (error) {
      throw new AppError('Nenhum registro encontrado.');
    }
  }
}

module.exports = IngredientsIndexService;