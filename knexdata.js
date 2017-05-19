require('dotenv').config({ silent: true });

module.exports = {

    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: __dirname + '/src/server/database/migrations'
        },
        seeds: {
            directory: __dirname + '/src/server/database/seeds'
        }
    },

    test: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: __dirname + '/src/server/database/migrations'
        },
        seeds: {
            directory: __dirname + '/src/server/database/seeds'
        }
    },

    aws: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/src/server/database/migrations'
        },
        seeds: {
            directory: __dirname + '/src/server/database/seeds'
        }
    }

};