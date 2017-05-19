exports.up = function(knex, Promise) {
    return knex.raw('ALTER TABLE user_detail ADD COLUMN sechash CHARACTER(64)')
};

exports.down = function(knex, Promise) {
    return knex.raw('ALTER TABLE user_detail DROP COLUMN sechash');
};