const AppError = require('../../utils/AppError');

class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ id, type }) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const userUpdated = await this.userRepository.update({ id, type });

    return userUpdated;
  }
}

module.exports = UserUpdateService;