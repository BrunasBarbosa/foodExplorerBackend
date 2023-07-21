const DiskStorage = require('../../providers/DiskStorage');
const AppError = require('../../utils/AppError');

class UpdateImageService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(id, filename, userId) {
    try {
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

      const dishImageUpdated = await this.dishRepository.imageUpdate({ dish, userId });

      return dishImageUpdated;

    } catch (error) {
      throw new AppError('Não foi possível atualizar a imagem.');
    }
  }
}

module.exports = UpdateImageService;