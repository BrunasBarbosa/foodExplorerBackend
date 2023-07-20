const UpdateImageService = require('../services/upload/UpdateImageService');
const DishRepository = require('../repositories/DishRepository');

const dishRepository = new DishRepository();
const updateImageService = new UpdateImageService(dishRepository);
class DishImageController {
  async update(request, response) {
    const userId = request.user.id;
    const { id } = request.params;
    const imageFileName = request.file.filename;

    const dishUpdated = await updateImageService.execute(id, imageFileName, userId);

    return response.json(dishUpdated);
  }
}

module.exports = DishImageController;