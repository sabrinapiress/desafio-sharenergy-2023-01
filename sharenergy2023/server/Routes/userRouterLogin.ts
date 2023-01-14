import userControllerLogin from '../Controller/loginController';

const route = require('express').Router()

const login = route.post('/',  userControllerLogin.login )

const data = module.exports = {login}

export default data;