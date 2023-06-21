exports.up = knex => knex.schema.createTable('tags', table => {
  table.increments('id');
  table.text('name');
});

exports.down = knex => knex.schema.dropTable('tags');