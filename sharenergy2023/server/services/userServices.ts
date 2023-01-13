const User = require('../Model/userModel')

const create = async (body: object) => await User.create(body)

const findOne = (body: object) => User.findOne(body)

const update = async (id: string, token:string) => await User.updateOne(id, token)

const deleted = async (id:string) => await User.findByIdAndDelete(id)

module.exports = {create, findOne, update, deleted}