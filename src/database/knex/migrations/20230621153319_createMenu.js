exports.up = knex => knex.schema.createTable('menu', table => {
  table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE');
  table.text('name');
  table.text('description');
  table.text('dish_image').references('image').inTable('dishes');
  table.decimal('dish_price', 8, 2);
  table.text('categoy_dish');
});

exports.down = knex => knex.schema.dropTable('menu');
