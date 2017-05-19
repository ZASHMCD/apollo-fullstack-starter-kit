exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('prospect', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.jsonb('interaction').notNullable();
            table.jsonb('quote').notNullable();
            table.uuid('prospectid').notNullable().primary().defaultTo(knex.raw('uuid_generate_v1mc()'));
            table.string('checkoutid');
            table.string('registrationid');
            table.boolean('converted').notNullable().defaultTo(false);
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('prospect'),
    ]);

};