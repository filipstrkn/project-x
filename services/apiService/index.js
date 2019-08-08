require('dotenv').config({
    path: '../.env'
})
require('./db')
const { ApolloServer } = require('apollo-server');


const server = new ApolloServer({

})


server.listen().then(({ url }) => {
    console.log(`🚀  GraphQL server ready at ${url}`);
})
