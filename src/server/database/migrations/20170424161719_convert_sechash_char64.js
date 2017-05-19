exports.up = function(knex, Promise) {
    return Promise.all([
        knex.raw('ALTER TABLE customer_detail ALTER COLUMN sechash SET DATA TYPE CHARACTER(64)'),
        knex.raw('ALTER TABLE item_detail ALTER COLUMN sechash SET DATA TYPE CHARACTER(64)'),
        knex.raw('ALTER TABLE cover_detail ALTER COLUMN sechash SET DATA TYPE CHARACTER(64)'),
        knex.raw('ALTER TABLE cause_detail ALTER COLUMN sechash SET DATA TYPE CHARACTER(64)'),
        knex.raw('ALTER TABLE driver_detail ALTER COLUMN sechash SET DATA TYPE CHARACTER(64)')


    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.raw('ALTER TABLE customer_detail ALTER COLUMN sechash SET DATA TYPE VARCHAR(255)'),
        knex.raw('ALTER TABLE item_detail ALTER COLUMN sechash SET DATA TYPE VARCHAR(255)'),
        knex.raw('ALTER TABLE cover_detail ALTER COLUMN sechash SET DATA TYPE VARCHAR(255)'),
        knex.raw('ALTER TABLE cause_detail ALTER COLUMN sechash SET DATA TYPE VARCHAR(255)'),
        knex.raw('ALTER TABLE driver_detail ALTER COLUMN sechash SET DATA TYPE VARCHAR(255)')
    ])
};