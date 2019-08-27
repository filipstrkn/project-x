const { ApolloError } = require('apollo-server')
const PropertyModel = require('../../models/Property')

const propertyResolvers = {

    Query: {
        async properties() {
            try {
                const properties = await PropertyModel.find()
                return properties
            } catch (err) {
                const msg = 'Ajkx. There is some nasty error'
                return new ApolloError(msg, 400)
            }
        }
    }
}


module.exports = propertyResolvers