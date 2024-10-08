import api from "./api"

// TODO: token adjustment from interceptor to be checked
export default class AuthService {

    static sendMessage(message) {
        return api.post('messages/',{
            "message": message
        })
    }

    static retrieveMessages(page="last", message="") {
        return api.get(`messages/?page=${page}&message=${message}`)
    }    

}
