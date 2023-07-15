const AppError = require('../../utils/AppError');

class DishUpdateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute({ dishId, name, description, price, category, userId }) {
    try {
      const dishUpdated = await this.dishRepository.update({ dishId, name, description, price, category, userId });

      return dishUpdated;
    } catch (error) {
      throw new AppError('Não foi possível atualizar o prato.');
    }
  }
}

module.exports = DishUpdateService;