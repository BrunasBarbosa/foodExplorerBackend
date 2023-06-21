const knex = require('../database/knex');

class UserRepository {
  async findByEmail(email) {
    const user = await knex('users').where({ email }).first();

    return user;
  }

  async findById(id) {
    const user = await knex('users').where({ id }).first();

    return user;
  }

  async create({ name, email, password }) {
    const userId = await knex('users').insert({
      name,
      email,
      password
    });

    return { id: userId };
  }

  async update({ id, type }) {
    const userUpdated = await knex('users').where({ id }).update({ type });

    return userUpdated;
  }
}

module.exports = UserRepository;