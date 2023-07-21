const AppError = require('../../utils/AppError');

class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(id) {
    try {
      const dish = await this.dishRepository.findById(id);
      
      if(!dish) {
        throw new AppError('Registro não encontrado.');
      }
      
      const dishDeleted = await this.dishRepository.delete(id);

      return dishDeleted;
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

module.exports = DishDeleteService;