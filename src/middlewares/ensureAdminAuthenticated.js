const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');
const { verify } = require('jsonwebtoken');

function ensureAdminAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token não informado.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_info } = verify(token, authConfig.jwt.secret);

    const [user_id, user_type] = user_info.split(',');

    request.user = {
      id: Number(user_id)
    };

    if (user_type != 'admin') {
      throw new AppError('Não autorizado.', 401);
    }

    return next();
  } catch {
    throw new AppError('Não autorizado.', 401);
  }
}

module.exports = ensureAdminAuthenticated;