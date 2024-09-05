import api from "./api"

export default class AuthService {

    static registerUser(username, password){
        return api.post('/register/', {
            'username': username,
            'password': password
        })
    }

    // returns refresh and access token
    static authLogin(username, password, remember){
        return api.post('/token/', {
            'username': username,
            'password': password,
            'remember_me': remember
        })
    }

    // verify access token
    static verifyToken(token){
        return api.post('/token/verify/', {
            'token': token
        })
    }

    // get a new acces acess token with refresh token
    static refreshToken(token){
        return api.post('/token/refresh/', {
            'refresh': token
        })
    }

    static authLogout(refreshToken){
        return api.post('/logout/', {
            "refresh": refreshToken
        })
    }
    
}
