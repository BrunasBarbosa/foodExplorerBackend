const { Router } = require('express');

const sessionsRouter = require('./sessions.routes');
const usersRouter = require('./users.routes');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

module.exports = routes;