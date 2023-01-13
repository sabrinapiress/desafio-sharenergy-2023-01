import { sign, verify } from "jsonwebtoken"
import { authenticationData } from "../types"
var jwt = require('jsonwebtoken');

export class Authenticator {

    generateToken = (payload: authenticationData): string => {
        const token = jwt.sign({
            name: payload.id,
            email: payload.email
        }, 'secret123')

        return token
    }

    getTokenData = (token: string): authenticationData => {
        const payload = verify(
            token,
            'secret123' as string
        )

        return payload as authenticationData
    }
}