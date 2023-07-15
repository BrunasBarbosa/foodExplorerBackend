const knex = require('../database/knex');

class MenuRepository {
  async create({ dishId, name, description, price, category }) {
    return await knex('menu').insert({
      dish_id: dishId,
      name,
      description,
      price,
      category
    });
  }
}

module.exports = MenuRepository;