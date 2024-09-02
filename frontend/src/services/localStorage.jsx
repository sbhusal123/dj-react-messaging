export default class Storage {

    static storeTokens(data){
        localStorage.setItem("@accessToken", data.access)
        localStorage.setItem("@refreshToken", data?.refresh)
    }

    static getAccessToken(){
        return localStorage.getItem("@accessToken")
    }

    static getRefreshToken(){
        return localStorage.getItem("@refreshToken")
    }

    static isRefreshTokenPresent(){
        return Storage.getRefreshToken() !== "undefined"
    }

    static updateAccessToken(newRefreshToken){
        localStorage.setItem("@accessToken", newRefreshToken)
    }

    static removeTokenData(){
        localStorage.clear("@accessToken")
        localStorage.clear("@refreshToken")
    }
}
