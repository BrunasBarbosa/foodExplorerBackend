const UserCreateService = require('../services/user/UserCreateService');
const UserRepository = require('../repositories/UserRepository');

const userRepository = new UserRepository();

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({ name, email, password });

    return response.status(201).json();
  }
}

module.exports = UsersController;