const AppError = require('../../utils/AppError');
const authConfig = require('../../configs/auth');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcryptjs');

class SessionsCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail e/ou senha incorreto(a).', 401);
    }

    const passwordMateched = await compare(password, user.password);

    if (!passwordMateched) {
      throw new AppError('E-mail e/ou senha incorreto(a).', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });

    return ({ user, token });
  }
}

module.exports = SessionsCreateService;