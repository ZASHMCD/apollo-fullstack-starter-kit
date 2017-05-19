var quote = require('../../../../samples/quote');
var premuims = require('../../../../samples/premiums');
var interaction = require('../../../../samples/interaction');


var currentQuote = {

    regularDriver: { cancellations: 'false', claims: '1', cover: '3+', self: 'true' },
    user: { IDNumber: '7408235042080', name: 'G', surname: 'F' },
    vehicle: {
        accessories: 'false',
        enhancements: 'false',
        make: 'BMW',
        mmCode: '5037044',
        model: '320i MODERN LINE (F30)',
        placeId: 'ChIJaYiK4HsMlR4R9wjhsgfUpUQ',
        postalCode: '2122',
        use: 'PRSNL',
        year: '2015'
    },
    premiums: premuims.premiums,
    value: 500000,
    selectedOptions: quote.selectedOptions
};

var currentInteraction = interaction.qanda;


exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('prospect').del()
        .then(function() {
            return knex('prospect').insert({
                prospectid: '6f45bbec-363d-11e7-ba1a-e383b03b0a8c',
                quote: JSON.stringify(currentQuote),
                interaction: JSON.stringify(currentInteraction),
            });
        });
};