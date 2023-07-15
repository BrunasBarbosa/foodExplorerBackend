const AppError = require('../../utils/AppError');

class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute({ name, description, price, category, id }) {
    try {
      const dish = await this.dishRepository.create({ name, description, price, category, id });
      return dish;
    } catch (error) {
      throw new AppError('Não foi possível cadastrar o prato.');
    }
  }
}

module.exports = DishCreateService;