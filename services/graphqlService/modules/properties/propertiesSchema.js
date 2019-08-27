const { gql } = require('apollo-server')

const propertiesSchema = gql`

    type Query {
        properties: [Property]
    }

    type Property {
        name: String
        # address: {
        #     lat: String!
        #     lng: STring!
        # }
        # body: [CustomInput]
        # managers: [User!]
        # residents: [User]
        # pages: [Page]
    }

`


module.exports = propertiesSchema