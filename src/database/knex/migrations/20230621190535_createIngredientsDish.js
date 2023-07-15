exports.up = knex => knex.schema.createTable('ingredients_dish', table => {
  table.integer('dish_id').references('id').inTable('dishes');
  table.integer('ingredients_id').references('id').inTable('ingredients');
});

exports.down = knex => knex.schema.dropTable('ingredients_dish');