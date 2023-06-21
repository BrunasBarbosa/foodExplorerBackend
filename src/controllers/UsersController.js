const UserCreateService = require('../services/user/UserCreateService');
const UserUpdateService = require('../services/user/UserUpdateService');
const UserRepository = require('../repositories/UserRepository');

const userRepository = new UserRepository();

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }

  async update(request, response) {
    const { id, type } = request.body;

    const userUpdateServices = new UserUpdateService(userRepository);

    await userUpdateServices.execute({ id, type });

    return response.json();
  }
}

module.exports = UsersController;