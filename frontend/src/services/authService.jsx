import { api } from "./api"

export default class AuthService {

    // returns refresh and access token
    static authLogin(username, password){
        return api.post('/token/', {
            'username': username,
            'password': password
        })
    }

    // verify access token
    static verifyToken(token){
        return api.post('/token/verify/', {
            'token': token
        })
    }

    // get a new acces acess token with refresh token
    static async refreshToken(token){
        return api.post('/token/refresh/', {
            'refresh': token
        })
    }    
    
}
