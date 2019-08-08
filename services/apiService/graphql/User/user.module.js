const { GraphQLModule } = require('@graphql-modules/core')
const userSchema = require('./user.schema')
const userResolver = require('./user.resolver')


const userModule = new GraphQLModule({
    typeDefs: userSchema,
    resolvers: userResolver
})


module.exports = userModule