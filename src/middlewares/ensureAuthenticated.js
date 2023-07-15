const AppError = require('../utils/AppError');
const authConfig = require('../configs/auth');
const { verify } = require('jsonwebtoken');

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token não informado.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_info} = verify(token, authConfig.jwt.secret);

    const [user_id, ] = user_info.split(',')

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError('JWT Token inválido.', 401);
  }
}

module.exports = ensureAuthenticated;
