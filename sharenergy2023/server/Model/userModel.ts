const mongoose = require('mongoose')

const User: Object = new mongoose.Schema({
    userName: {type: String, require: true, unique: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    quote: {type: String},
    token: {type: String}
},
    {collection: 'user-data'}
)

const model = mongoose.model('UserData', User)

module.exports = model 

export {};