const { Schema, model } = require('mongoose')


const propertySchema = new Schema({
    name: String
})


module.exports = model('Property', propertySchema)