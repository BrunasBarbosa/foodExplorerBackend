exports.up = knex => knex.schema.createTable('menu', table => {
  table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE');
  table.text('name');
  table.text('description');
  table.text('dish_image');
  table.decimal('price', 8, 2);
  table.text('category');
});

exports.down = knex => knex.schema.dropTable('menu');
