const DiskStorage = require('../../providers/DiskStorage');
const AppError = require('../../utils/AppError');

class DishImageService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(id, filename, userId) {
    const dish = await this.dishRepository.findById(id);

    const diskStorage = new DiskStorage();

    
    if (!dish) {
      throw new AppError('Registro não localizado.');
    }

    if (dish.image) {
      await diskStorage.deleteFile(dish.image);
    }

    const fileName = await diskStorage.saveFile(filename);

    dish.image = fileName;

    const dishImageUpdated = await this.dishRepository.imageUpdate({ dish, id: dish.id, userId });

    return dishImageUpdated;
  }
}

module.exports = DishImageService;