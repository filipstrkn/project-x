require('dotenv').config({
    path: '../.env'
})
require('./db')
// -------------------------
const { ApolloServer } = require('apollo-server');
const auth = require('./utils/auth')


/**
 *
 *  Apollo Server
 *  ---
 *
 *
 */
const server = new ApolloServer({
    modules: [
        require('./modules/properties')
    ],
    formatError: err => ({
        message: err.message,
        status: err.extensions.code
    }),
    context: ({ req }) => auth({
        access_token: req.headers.authorization || null,
        refresh_token: req.headers['x-refresh'] || null
    })
})


/**
 *
 *  Running Our Graphql Server
 *  ---
 *
 */
server.listen().then(({ url }) => {
    console.log(`🚀  GraphQL server ready at ${url}`);
})
