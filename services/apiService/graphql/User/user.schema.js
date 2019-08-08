const { gql } = require('apollo-server-koa')


const userSchema = gql`
    type Query {
        user: User!
    }

    type User {
        name: String
        email: String
    }
`


module.exports = userSchema