// import DataLoader from 'dataloader';

import Prospect from './sql';
import schema from './schema.gql';
import createResolvers from './resolvers';
import subscriptionsSetup from './subscriptions_setup';

import Feature from '../connector';

export default new Feature({
    schema,
    createResolversFunc: createResolvers,
    subscriptionsSetup,
    createContextFunc: () => {
        const prospect = new Prospect();

        return {
            Prospect: prospect,
            /*
            loaders: {
                getCommentsForPostIds: new DataLoader(post.getCommentsForPostIds),
            }
            */
        };
    },
});