import userRoutes from './Routes/userRoutesRegister'
import userRouterLogin from './Routes/userRouterLogin'
import express from 'express'
const app = express()
import cors from 'cors'
import connectDatabase from './database/data'
import crudRouter from './Routes/crudRouter'

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
