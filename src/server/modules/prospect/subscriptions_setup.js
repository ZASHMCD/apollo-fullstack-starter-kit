export default {
    prospectUpdated: (options, args) => ({
        prospectUpdated: {
            filter: prospect => args.id === prospect.prospectid,
        },
    }),
    prospectsUpdated: (options, args) => ({
        prospectsUpdated: {
            filter: prospect => args.endCursor <= prospect.prospectid,
        },
    }),
    /*
    commentUpdated: (options, args) => ({
      commentUpdated: {
        filter: comment => args.postId === comment.postId
      },
    }),
    */
};