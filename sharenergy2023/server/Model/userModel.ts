import mongoose from 'mongoose'

const User: any = new mongoose.Schema({
    userName: {type: String, require: true, unique: true},
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    quote: {type: String},
},
    {collection: 'user-data'}
)

const model = mongoose.model('UserData', User)

module.exports = model 

const Admin = module.exports = model 

export default Admin