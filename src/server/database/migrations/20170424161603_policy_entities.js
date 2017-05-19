exports.up = function(knex, Promise) {
    return Promise.all([
        knex.raw('CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public'),
        knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public'),


        knex.schema.createTable('user', function(table) {
            table.uuid('userid').notNullable().unique().primary().defaultTo(knex.raw('uuid_generate_v1mc()'));
            table.timestamp('created').defaultTo(knex.fn.now());
        }),

        knex.schema.createTable('user_session', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.uuid('userid').references('userid').inTable('user');
            table.jsonb('detail').notNullable();
            table.primary(['userid', 'created']);
            table.index(['detail'], 'ix_user_session_detail', 'gin');
        }),

        knex.schema.createTable('user_detail', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.string('username').notNullable().unique();
            table.string('firstname').notNullable();
            table.string('lastname').notNullable();
            table.string('pwdhash').notNullable();
            table.string('publickey');
            table.jsonb('transaction_detail').notNullable();
            table.jsonb('detail').notNullable();
            table.uuid('userid').notNullable().references('userid').inTable('user');
            table.primary(['userid', 'created']);
            table.index(['transaction_detail'], 'ix_user_transaction_detail', 'gin');
            table.index(['detail'], 'ix_user_detail', 'gin');
        }),

        knex.schema.createTable('customer_detail', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.jsonb('detail').notNullable();
            table.jsonb('transaction_detail').notNullable();
            table.uuid('userid').notNullable().references('userid').inTable('user');
            table.string('sechash').notNullable();
            table.primary(['userid', 'created']);
            table.index(['transaction_detail'], 'ix_customer_transaction_detail', 'gin');
            table.index(['detail'], 'ix_customer_detail', 'gin')
        }),

        knex.schema.createTable('item', function(table) {
            table.uuid('itemid').notNullable().unique().primary().defaultTo(knex.raw('uuid_generate_v1mc()'));
            table.timestamp('created').defaultTo(knex.fn.now());
        }),

        knex.schema.createTable('item_detail', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.string('item_type').notNullable();
            table.jsonb('detail').notNullable();
            table.jsonb('transaction_detail').notNullable();
            table.uuid('userid').notNullable().references('userid').inTable('user');
            table.uuid('itemid').notNullable().references('itemid').inTable('item');
            table.string('sechash').notNullable();
            table.primary(['itemid', 'created']);
            table.index(['transaction_detail'], 'ix_item_transaction_detail', 'gin');
            table.index(['detail'], 'ix_item_detail', 'gin')
        }),

        knex.schema.createTable('cover', function(table) {
            table.uuid('coverid').notNullable().unique().primary().defaultTo(knex.raw('uuid_generate_v1mc()'));
            table.timestamp('created').defaultTo(knex.fn.now());
        }),

        knex.schema.createTable('cover_detail', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.string('cover_type').notNullable();
            table.jsonb('detail').notNullable();
            table.jsonb('transaction_detail').notNullable();
            table.uuid('itemid').notNullable().references('itemid').inTable('item');
            table.uuid('coverid').notNullable().references('coverid').inTable('cover');
            table.string('sechash').notNullable();
            table.primary(['coverid', 'created']);
            table.index(['transaction_detail'], 'ix_cover_transaction_detail', 'gin');
            table.index(['detail'], 'ix_cover_detail', 'gin')
        }),

        knex.schema.createTable('driver_detail', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.jsonb('detail').notNullable();
            table.jsonb('transaction_detail').notNullable();
            table.uuid('itemid').notNullable().references('itemid').inTable('item');
            table.uuid('userid').notNullable().references('userid').inTable('user');
            table.string('sechash').notNullable();
            table.primary(['userid', 'created']);
            table.index(['transaction_detail'], 'ix_driver_transaction_detail', 'gin');
            table.index(['detail'], 'ix_driver_detail', 'gin')
        }),

        knex.schema.createTable('cause', function(table) {
            table.uuid('causeid').notNullable().unique().primary().defaultTo(knex.raw('uuid_generate_v1mc()'));
            table.timestamp('created').defaultTo(knex.fn.now());
        }),

        knex.schema.createTable('cause_detail', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.jsonb('detail').notNullable();
            table.jsonb('transaction_detail').notNullable();
            table.uuid('causeid').notNullable().references('causeid').inTable('cause');
            table.string('sechash').notNullable();
            table.primary(['causeid', 'created']);
            table.index(['transaction_detail'], 'ix_cause_transaction_detail', 'gin');
            table.index(['detail'], 'ix_cause_detail', 'gin')
        }),

        knex.schema.createTable('customer_payment_info', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.jsonb('detail').notNullable();
            table.jsonb('transaction_detail').notNullable();
            table.uuid('userid').notNullable().references('userid').inTable('user');
            table.string('sechash').notNullable();
            table.primary(['userid', 'created']);
            table.index(['transaction_detail'], 'ix_payment_transaction_detail', 'gin');
            table.index(['detail'], 'ix_payment_detail', 'gin')
        }),

        knex.schema.createTable('preinspection', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.jsonb('detail').notNullable();
            table.jsonb('transaction_detail').notNullable();
            table.uuid('itemid').notNullable().references('itemid').inTable('item');
            table.string('sechash').notNullable();
            table.primary(['itemid', 'created']);
            table.index(['transaction_detail'], 'ix_preinspection_transaction_detail', 'gin');
            table.index(['detail'], 'ix_preinspection_detail', 'gin')
        }),


    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('preinspection'),
        knex.schema.dropTable('customer_payment_info'),
        knex.schema.dropTable('cause_detail'),
        knex.schema.dropTable('driver_detail'),
        knex.schema.dropTable('cover_detail'),
        knex.schema.dropTable('item_detail'),
        knex.schema.dropTable('customer_detail'),
        knex.schema.dropTable('user_detail'),
        knex.schema.dropTable('user_session'),
        knex.schema.dropTable('cause'),
        knex.schema.dropTable('cover'),
        knex.schema.dropTable('item'),
        knex.schema.dropTable('user')

    ]);
};