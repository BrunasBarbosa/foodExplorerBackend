const DishImageService = require('../services/dishe/DishImageService');
const DishRepository = require('../repositories/DishRepository');

class DishImageController {
  async update(request, response) {
    const userId = request.user.id;
    const { id } = request.params;
    const imageFileName = request.file.filename;

    const dishRepository = new DishRepository();
    const dishImageService = new DishImageService(dishRepository);

    const dish = await dishImageService.execute(id, imageFileName, userId);
    
    return response.json(dish);
  }
}

module.exports = DishImageController;