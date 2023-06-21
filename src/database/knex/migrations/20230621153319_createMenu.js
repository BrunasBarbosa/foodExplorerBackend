exports.up = knex => knex.schema.createTable('menu', table => {
  table.integer('dish_id').references('id').inTable('dishes');
  table.text('name');
  table.text('description');
  table.text('dish_image').references('image').inTable('dishes');
  table.decimal('dish_price', 8, 2).references('price').inTable('dishes');
  table.text('categoy_dish').references('category').inTable('dishes');
});

exports.down = knex => knex.schema.dropTable('menu');
