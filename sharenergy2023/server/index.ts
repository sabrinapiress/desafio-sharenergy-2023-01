const userRoutes = require('./Routes/userRoutesRegister')
const userRouterLogin = require('./Routes/userRouterLogin')
const express = require('express')
const app = express()
const cors = require('cors')
const connectDatabase = require('./database/data')
const crudRouter  = require('./Routes/crudRouter')

app.use(express.json())
app.use(cors())

app.use('/register', userRoutes.register)

app.use('/login', userRouterLogin.login)

app.use('/crud/register', crudRouter.register);

app.use('/crud/byId', crudRouter.findById);

app.use('/crud/update', crudRouter.update);

app.use('/crud/delete', crudRouter.deleted);

app.use('/crud/all', crudRouter.getAllUsers);

connectDatabase()

app.listen(1337, () => {
    console.log("Server started on port 1337")
})

export {};