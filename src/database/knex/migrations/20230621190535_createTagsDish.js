exports.up = knex => knex.schema.createTable('tags_dish', table => {
  table.integer('dish_id').references('id').inTable('dishes');
  table.integer('tag_id').references('id').inTable('tagss');
});

exports.down = knex => knex.schema.dropTable('tags_dish');