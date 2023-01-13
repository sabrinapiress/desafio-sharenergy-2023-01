import { sign, verify } from "jsonwebtoken"
import { authenticationData } from "../types"
var jwt = require('jsonwebtoken');

export class Authenticator {

    generateToken = (payload: authenticationData): string => {
        // const token = sign(
        //     payload,
        //     process.env.JWT_KEY as string,
        //     { expiresIn: process.env.JWT_EXPIRES_IN as string }
            
           
        // )
        const token = jwt.sign({
            name: payload.id,
            email: payload.email
        }, 'secret123')

        return token
    }

    getTokenData = (token: string): authenticationData => {
        const payload = verify(
            token,
            process.env.JWT_KEY as string
        )

        return payload as authenticationData
    }
}