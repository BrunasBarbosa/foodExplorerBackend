const DiskStorage = require('../../providers/DiskStorage');
const AppError = require('../../utils/AppError');

class UploadImageService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(filename, id) {
    try {
      const diskStorage = new DiskStorage();
      const fileName = await diskStorage.saveFile(filename);

      const imageUpload = await this.dishRepository.imageUpload(fileName, id);

      return imageUpload;
    } catch (error) {
      throw new AppError('Não foi possível cadastrar a imagem.');
    }
  }
}

module.exports = UploadImageService;