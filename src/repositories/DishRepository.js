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
}

module.exports = DishRepository;