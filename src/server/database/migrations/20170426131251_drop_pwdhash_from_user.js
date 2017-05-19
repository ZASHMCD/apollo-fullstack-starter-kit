exports.up = function(knex, Promise) {
    return knex.schema.table('user_detail', function(table) {
        table.dropColumn('pwdhash');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('user_detail', function(table) {
        table.string('pwdhash');
    })

};