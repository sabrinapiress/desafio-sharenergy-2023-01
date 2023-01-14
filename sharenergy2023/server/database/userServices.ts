import User from '../Model/userModel'

const create = async (body: object) => await User.create(body)

const findOne = (body: object) => User.findOne(body)

const update = async (id: any, token:any) => await User.updateOne(id, token)

const deleted = async (id:string) => await User.findByIdAndDelete(id)

const data = module.exports = {create, findOne, update, deleted}

export default data;