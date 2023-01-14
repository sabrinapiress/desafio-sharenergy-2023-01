import mongoose from 'mongoose'

const User:any = new mongoose.Schema({
    name: {type: String, require: true},
    cpf: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    address: {type: String, require: true},
    cellphone: {type: String, require: true, unique: true}
},
    {collection: 'user-crud'}
)

const model = mongoose.model('UserCrud', User)

const Crud = module.exports = model 

export default Crud