import { goToLogin } from "../Router/Router"

export const logOut = ()=>{ 
    goToLogin()
    localStorage.removeItem('token')
    localStorage.removeItem('persist')
}