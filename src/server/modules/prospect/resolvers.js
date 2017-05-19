var GraphQLJSON = require('graphql-type-json');
var GraphQLDate = require('graphql-iso-date');

export default pubsub => ({
    JSON: GraphQLJSON,
    Date: GraphQLDate,
    Query: {
        async prospectsQuery(obj, { limit, after }, context) {

            const edgesArray = [];
            const prospects = await context.Prospect.getProspectsPagination(limit, after);


            prospects.map(prospect => {
                edgesArray.push({
                    cursor: prospect.created,
                    node: {
                        prospectid: prospect.prospectid,
                        interaction: prospect.interaction,
                        quote: prospect.quote,
                        registrationid: prospect.registrationid,
                        checkoutid: prospect.checkoutid,
                        created: prospect.created
                    },
                });
            });

            const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

            const values = await Promise.all([context.Prospect.getTotal(), context.Prospect.getNextPageFlag(endCursor)]);

            return {
                totalCount: values[0].count,
                edges: edgesArray,
                pageInfo: {
                    endCursor,
                    hasNextPage: values[1].count > 0,
                },
            };
        },
        prospect(obj, { id }, context) {
            return context.Prospect.getProspect(id);
        },
    },
    /*
    Post: {
      comments({ id }, args, context) {
        return context.loaders.getCommentsForPostIds.load(id);
      },
    },
    */
    Mutation: {
        async addProspect(obj, { input }, context) {
            const id = await context.Prospect.addProspect(input);
            const prospect = await context.Prospect.getProspect(id[0]);
            // publish for prospect list
            pubsub.publish('prospectsUpdated', { mutation: 'CREATED', id: id[0], node: prospect });
            return prospect;
        },
        /*
        async deletePost(obj, { id }, context) {
          let prospect = await context.Post.getPost(id);
          let isDeleted = await context.Post.deletePost(id);
          if (isDeleted) {
            // publish for prospect list
            pubsub.publish('prospectsUpdated', { mutation: 'DELETED', id, node: prospect });
            return { id: prospect.id };
          } else {
            return { id: null };
          }
        },
        */
        async updateProspectPayment(obj, { input }, context) {
            await context.Prospect.updateProspectPayment(input);
            const prospect = await context.Prospect.getProspect(input.prospectid);
            // publish for prospect list
            pubsub.publish('prospectsUpdated', { mutation: 'UPDATED', id: prospect.id, node: prospect });
            // publish for edit prospect page
            pubsub.publish('prospectUpdated', prospect);
            return prospect;
        },
        /*
        async addComment(obj, { input }, context) {
          let id = await context.Post.addComment(input);
          let comment = await context.Post.getComment(id[0]);
          // publish for edit prospect page
          pubsub.publish('commentUpdated', {
            mutation: 'CREATED',
            id: comment.id,
            prospectId: input.prospectId,
            node: comment
          });
          return comment;
        },
        async deleteComment(obj, { input: { id, prospectId } }, context) {
          await context.Post.deleteComment(id);
          // publish for edit prospect page
          pubsub.publish('commentUpdated', { mutation: 'DELETED', id, prospectId, node: null });
          return { id };
        },
        async editComment(obj, { input }, context) {
          await context.Post.editComment(input);
          let comment = await context.Post.getComment(input.id);
          // publish for edit prospect page
          pubsub.publish('commentUpdated', { mutation: 'UPDATED', id: input.id, prospectId: input.prospectId, node: comment });
          return comment;
        },
        */
    },
    Subscription: {
        prospectUpdated(value) {
            return value;
        },
        prospectsUpdated(value) {
            return value;
        },
        /*
        commentUpdated(value) {
            return value;
        },
        */
    },
});