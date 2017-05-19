exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('written_premium', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.uuid('userid').references('userid').inTable('user').notNullable();
            table.uuid('coverid').references('coverid').inTable('cover').notNullable();
            table.string('period').notNullable();
            table.primary(['userid', 'coverid', 'period']);
            table.index(['period', 'userid'], 'ix_written_premium_user_by_period', 'btree');
        }),
        knex.schema.createTable('premium_receivable', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.uuid('userid').references('userid').inTable('user').notNullable();
            table.float('amount').notNullable();
            table.float('customer_balance');
            table.float('account_balance');
            table.jsonb('info');
            table.index(['info'], 'ix_premium_receivable_info', 'gin');
            table.primary(['userid', 'created']);
        }),
        knex.schema.createTable('card_payment', function(table) {
            table.timestamp('created').defaultTo(knex.fn.now());
            table.uuid('userid').references('userid').inTable('user').notNullable();
            table.float('amount').notNullable();
            table.jsonb('info');
            table.index(['info'], 'ix_card_payment_info', 'gin');
            table.primary(['userid', 'created']);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('card_payment'),
        knex.schema.dropTable('premium_receivable'),
        knex.schema.dropTable('written_premium')
    ]);
};