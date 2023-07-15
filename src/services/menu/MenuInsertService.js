const AppError = require('../../utils/AppError');

class MenuInsertService {
  constructor(menuRepository) {
    this.menuRepository = menuRepository;
  }

  async execute({ dishId, name, description, price, category }) {
    try {
      const dish = await this.menuRepository.create({ dishId, name, description, price, category });

      return dish;
    } catch (error) {
      throw new AppError('Não foi possível cadastrar o prato.');
    }
  }
}

module.exports = MenuInsertService;