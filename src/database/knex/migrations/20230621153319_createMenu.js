exports.up = knex => knex.schema.createTable('users', table => {
  table.integer('dish_id').references('id').inTable('dishes');
  table.text('name');
  table.text('description');
  table.text('dish_image').references('image').inTable('dishes');
  table.decimal('dish_price', 8, 2).references('price').inTable('dishes');
  table.text('categoy_dish').references('category').inTable('dishes');

  table.timestamp('created_at').default(knex.fn.now());
  table.timestamp('updated_at').default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('users');
