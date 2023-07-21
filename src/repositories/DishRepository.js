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

  async findByIngredient(ingredient) {
    const dishes = await knex('dishes')
      .select('dishes.name')
      .join('ingredientes_dish', 'dishes.id', 'ingredientes_dish.dish_id')
      .join('ingredients', 'ingredients_dish.ingredients_id', 'ingredients.id')
      .whereLike('ingredients.name', `%${ingredient}%`)
      .orderBy('dishes.name');

    return dishes;
  }

  async findByName(name) {
    const dishes = await knex('dishes')
      .whereLike('name', `%${name}%`)
      .orderBy('name');
    return dishes;
  }

  async delete(id) {
    return await knex.transaction(async trx => {
      await knex('dishes').transacting(trx).where({ id }).delete();
      await knex('menu').transacting(trx).where({ dish_id: id }).delete();
      await knex('ingredients_dish').transacting(trx).where({ dish_id: id }).delete();
    });
  }
}

module.exports = DishRepository;