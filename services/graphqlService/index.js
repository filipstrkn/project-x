require('dotenv').config({
    path: '../.env'
})
require('./db')
// -------------------------
const { ApolloServer } = require('apollo-server');


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
