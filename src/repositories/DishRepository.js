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

  async imageUpdate({ dish, id, userId }) {
    await knex('dishes').update({...dish, updated_by: knex.raw('?', [userId]), updated_at: knex.fn.now()}).where({ id });
  }

  async update({ dishId, name, description, price, category, userId }) {
    return await knex('dishes')
      .where({ id: dishId })
      .update({ name, description, price, category, updated_by: userId, updated_at: knex.fn.now() });
  }

  async findById(id) {
    const dish = await knex('dishes').where({ id }).first();

    return dish;
  }
}

module.exports = DishRepository;