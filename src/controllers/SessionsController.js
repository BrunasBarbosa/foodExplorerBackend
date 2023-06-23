
const SessionsCreateService = require('../services/session/SessionsCreateService');
const UserRepository = require('../repositories/UserRepository');

class SessionsController {
  async create(request, respose) {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const sessionCreateService = new SessionsCreateService(userRepository);

    const { user, token } = await sessionCreateService.execute({ email, password });

    return respose.json({ user, token });
  }
}

module.exports = SessionsController;