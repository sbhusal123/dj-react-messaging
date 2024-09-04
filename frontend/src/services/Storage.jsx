export default class Storage {

    static setUsername(username){
        localStorage.setItem("@username", username)
    }

    static getUsername(){
        return localStorage.getItem("@username")
    }

    static storeTokens(data){
        localStorage.setItem("@accessToken", data.access)
        localStorage.setItem("@refreshToken", data.refresh)
    }

    static getAccessToken(){
        return localStorage.getItem("@accessToken")
    }

    static getRefreshToken(){
        return localStorage.getItem("@refreshToken")
    }

    static updateAccessToken(newRefreshToken){
        localStorage.setItem("@accessToken", newRefreshToken)
    }

    static removeTokenData(){
        localStorage.clear("@accessToken")
        localStorage.clear("@refreshToken")
    }
}
