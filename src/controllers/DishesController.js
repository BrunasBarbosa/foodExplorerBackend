const DishCreateService = require('../services/dishe/DishCreateService');
const DishUpdateService = require('../services/dishe/DishUpdateService');
const DishDeleteService = require('../services/dishe/DishDeleteService');
const DishShowService = require('../services/dishe/DishShowService');
const UploadImageService = require('../services/upload/UploadImageService');
const UpdateImageService = require('../services/upload/UpdateImageService');

const DishRepository = require('../repositories/DishRepository');

const MenuInsertService = require('../services/menu/MenuInsertService');
const MenuRepository = require('../repositories/MenuRepository');

const IngredientsInsertService = require('../services/ingredients/IngredientsInsertService');
const IngredientsRepository = require('../repositories/IngredientsRepository');

const ingredientsRepository = new IngredientsRepository();
const ingredientsInsertService = new IngredientsInsertService(ingredientsRepository);

const dishRepository = new DishRepository();

class DishesController {
  async create(request, response) {
    const dishCreateService = new DishCreateService(dishRepository);
    const uploadImageService = new UploadImageService(dishRepository);

    const menuRepository = new MenuRepository();
    const menuInsertService = new MenuInsertService(menuRepository);

    const { name, description, price, category, ingredients } = request.body;
    const userId = request.user.id;
    const fileName = request.file?.filename ?? null;

    const dishId = await dishCreateService.execute({ name, description, price, category, id: userId });

    await menuInsertService.execute({ dishId, name, description, price, category });

    if (fileName !== null) {
      await uploadImageService.execute(fileName, dishId);
    }

    if (ingredients.length !== 0) {
      await ingredientsInsertService.execute({ dishId, ingredients });
    }

    return response.json();
  }

  async update(request, response) {
    const dishUpdateService = new DishUpdateService(dishRepository);
    const updateImageService = new UpdateImageService(dishRepository);

    const userId = request.user.id;
    const { id } = request.params;

    const fileName = request.file?.filename ?? null;

    const { name, description, price, category, ingredients } = request.body;

    await dishUpdateService.execute({ dishId: id, name, description, price, category, userId });

    if (fileName !== null) {
      await updateImageService.execute(id, fileName, userId);
    }

    await ingredientsRepository.deleteIngredientsIds(id);

    if (ingredients.length !== 0) {
      await ingredientsInsertService.execute({ dishId: id, ingredients });
    }

    return response.json();
  }

  async show(request, response) {
    const dishShowService = new DishShowService(dishRepository);
    
    const { id } = request.params;
    
    const details = await dishShowService.execute(id);

    return response.json(details);
  }

  async delete(request, response) {
    const dishDeleteService = new DishDeleteService(dishRepository);

    const { id } = request.params;

    await dishDeleteService.execute(id);

    return response.json();
  }
}

module.exports = DishesController;