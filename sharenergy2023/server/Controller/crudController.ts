import { Request, Response } from "express"
import { Authenticator } from "../services/Authenticator"
import crudServices from '../database/crudServices'
import userService from '../database/userServices'

const register = async (req: Request, res: Response) => {
    try {
        const { name, email, address, cellphone, cpf, } = req.body
        const token = req.headers['authorization'] as string

        if (!token) {
            res.statusCode = 401
            throw new Error("Please provide a token")
        }

        if (!name || !email || !address || !cellphone || !cpf) {
            res.statusCode = 400
            throw new Error("Submit all fields for registration")
        }
        if (name !== String(name) || email !== String(email) || address !== String(address) || cellphone !== String(cellphone) || cpf !== String(cpf)) {
            res.status(406).json({ message: "Invalid values" })
        }

        const authenticator = new Authenticator()
        const authenticationData = authenticator.getTokenData(token)

        if (!authenticationData) {
            res.statusCode = 401
            throw new Error("Invalid token")
        }

        const user = await crudServices.create(req.body)

        res.status(200).json({
            message: "User created successfully",
            user
        })


    } catch (err: any) {
        console.log(err.message)
        res.status(400).json(err.message)
        if (res.statusCode === 200) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(res.statusCode).send({ message: err.message })
        }
    }
}

const findById = async (req: Request, res: Response) => {
    try {
        const id = req.query.id

        const token = req.headers['authorization']

        const verifyToken = await userService.findOne({ token: token }).lean()

        if (verifyToken?.token !== token || !token || !verifyToken?.token) {

            res.status(401).json({
                message: 'Token inválido'
            })

        } else if (verifyToken.token === token) {

            if (!id || id !== String(id)) {
                res.status(401).json({ message: "ID está vazio ou valor é inválido" })
            }

            const user = await crudServices.findById({ _id: id })

            if (!user) {
                res.status(404).json({ message: "Id não encontrado" })
            }
            res.status(200).json({
                message: 'OK',
                response: user
            })
        } else {
            res.status(401).json({
                message: 'Token inválido'
            })
        }

    } catch (err: any) {
        res.status(400).json(err.message)
    }
}

const update = async (req: Request, res: Response) => {
    try {

        const { name, email, address, cellphone, cpf, } = req.body

        const _id: any = req.query.id

        const token = req.headers['authorization'] as string

        if (!token) {
            res.statusCode = 401
            throw new Error("Please provide a token")
        }

            if (!name || !email || !address || !cellphone || !cpf) {
                res.statusCode = 400
                throw new Error("Submit all fields for registration")
            }

            if (name !== String(name) || email !== String(email) || address !== String(address) || cellphone !== String(cellphone) || cpf !== String(cpf)) {
                res.statusCode = 400
                throw new Error("Invalid values")
            }

            const newUser = {
                name,
                email,
                address,
                cellphone,
                cpf
            }

            const user = await crudServices.update(_id, newUser)

            if (!user) {
                return res.status(400).json({ message: "Error updating user" })
            }
            return res.status(200).json({
                message: 'User updated successfully',
            })

    } catch (err: any) {
        return res.status(400).json(err.message)
    }
}

const deleted = async (req: Request, res: Response) => {
    try {
        const id = req.query.id

        const token = req.headers['authorization'] as string

        if (!token) {
            res.statusCode = 401
            throw new Error("Please provide a token")
        }

        if (!id || id !== String(id)) {
            res.statusCode = 401
            throw new Error("Please provide a valid id")
        }

        const authenticator = new Authenticator()
        const authenticationData = authenticator.getTokenData(token)

        if (!authenticationData) {
            res.statusCode = 401
            throw new Error("Invalid token")
        }

        const user = await crudServices.deleted({ _id: id })

        if (!user) {
            res.statusCode = 404
            throw new Error("User not found, please provide another id")
        }

        return res.status(200).json({
            message: 'User deleted successfully',
        })


    } catch (err: any) {
        return res.status(400).json(err.message)
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const token = req.headers['authorization'] as string

        if (!token) {
            res.statusCode = 401
            throw new Error("Please provide a token")
        }

        const list = await crudServices.getAllUsers()

        if (!list) {
            res.status(400).json({ message: "Not found lits" })
        }

        const authenticator = new Authenticator()
        const authenticationData = authenticator.getTokenData(token)

        if (!authenticationData) {
            res.statusCode = 401
            throw new Error("Invalid token")
        }

        res.status(200).json({
            response: list,
        })


    } catch (err: any) {
        res.status(400).json(err.message)
    }
}

const crudController = module.exports = { register, findById, update, deleted, getAllUsers }

export default crudController
