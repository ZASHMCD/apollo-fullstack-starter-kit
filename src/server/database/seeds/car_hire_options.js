exports.seed = function(knex, Promise) {

    return knex('car_hire_options').del()
        .then(function() {
            // Inserts seed entries
            return knex('car_hire_options').insert([
                { name: 'None', description: 'None', amount: 0 },
                { name: 'Small', description: 'eg. Kia Picanto', amount: 92 },
                { name: 'Medium', description: 'eg. Toyota Corolla', amount: 95 },
                { name: 'Nice', description: 'eg. BMW 320i', amount: 122 },
            ]);
        });
};