// import _ from 'lodash';
import knex from '../../sql/connector';
/*
const orderedFor = (rows, collection, field, singleObject) => {
    // return the rows ordered for the collection
    const inGroupsOfField = _.groupBy(rows, field);
    return collection.map(element => {
        const elementArray = inGroupsOfField[element];
        if (elementArray) {
            return singleObject ? elementArray[0] : elementArray;
        }
        return singleObject ? {} : [];
    });
};
*/
export default class Prospect {
    getProspectsPagination(limit, after) {
        let where = '';
        if (after > 0) {
            where = `created < ${after}`;
        }

        return knex
            .select('prospectid', 'interaction', 'quote', 'checkoutid', 'registrationid', 'created')
            .from('prospect')
            .whereRaw(where)
            .orderBy('created', 'desc')
            .limit(limit);
    }

    /*
    async getCommentsForPostIds(postIds) {
        let res = await knex
            .select('id', 'content', 'post_id AS postId')
            .from('comment')
            .whereIn('post_id', postIds);

        return orderedFor(res, postIds, 'postId', false);
    }
    */

    getTotal() {
        return knex('prospect').count('prospectid as count').first();
    }

    getNextPageFlag(created) {
        return knex('prospect').count('prospectid as count').where('created', '<', created).first();
    }


    getProspect(prospectid) {
        return knex
            .select('prospectid', 'interaction', 'quote', 'checkoutid', 'registrationid', 'created')
            .from('prospect')
            .where('prospectid', '=', prospectid)
            .first();
    }

    addProspect({ interaction, quote }) {
            return knex('prospect').returning('prospectid').insert({
                interaction: JSON.stringify(interaction),
                quotation: JSON.stringify(quote)
            });
        }
        /*
        deletePost(id) {
            return knex('post').where('id', '=', id).del();
        }
        */

    updateProspectPayment({ prospectid, registrationid, checkoutid }) {
        return knex('prospect')
            .where('prospectid', prospectid)
            .update({
                registrationid: registrationid,
                checkoutid: checkoutid,
            });
    }

    /*
        editPost({ id, title, content }) {
            return knex('post')
                .where('id', '=', id)
                .update({
                    title: title,
                    content: content
                });
        }

        addComment({ content, postId }) {
            return knex('comment').insert({ content, post_id: postId });
        }

        getComment(id) {
            return knex
                .select('id', 'content')
                .from('comment')
                .where('id', '=', id)
                .first();
        }

        deleteComment(id) {
            return knex('comment').where('id', '=', id).del();
        }

        editComment({ id, content }) {
            return knex('comment')
                .where('id', '=', id)
                .update({
                    content: content
                });
        }
      */
}