exports.up = knex => knex.schema.createTable('orders', table => {
  table.increments('id');
  table.integer('user_id').references('id').inTable('users');
  table.decimal('total_amout');
  table.timestamp('created_at').default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('orders');
