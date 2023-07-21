const DiskStorage = require('../../providers/DiskStorage');
const AppError = require('../../utils/AppError');

class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(id) {
    try {
      const dish = await this.dishRepository.findById(id);
      const diskStorage = new DiskStorage();

      if (!dish) {
        throw new AppError('Registro não encontrado.');
      }

      if (dish.image) {
        await diskStorage.deleteFile(dish.image);
      }

      const dishDeleted = await this.dishRepository.delete(id);

      return dishDeleted;
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

module.exports = DishDeleteService;