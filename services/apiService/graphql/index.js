const { ApolloServer } = require('apollo-server-koa')


const graphqlServer = new ApolloServer({
    modules: [
        require('./User/user.module')
    ]
})


module.exports = graphqlServer