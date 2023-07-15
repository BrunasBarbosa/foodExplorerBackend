const knex = require('../database/knex');

class DishRepository {
  async create({ name, description, price, category, id }) {
    const [dishId] = await knex('dishes').insert({
      name,
      description,
      price,
      category,
      created_by: id
    }).returning('id');

    return dishId.id;
  }

  async update({ dishId, name, description, price, category, userId }) {
    return await knex('dishes')
      .where({ id: dishId })
      .update({ name, description, price, category, updated_by: userId, updated_at: knex.fn.now() });
  }
}

module.exports = DishRepository;