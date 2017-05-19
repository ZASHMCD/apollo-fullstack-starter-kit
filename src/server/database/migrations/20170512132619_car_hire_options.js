exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('car_hire_options', function(table) {
            table.string('name').primary().notNullable();
            table.string('description').notNullable();
            table.float('amount').notNullable();
        }),
    ]);

};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('car_hire_options'),
    ]);
};