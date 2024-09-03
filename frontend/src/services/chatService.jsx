import api from "./api"

// TODO: token adjustment from interceptor to be checked
export default class AuthService {

    static sendMessage(message, token) {
        return api.post('/api/messages/',{
            "message": message
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static retrieveMessages(message, token) {
        return api.post('/api/messages/',{
            "message": message
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

}
