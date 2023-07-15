class IngredientsInsertService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository;
  }

  async execute({ dishId, ingredients }) {
    const IngredientIds = await Promise.all(ingredients.map(name => {
      return this.ingredientsRepository.insertIngredients(name);
    }));

    return await this.ingredientsRepository.insertIngredientsDishIds({ dishId, IngredientsIds: IngredientIds });
  }
}

module.exports = IngredientsInsertService;