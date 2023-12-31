const knex = require('../database/knex');

class IngredientsRepository {
  async fetchIngredients(name) {
    const ingredient = await knex('ingredients').select('id').where('name', name).first();

    if (ingredient) {
      return ingredient.id;
    }

    return null;
  }

  async fetchIngredientsByDishId(dishId) {
    const dishIngredients = await knex('dishes')
      .select('ingredients.name')
      .join('ingredients_dish', 'dishes.id', 'ingredients_dish.dish_id')
      .join('ingredients', 'ingredients_dish.ingredients_id', 'ingredients.id')
      .where('dishes.id', dishId);

    return dishIngredients;
  }

  async insertIngredients(name) {
    const registeredIngredient = await this.fetchIngredients(name);

    if (registeredIngredient === null) {
      const [ingredientId] = await knex('ingredients').insert({ name }).returning('id');

      return ingredientId.id;
    }

    return registeredIngredient;
  }

  async insertIngredientsDishIds({ dishId, IngredientsIds }) {
    const data = IngredientsIds.map((ingredientId) => {
      return {
        dish_id: dishId,
        ingredients_id: ingredientId
      };
    });

    return await knex('ingredients_dish').insert(data);
  }

  async deleteIngredientsIds(dishId) {
    return await knex('ingredients_dish').where({ dish_id: dishId }).delete();
  }
}

module.exports = IngredientsRepository;