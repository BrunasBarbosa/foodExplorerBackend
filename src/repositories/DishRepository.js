const knex = require('../database/knex');

class DishRepository {
  async create({ name, description, price, category, id }) {
    const [dish] = await knex('dishes').insert({
      name,
      description,
      price,
      category,
      created_by: id
    }).returning('id');

    return dish.id;
  }

  async imageUpload(image, dishId) {
    return await knex.transaction(async trx => {
      await knex('dishes').transacting(trx).update({ image }).where({ id: dishId });
      await knex('menu').transacting(trx).update({ dish_image: image }).where({ dish_id: dishId });
    });
  }

  async imageUpdate({ dish, userId }) {
    return await knex.transaction(async trx => {
      await knex('dishes').transacting(trx).update({ ...dish, updated_by: userId, updated_at: knex.fn.now() }).where({ id: dish.id });
      await knex('menu').transacting(trx).update({ dish_image: dish.image }).where({ dish_id: dish.id });
    });
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