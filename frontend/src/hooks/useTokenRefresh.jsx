import { useEffect, useState } from "react"

import Storage from './../services/Storage'

import AuthService from './../services/authService'
import { useNavigate } from "react-router-dom"

export default function useTokenRefresh(){

    const [accessToken, setAccessToken] = useState(() => {
        return Storage.getAccessToken()
    })
    const [refreshToken, setRefreshToken] = useState(() => {
        return Storage.getRefreshToken()
    })

    const [isLoading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = Storage.getAccessToken()
        const refreshToken = Storage.getRefreshToken()

        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
    }, [])

    const handleTokenCheck = () => {
        setLoading(true)
        AuthService.verifyToken(accessToken).then(() => {
            console.log("verified token")
        }).catch(() => {
            console.log("Couldnt verify the token, generating new accessToken")
            AuthService.refreshToken(refreshToken).then(({data}) => {
                const accessToken = data.access;
                setAccessToken(accessToken)
                Storage.updateAccessToken(accessToken)
                console.log("New access token generated")
            }).catch(e => {
                navigate('/')
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return {
        accessToken,
        refreshToken,
        isLoading,
        handleTokenCheck
    }
}