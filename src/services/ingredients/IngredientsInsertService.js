const AppError = require('../../utils/AppError');

class IngredientsInsertService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async execute({ dishId, ingredients }) {
    try {
      const IngredientIds = await Promise.all(ingredients.map(name => {
        return this.ingredientsRepository.insertIngredients(name);
      }));

      return await this.ingredientsRepository.insertIngredientsDishIds({ dishId, IngredientsIds: IngredientIds });

    } catch (error) {
      throw new AppError('Não foi possível cadastrar o prato.');
    }
  }
}

module.exports = IngredientsInsertService;