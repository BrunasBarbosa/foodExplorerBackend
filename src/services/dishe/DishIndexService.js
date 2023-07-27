const AppError = require('../../utils/AppError');

class DishIndexService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(name) {
    try {
      const dishesIngredients = await this.dishRepository.findByIngredient(name);
      const dishesName = await this.dishRepository.findByName(name);

      const dishesWithIngredients = [...dishesIngredients, ...dishesName];

      return dishesWithIngredients;

    } catch (error) {
      throw new AppError('Nenhum registro localizado.');
    }
  }
}

module.exports = DishIndexService;