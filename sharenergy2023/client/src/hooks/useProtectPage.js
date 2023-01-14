import { useLayoutEffect } from "react";
import jwt_decode from 'jwt-decode'

export const useProtectedPage = () => {

    useLayoutEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            let decoded = jwt_decode(token)
            if (!decoded) {
                localStorage.removeItem('token')
                window.location.href = "/"
            }else{
                
            }
        }
    }, [])
}