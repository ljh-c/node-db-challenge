
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl.string('name')
        .unique()
        .notNullable();
      tbl.text('description');
      tbl.boolean('completed').defaultTo(false);
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl.string('description')
        .unique()
        .notNullable();
      tbl.text('notes');
      tbl.boolean('completed').defaultTo(false);
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('resources', tbl => {
      tbl.increments();
      tbl.string('name')
        .unique()
        .notNullable();
      tbl.text('description');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects');
};
